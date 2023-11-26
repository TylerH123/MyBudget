import { useState } from "react";
// import { useBillsContext } from "../hooks/useBillsContext";
import Papa from 'papaparse';

// components
import InvalidEntries from "./InvalidEntries";

// utils
import { postBill } from "../utils/apiUtils";
import { convertPriceStringToInt } from "../utils/utils";

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
	// const { dispatch } = useBillsContext();
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

	const createAndSendBill = async (item) => {
		try {
			const bill = { 
				owner: 'Tyler', 
				category: 'Food', 
				subcategory: item.Place, 
				date: new Date(item.Date), 
				amount: convertPriceStringToInt(item.Price), 
				description: null
			};

			const [ res, data ] = await postBill(bill); 
			if (!res.ok) {
				throw new Error(data.error);
			}
			console.log("New bill added");
			// dispatch({type: 'CREATE_BILL', payload: data});
		} catch (err) {
			// TODO: create array to store all bad entries and print them out later
			console.log(err);
			setBadEntries([...badEntries, item]);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
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
						results.data.forEach((item) => {
							// console.log(item);
							createAndSendBill(item);
						});
						//   console.log(results.data);
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
			{ error && <div className="error">{error}</div>}
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
			<button>Upload File</button>
		</form>
	)
}

export default CSVParser;