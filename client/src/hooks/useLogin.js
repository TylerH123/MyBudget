import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// utils
import { loginUser } from '../utils/apiUtils';

export const useLogin = () => {
	const [ error, setError ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(null);
	const { dispatch } = useAuthContext();
 
	const login = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const [ res, data ] = await loginUser(email, password);

		if (!res.ok) 
		{
			setError(data.error);
		}
		if (res.ok) {
			localStorage.setItem('user', JSON.stringify(data));
			dispatch({type: 'LOGIN', payload: data});
		}
		setIsLoading(false);
	}

	return { login, isLoading, error };
}
