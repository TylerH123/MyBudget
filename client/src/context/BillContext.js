import { createContext, useReducer } from "react";

export const BillsContext = createContext();

export const billsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_BILLS':
			return {
				bills: action.payload
			}

		case 'CREATE_BILL':
			return {
				bills: [action.payload, ...state.bills]
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