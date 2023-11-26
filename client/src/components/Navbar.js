import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<header>
			<div className="container">
				<Link to="/">
					<h1>MyBudget</h1>
				</Link>
				<Link to="/food">
					<p className="link">Food</p>
				</Link>
			</div>
		</header>
	)
}

export default Navbar;