/**
 * @param {number[]} arr
 */
export function sumOf(arr) {
	return arr.reduce((preVal, curVal) => preVal + curVal);
}


/**
 * Return an array of number from the given range
 * 
 * @param {number} end
 */
export function range(end) {
	return Array.from({ length: end }, (v, k) => k);
}


/**
 * Get a random index from probabilities
 * 
 * @param {number[]} probs probabilities
 */
export function randomIndexFrom(probs) {
	let rand = Math.random();

	let randId = -1;
	let amount = 0;
	let len = probs.length;

	do {
		randId++;
		amount += probs[randId];
	} while (rand > amount && randId < len);

	return randId;
}

/**
 * Decimal rounding
 * 
 * @param {number} number
 * @param {number} precision
 * @param The adjusted value
 */
export function round10(number, precision) {
	let factor = 10 ** precision;
	let temp = number * factor;
	temp = Math.round(temp);
	return temp / factor;
}