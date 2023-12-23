import { useContext } from 'react';
import { BillsContext } from '../context/BillContext';

export const useBillsContext = () => {
	const context = useContext(BillsContext);
	if (!context) {
		throw new Error('useBillsContext must be used inside a billsContextProvider');
	}

	return context;
}