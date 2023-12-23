import { useAuthContext } from './useAuthContext';
import { useBillsContext } from './useBillsContext';

export const useLogout = () => {
	const { dispatch } = useAuthContext();
	const { dispatch: billsDispatch } = useBillsContext();

	const logout = () => {
		localStorage.removeItem('user');
		dispatch({type: 'LOGOUT'});
		billsDispatch({type: 'SET_BILLS', payload: null});
	}

	return { logout };
}