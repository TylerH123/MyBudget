import { createContext, useReducer } from 'react';

export const BillsContext = createContext();

const sortedInsert = (array, element) => {
	if (element.date >= array[array.length - 1].date) {
		array.push(element);
		return array;
	}

	let newArray = new Array(array.length + 1);
	let index = 0;

	while (index < array.length && array[index].date > element.date) {
		newArray[index] = array[index];
		index++;
	}
	newArray.push(element);
	while (index < array.length) {
		newArray[index + 1] = array[index];
		index++;
	}

	return newArray;
}

// function to combine current bills with an array of new bills
// return array of combined bills sorted by date in descending order
const insertAndSortBills = (bills, newBills) => {
	let sortedBills = [...bills, ...newBills];	
	sortedBills.sort((a, b) => b.date - a.date)
	console.log(sortedBills);

	return sortedBills;
}

export const billsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_BILLS':
			return {
				bills: action.payload
			}
		case 'CREATE_BILL':
			return {
				bills: sortedInsert(state.bills, action.payload)
			}
		case 'CREATE_BILLS':
			return {
				bills: insertAndSortBills(state.bills, action.payload)
			}
		case 'DELETE_BILL':
			return {
				bills: state.bills.filter((bill) => bill._id !== action.payload)
			}
		default:
			return state;
	}
}

export const BillsContextProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(billsReducer, {
		bills: null
	});

	return (
		<BillsContext.Provider value={{...state, dispatch}}>
			{ children }
		</BillsContext.Provider>
	)
}