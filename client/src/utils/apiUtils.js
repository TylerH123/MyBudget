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
	const res = await fetch('http://localhost:4000/api/bills/', {
		method: 'POST',
		body: JSON.stringify(bill),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await res.json();

	return [res, data];
}

export { postBill };