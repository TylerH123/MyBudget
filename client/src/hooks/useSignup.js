import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// utils
import { signupUser } from '../utils/apiUtils';

export const useSignup = () => {
	const [ error, setError ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(null);
	const { dispatch } = useAuthContext();
 
	const signup = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const [ res, data ] = await signupUser(email, password);

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

	return { signup, isLoading, error };
}
