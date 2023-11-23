import { useState } from "react"
import { json } from "react-router-dom";

const BillForm = () => {
	const [ category, setCategory ] = useState('');
	const [ subcategory, setSubcategory ] = useState('');
	const [ date, setDate ] = useState(new Date());
	const [ amount, setAmount ] = useState(0.0);
	const [ description, setDescription ] = useState('');
	const [ error, setError ] = useState(null);

	// TODO:
	// authenticate user
	// change input for category to be dropdown list
	const handleSubmit = async (e) => {
		e.preventDefault();

		const owner = 'Tyler';
		const bill = { owner, category, subcategory, date, amount, description};

		const res = await fetch('http://localhost:4000/api/bills/', {
			method: 'POST',
			body: JSON.stringify(bill),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await res.json();

		if (!res.ok) {
			setError(json.error);
		}
		
		if (res.ok) {
			setCategory('');
			setSubcategory('');
			setDate(new Date().setUTCHours(0, 0, 0, 0));
			setAmount(0.0);
			setDescription('');
			setError(null);
			console.log("New bill added");
		}
	}

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h2>Add a New Bill</h2>

			<label>Bill Category:</label>
			<input 
				type="text"
				onChange={(e) => setCategory(e.target.value)}
				value={category}
			/>

			<label>Bill Subcategory:</label>
			<input 
				type="text"
				onChange={(e) => setSubcategory(e.target.value)}
				value={subcategory}
			/>

			<label>Bill Date:</label>
			<input 
				type="date"
				onChange={(e) => setDate(new Date(e.target.value))}
				value={date.toISOString().slice(0, 10)}
			/>

			<label>Bill Amount:</label>
			<input 
				type="number"
				step="0.01"
				onChange={(e) => setAmount(e.target.value)}
				value={amount}
			/>

			<label>Bill Description:</label>
			<textarea 
				rows="4"
				cols="50"
				onChange={(e) => setDescription(e.target.value)}
				value={description}
			/>

			<button>Add Bill</button>
			{error && <div className="error">{error}</div>}
		</form>
	)
}

export default BillForm;