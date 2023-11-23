import { useEffect, useState } from "react";
import { useBillsContext } from "../hooks/useBillsContext";

// components
import BillForm from "../components/BillForm";

const Home = () => {
	const { bills, dispatch } = useBillsContext();

	useEffect(() => {
		const fetchBills = async () => {
		  console.log("fetching");
		  const res = await fetch('http://localhost:4000/api/bills');
		  const data = await res.json();
		  
		  if (res.ok) {
			dispatch({type: 'SET_BILLS', payload: data});
		  }
		}
	  
		fetchBills();
	}, []); // empty dependency array to run the effect only on mount
	
	if(!bills) {
		return <div>Loading...</div> 
	}

	return (
		<div className="home">
			<div className="bills">
				{ bills && bills.map((bill) => (
					<p key={bill._id}>{bill.category} - {bill.subcategory}: ${bill.amount}</p>
				))}
			</div>
			<BillForm />
		</div>
	)
}

export default Home;