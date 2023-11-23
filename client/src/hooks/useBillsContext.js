import { BillsContext } from "../context/BillContext";
import { useContext } from "react";

export const useBillsContext = () => {
	const context = useContext(BillsContext);
	if (!context) {
		throw Error('useBillsContext must be used inside a billsContextProvider');
	}

	return context
}