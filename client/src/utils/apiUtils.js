/**
 * Sends a GET request to retrieve all the bills for a user.
 *
 * @param {year} string - The name of the collection to get the data from.
 * @returns {Promise<{ response: Response, data: any }>} - A promise resolving to an object containing the response and parsed JSON data.
*/
const getBills = async (token, year) => {
	const res = await fetch(`http://localhost:4000/api/bills/${year}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	const data = await res.json();

	return [res, data];
}

/**
 * Sends a GET request to retrieve all the bills for a specific category.
 *
 * @param {year} string - The name of the collection to get the data from.
 * @param {category} string - The name of the category to filter by.
 * @returns {Promise<{ response: Response, data: any }>} - A promise resolving to an object containing the response and parsed JSON data.
*/
const getBillsByCategory = async (token, year, category) => {
	const res = await fetch(`http://localhost:4000/api/bills/${year}/${category}`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	const data = await res.json();

	return [res, data];
}

/**
 * Sends a POST request to create a new bill by providing the bill data to the specified API endpoint.
 *
 * @param {Object} bill - The bill data to be sent in the request body.
 * @returns {Promise<{ response: Response, data: any }>} - A promise resolving to an object containing the response and parsed JSON data.
 *
 * @example
 * // Usage example:
 * const newBill = { your bill data here };
 * const [ response, responseData ] = await postBill(newBill);
*/
const postBill = async (token, bill) => {
	const year = bill.date.getFullYear();
	const res = await fetch(`http://localhost:4000/api/bills/${year}/insertOne`, {
		method: 'POST',
		body: JSON.stringify(bill),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	const data = await res.json();
	
	return [res, data];
}

/**
 * Sends a POST request to create new bills by providing the bills data to the specified API endpoint.
 *
 * @param {Object} bills - The array of bill data to be sent in the request body.
 * @returns {Promise<{ response: Response, data: any }>} - A promise resolving to an object containing the response and parsed JSON data.
*/
const postBills = async (token, bills) => {
	const year = bills[0].date.getFullYear();
	const res = await fetch(`http://localhost:4000/api/bills/${year}/insertMany`, {
		method: 'POST',
		body: JSON.stringify(bills),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	});
	const data = await res.json();
	
	return [res, data];
}

/**
 * Sends a DELETE request to delete a bill by providing the bill id to the specified API endpoint.
 *
 * @param {year} string - The name of the collection to get the data from.
 * @param {id} string - The id of the bill to be deleted.
 * @returns {Promise<{ response: Response, data: any }>} - A promise resolving to an object containing the response and parsed JSON data.
*/
const deleteBill = async (token, year, id) => {
	const res = await fetch(`http://localhost:4000/api/bills/${year}/bill/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	const data = await res.json();

	return [res, data];
}

// ================User Routes===================

/**
 * Sends a GET request to retrieve all the categories for a user.
 *
 * @returns {Promise<{ response: Response, data: any }>} - A promise resolving to an object containing the response and parsed JSON data.
 * data will be an array of strings - with each string being a category
*/
const getCategoriesForUser = async (token) => {
	const res = await fetch('http://localhost:4000/api/users/categories/options', {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	});
	const data = await res.json();

	return [res, data];
}

// ================User Auth Routes===================

/**
 * Sends a POST request to sign up a user.
 *
 * @returns {Promise<{ response: Response, data: any }>} - A promise resolving to an object containing the response and parsed JSON data.
*/
const signupUser = async (email, password) => {
	const res = await fetch('http://localhost:4000/api/users/signup', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({email, password})
	});
	const data = await res.json();

	return [res, data];
}

/**
 * Sends a POST request to log in a user.
 *
 * @returns {Promise<{ response: Response, data: any }>} - A promise resolving to an object containing the response and parsed JSON data.
*/
const loginUser = async (email, password) => {
	const res = await fetch('http://localhost:4000/api/users/login', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({email, password})
	});
	const data = await res.json();

	return [res, data];
}


export { 
	getBills,
	getBillsByCategory,
	postBill,
	postBills,
	deleteBill,
	getCategoriesForUser,
	signupUser,
	loginUser
};