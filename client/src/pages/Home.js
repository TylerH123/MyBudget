import { useEffect, useState } from "react";

const Home = () => {
	const [ bills, setBills ] = useState(null);

	const fetchBills = async () => {
		const res = await fetch('http://localhost:4000/api/bills');
		const data = await res.json();
		
		if (res.ok) {
			setBills(data);
			console.log(data);
		}
	}

	useEffect (() => {
		fetchBills();
	}, []);

	if(!bills) {
		return <div>Loading...</div> 
	}

	return (
		<div className="home">
			<div className="bills">
				{ bills & bills.map((bill) => (
					<p key={bill._id}>{bill.category} {bill.amonut}</p>
				))}
			</div>
		</div>
	)
}

export default Home;