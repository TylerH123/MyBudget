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
				<Link to="/subscriptions">
					<p className="link">Subscriptions</p>
				</Link>
				<Link to="/utilities">
					<p className="link">Utilities</p>
				</Link>
				<Link to="/vacation">
					<p className="link">Vacation</p>
				</Link>
			</div>
		</header>
	)
}

export default Navbar;