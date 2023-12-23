import { useEffect } from 'react';
import { useBillsContext } from '../hooks/useBillsContext';

// components
import BillForm from '../components/AddBillForm';

// utils
import { getBillsByCategory, deleteBill } from '../utils/apiUtils';
import { displayDate, displayBillAmount } from '../utils/utils';

// TODO:
// add spinner for loading
const CategoryTemplate = (props) => {
	const { bills, dispatch } = useBillsContext();
	const { category } = props;
	// TODO: dynamically set the year
	const year = '2023';

	useEffect(() => {
		try {
			const fetchBills = async () => {
				const [ res, data ] = await getBillsByCategory(year, category);
				if (!res.ok) {
					throw new Error(data.error);
				}

				dispatch({type: 'SET_BILLS', payload: data});
			}
			fetchBills();
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, category, year]); // empty dependency array to run the effect only on mount

	const handleDelete = async (id) => {
		try {
			const [ res, data ] = await deleteBill(year, id);
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
			{props.CSVParser}
		</div>
	)
}

export default CategoryTemplate;