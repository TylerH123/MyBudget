/**
 * Converts a price string in the format "$X.XX" to an integer representing the price in cents.
 *
 * @param {string} price - The price string to be converted, in the format "$X.XX".
 * @returns {number} - The integer representation of the price in cents.
 *
 * @example
 * // Returns 499 for the input "$4.99"
 * const result = convertPriceStringToInt("$4.99");
*/
const convertPriceStringToInt = (price) => {
	let priceArray = price.slice(1).split('.')
	let amount = parseInt(priceArray[0]) * 100;
	if (priceArray.length === 2) {
		amount += parseInt(priceArray[1]);
	}

	return amount
}

/**
 * Converts a date type object into a string with format "MM/DD/YYYY".
 *
 * @param {Date} date - The date object to be converted.
 * @returns {string} - The string representation of the date.
 *
 * @example
 * // Returns 01/01/2023 for the input 2023-01-01T05:00:00.000Z
 * const result = convertPriceStringToInt(Date('2023-01-01T05:00:00.000Z'));
*/
const displayDate = (date) => {
	date = new Date(date);
	const dateString = date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	return dateString;
}

/**
 * Converts amount intger into a string with format "$X.XX".
 *
 * @param {Number} amount - The amount to be converted.
 * @returns {string} - The string representation of the amount.
*/
const displayBillAmount = (amount) => {
	if (amount % 100 === 0) {
		return '$' + (amount / 100).toString() + '.00';
	}
	else if (amount % 10 === 0) {
		return '$' + (amount / 100).toString() + '0';
	}
	return '$' + (amount / 100).toString();
}

export { convertPriceStringToInt, displayDate, displayBillAmount };