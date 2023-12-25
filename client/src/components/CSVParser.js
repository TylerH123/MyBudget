import { useState } from 'react';
import { useBillsContext } from '../hooks/useBillsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Papa from 'papaparse';

// components
import InvalidEntries from './InvalidEntries';

// utils
import { postBill, postBills } from '../utils/apiUtils';
import { convertPriceStringToInt } from '../utils/utils';

const checkFileIsCSV = (inputFile) => {
	if (!inputFile) {
		return new Error('No file selected');
	}
	const fileEXT = inputFile.name.split('.').pop();
	if (fileEXT !== 'csv') {
		return new Error('Invalid file type. Please upload a file that ends in .csv');
	}
	return null; // Indicates no error
}

const CSVParser = () => {
	const { dispatch } = useBillsContext();
	const { user } = useAuthContext();
	const [ error, setError ] = useState(null);
	const [ badEntries, setBadEntries ] = useState([]);

	const checkInputFile = (e) => {
		const selectedFile = e.target.files[0];
		try {
			const fileError = checkFileIsCSV(selectedFile);
			setError(fileError ? fileError.message : null);
		} catch (err) {
			setError(err.message);
		}
	}

	// take in array of lines from csv file and return array of bills
	const createBills = (data) => {
		let billsArray = new Array(data.length);
		for (let i = 0; i < billsArray.length; i++) {
			let item = data[i];
			const bill = {
				category: 'Food', 
				subcategory: item.Place, 
				date: new Date(item.Date), 
				amount: convertPriceStringToInt(item.Price), 
				description: null
			};

			billsArray[i] = bill;
		}

		return billsArray;
	}

	const sendBills = async (bills) => {
		try {
			const [ res, data ] = await postBills(user.token, bills);
			if (!res.ok) {
				throw new Error(data.error);
			}
			dispatch({type: 'CREATE_BILLS', payload: data});
			console.log(`Successfully added ${data.length} bills`);
		} catch (err) {
			// TODO: create array to store all bad entries and print them out later
			console.log(err);
		}
	}

	// const createAndSendBill = async (item) => {
	// 	try {
	// 		const bill = { 
	// 			category: 'Food', 
	// 			subcategory: item.Place, 
	// 			date: new Date(item.Date), 
	// 			amount: convertPriceStringToInt(item.Price), 
	// 			description: null
	// 		};

	// 		const [ res, data ] = await postBill(user.token, bill);
	// 		if (!res.ok) {
	// 			throw new Error(data.error);
	// 		}
	// 		dispatch({type: 'CREATE_BILL', payload: data});
	// 	} catch (err) {
	// 		// TODO: create array to store all bad entries and print them out later
	// 		console.log(err);
	// 		console.log('before', badEntries);
	// 		setBadEntries([...badEntries, item]);
	// 		console.log('after', badEntries);
	// 	}
	// }

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!user) {
			setError('You must be logged in');
			return
		}

		try {
			const selectedFile = e.target[0].files[0];
			const fileError = checkFileIsCSV(selectedFile);
			setBadEntries([]);
			if (fileError) {
				setError(fileError.message);
			} else {
				Papa.parse(selectedFile, {
					complete: (results) => {
						// Handle the parsed data
						let billsArray = createBills(results.data);
						sendBills(billsArray);
					},
					header: true,
				});
			}
		} catch (err) {
			setError(err.message);
		}
	}

	return (
		<form className="upload" onSubmit={handleSubmit}>
			{badEntries.length > 0 && <InvalidEntries badEntries={badEntries}/>}
			{error && <div className="error">{error}</div>}
			<h2>Upload CSV File to Import Food Category</h2>
			<div>CSV File Format Requirements:
				<ul>
					<li>3 columns only in the following order: Date, Price, Place</li>
					<li>Column name must be spelled exactly as shown above</li>
					<li>Date must be of the form: MM/DD/YYYY</li>
					<li>The year must be the same for every entry</li>
				</ul>
				Failure to follow these formatting rules will result in weird entries in database or errors inserting into database
			</div>
			<label>Upload CSV:</label>
			<input 
				type="file"
				accept=".csv"
				onChange={checkInputFile}
			/>
			<button type='submit'>Upload File</button>
		</form>
	)
}

export default CSVParser;