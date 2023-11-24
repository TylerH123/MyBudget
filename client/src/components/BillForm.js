import { useState } from "react";
import { useBillsContext } from "../hooks/useBillsContext";


const BillForm = () => {
	const { dispatch } = useBillsContext();
	const [ category, setCategory ] = useState('');
	const [ touched, setTouched ] = useState(false);
	const [ subcategory, setSubcategory ] = useState('');
	const [ date, setDate ] = useState(new Date());
	const [ amount, setAmount ] = useState("$0");
	const [ description, setDescription ] = useState('');
	const [ error, setError ] = useState(null);

	const handleTouch = () => {
		setTouched(true);
	}

	// TODO:
	// authenticate user
	// change input for category to be dropdown list
	const handleSubmit = async (e) => {
		e.preventDefault();

		const owner = 'Tyler';
		const amountArr = amount.slice(1).split('.');
		let billAmount = parseInt(amountArr[0]) * 100;
		if (amountArr.length === 2) {
			billAmount += parseInt(amountArr[1]);
		}
		const bill = { owner, category, subcategory, date, amount: billAmount, description };

		try {
			const res = await fetch('http://localhost:4000/api/bills/', {
				method: 'POST',
				body: JSON.stringify(bill),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error);
			}

			// Reset form
			setCategory('');
			setSubcategory('');
			setDate(new Date());
			setAmount("$0");
			setDescription('');
			setError(null);
			console.log("New bill added");
			dispatch({type: 'CREATE_BILL', payload: data});
		} catch (err) {
			setError(err.message);
		}
	}

	// TODO: finish validation logic for amount input field 
	const validateAmount = () => {
		
	}
	
	return (
		<form className="create" onSubmit={handleSubmit}>
			{error && <div className="error">{error}</div>}
			<h2>Add a New Bill</h2>

			<label>Bill Category:</label>
			<input 
				type="text"
				onChange={(e) => setCategory(e.target.value)}
				value={category}
				className={touched && category === '' ? 'error' : ''}
				onClick={handleTouch}
				required
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
				className={date === '' ? 'error' : ''}
				required
			/>

			<label>Bill Amount:</label>
			<input 
				type="text"
				onClick={(e) => {e.target.select()}}
				onChange={(e) => {setAmount(`$${e.target.value.replace(/[^\d.]/g, '')}`)}}
				onBlur={validateAmount}
				value={amount}
				className={amount === '' ? 'error' : ''}
				required
			/>

			<label>Bill Description:</label>
			<textarea 
				rows="4"
				cols="50"
				onChange={(e) => setDescription(e.target.value)}
				value={description}
			/>

			<button>Add Bill</button>
		</form>
	)
}

export default BillForm;