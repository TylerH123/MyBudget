import { useEffect } from "react";
import { useBillsContext } from "../hooks/useBillsContext";

// components
import BillForm from "../components/BillForm";
import CSVParser from "../components/CSVParser";

// utils
import { displayDate, displayBillAmount } from "../utils/utils";

// TODO:
// add spinner for loading
const CategoryTemplate = (props) => {
	const { bills, dispatch } = useBillsContext();
	const { category, displayCSVImporter } = props;

	useEffect(() => {
		try {
			const fetchBills = async () => {
				const res = await fetch('http://localhost:4000/api/bills/' + category);
				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error);
				}

				dispatch({type: 'SET_BILLS', payload: data});
			}
			fetchBills();
		} catch (error) {
			console.log(error);
		}
		
	}, [dispatch, category]); // empty dependency array to run the effect only on mount

	const handleDelete = async (id) => {
		try {
			const res = await fetch('http://localhost:4000/api/bills/' + id, {
				method: 'DELETE'
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			
			dispatch({type: 'DELETE_BILL', payload: data})
		} catch (error) {
			console.log(error);
		}
	}
	
	if(!bills) {
		return <div>Loading...</div> 
	}

	return (
		<div className="home">
			{bills && (
				<div className="bills">
					{ bills.map((bill) => (
						<div key={bill._id}>
							{displayDate(bill.date)} | {bill.category} - {bill.subcategory}: ${displayBillAmount(bill.amount)}
							<button onClick={handleDelete.bind(this, bill._id)}>Delete</button>
						</div> 
					))}
				</div>
			)}
			<BillForm category={category}/>
			{displayCSVImporter && <CSVParser/>} 
		</div>
	)
}

export default CategoryTemplate;