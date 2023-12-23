/**
 * Sends a GET request to retrieve all the bills for a user.
 *
 * @param {year} string - The name of the collection to get the data from.
 * @returns {Promise<{ response: Response, data: any }>} - A promise resolving to an object containing the response and parsed JSON data.
*/
const getBills = async (year) => {
	const res = await fetch(`http://localhost:4000/api/bills/${year}`);
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
const getBillsByCategory = async (year, category) => {
	const res = await fetch(`http://localhost:4000/api/bills/${year}/${category}`);
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
const postBill = async (bill) => {
	const year = bill.date.getFullYear();
	const res = await fetch(`http://localhost:4000/api/bills/${year}`, {
		method: 'POST',
		body: JSON.stringify(bill),
		headers: {
			'Content-Type': 'application/json'
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
const deleteBill = async (year, id) => {
	const res = await fetch(`http://localhost:4000/api/bills/${year}/bill/${id}`, {
		method: 'DELETE'
	});
	const data = await res.json();

	return [res, data];
}

// ================User Routes===================

/**
 * Sends a GET request to retrieve all the categories for a user.
 *
 * @returns {Promise<{ response: Response, data: any }>} - A promise resolving to an object containing the response and parsed JSON data.
*/
const getCategoriesForUser = async () => {
	const res = await fetch('http://localhost:4000/api/users/categories/options');
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
	deleteBill,
	getCategoriesForUser,
	signupUser,
	loginUser
};