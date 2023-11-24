import { useState } from "react";
import Papa from 'papaparse';

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
	const [ error, setError ] = useState(null);

	const checkInputFile = (e) => {
		const selectedFile = e.target.files[0];
		try {
			const fileError = checkFileIsCSV(selectedFile);
			setError(fileError ? fileError.message : null);
		} catch (err) {
			setError(err.message);
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const selectedFile = e.target[0].files[0];
		try {
			const fileError = checkFileIsCSV(selectedFile);
			if (fileError) {
				setError(fileError.message);
			} else {
				Papa.parse(selectedFile, {
					complete: (results) => {
					  // Handle the parsed data
					  console.log(results.data);
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
			{ error && <div className="error">{error}</div>}
			<h2>Upload CSV File for Mass Import</h2>
			<div>CSV file must follow this format:
				<ul>
					<li>3 columns only in the following order: Date, price, place</li>
					<li>Date must be of the form: MM/DD/YYYY</li>
					<li>The year must be the same for every entry</li>
				</ul>
				Failure to follow these formatting rules will result in weird entries in database or errors inserting into database!
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