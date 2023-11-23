import { useEffect } from "react";
import { useBillsContext } from "../hooks/useBillsContext";

// components
import BillForm from "../components/BillForm";

// TODO:
// add spinner for loading
const Home = () => {
	const { bills, dispatch } = useBillsContext();

	useEffect(() => {
		try {
			const fetchBills = async () => {
				console.log("fetching");
				const res = await fetch('http://localhost:4000/api/bills');
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
		
	}, []); // empty dependency array to run the effect only on mount

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
			<div className="bills">
				{ bills && bills.map((bill) => (
					<div key={bill._id}>
						{bill.category} - {bill.subcategory}: ${bill.amount}
						<button onClick={handleDelete.bind(this, bill._id)}>Delete</button>
					</div>
				))}
			</div>
			<BillForm />
		</div>
	)
}

export default Home;