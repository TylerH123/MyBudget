import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { signup, isLoading, error } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signup(email, password);
	}

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h2 style={{marginTop: 0}}>Sign Up</h2>
			{error && <div className="error">{error}</div>}

			<label>Email:</label>
			<input
				type="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
			/>

			<label>Password:</label>
			<input
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
			/>

			<button type="submit" disabled={isLoading}>Sign Up</button>
		</form>
	)
}

export default Signup;