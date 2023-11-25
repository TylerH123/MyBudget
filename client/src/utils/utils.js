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

export { convertPriceStringToInt };