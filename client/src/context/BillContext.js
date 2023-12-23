import { createContext, useReducer } from 'react';

export const BillsContext = createContext();

const sortedInsert = (array, element) => {
	let newArray = [];
	let index = 0;

	while (index < array.length && array[index].date > element.date) {
		newArray.push(array[index]);
		index++;
	}
	newArray.push(element);
	while (index < array.length) {
		newArray.push(array[index]);
		index++;
	}

	return newArray;
}

export const billsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_BILLS':
			return {
				bills: action.payload
			}
		case 'CREATE_BILL':
			// TODO: add is sorted to payload so dont have to use sorted insert
			return {
				bills: sortedInsert(state.bills, action.payload)
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