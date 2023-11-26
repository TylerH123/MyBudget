import { useEffect, useState } from "react";
import { useBillsContext } from "../hooks/useBillsContext";
import Select from 'react-select';

// utils
import { postBill } from "../utils/apiUtils";
import { convertPriceStringToInt } from "../utils/utils";

const BillForm = (props) => {
	const { dispatch } = useBillsContext();
	const [ category, setCategory ] = useState(props.category);
	const [ subcategory, setSubcategory ] = useState('');
	const [ date, setDate ] = useState(new Date());
	const [ amount, setAmount ] = useState("$0");
	const [ description, setDescription ] = useState('');
	const [ error, setError ] = useState(null);
	const [ options, setOptions ] = useState([]);

	const setDefaultCategory = () => {
		if (!category) {
			return { value: 'Food', label: 'Food' }
		} else {
			return { value: category, label: category }
		}
	}

	useEffect(() => {
		try {
			const getCategories = async () => {
				const res = await fetch('http://localhost:4000/api/users/categories/options');
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error)
				}

				setOptions(data);
			}
			getCategories();
			setDefaultCategory();
		} catch (err) {
			setError(err.message);
		}
	}, []);

	// TODO:
	// authenticate user
	const handleSubmit = async (e) => {
		e.preventDefault();

		const owner = 'Tyler';
		const billAmount = convertPriceStringToInt(amount);
		const bill = { owner, category: category.value, subcategory, date, amount: billAmount, description };

		try {
			const [ res, data ] = await postBill(bill);
			if (!res.ok) {
				throw new Error(data.error);
			}

			// Reset form
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
			<Select
				className="react-select"
				defaultValue={setDefaultCategory}
				onChange={setCategory}
				options={options}
				isSearchable={true}
				placeholder="Select the cateogry for this bill"
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
				rows="2"
				onChange={(e) => setDescription(e.target.value)}
				value={description}
			/>

			<button>Add Bill</button>
		</form>
	)
}

export default BillForm;