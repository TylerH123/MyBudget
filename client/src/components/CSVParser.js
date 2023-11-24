import { useState } from "react";


const CSVParser = () => {
	const [ error, setError ] = useState(null);
	const [ file, setFile ] = useState(null);

	const checkInputFile = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);

		try {
			if (selectedFile) {
				const fileEXT = selectedFile.name.split('.').pop();
				
				if (fileEXT !== 'csv') {
					throw new Error({messsage: "Invalid file type. Please upload a file that ends in .csv"});
				}
			}
		} catch (error) {
			setError(error.messsage);
		}
	}


	return (
		<form>
			{ error && <div className="error">{error}</div>}
			<h2>Upload CSV File for Mass Import</h2>
			<label>Upload CSV:</label>
			<input 
				type="file"
				// accept=".csv"
				onChange={(e) => {checkInputFile(e)}}
			/>

			<div>Upload a CSV file to mass import bills. CSV file must follow this format:
				<ul>
					<li>3 columns only in the following order: Date, price, place</li>
					<li>Date must be of the form: MM/DD/YYYY</li>
					<li>The year must be the same for every entry</li>
				</ul>
				Failure to follow these formatting rules will result in weird entries in database or errors inserting into database!
			</div>
		</form>
	)
}

export default CSVParser;