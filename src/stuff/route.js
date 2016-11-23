/**
 * Return distance between two point
 * 
 * @param {{x: number, y: number}} from
 * @param {{x: number, y: number}} to
 */
export function distance(from, to) {
	return Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
}


/**
 * Give the total length of the route from matrix of distances
 * 
 * @param {number[]} route
 * @param {number[][]} distances
 */
export function lengthOfRoute(route, distances) {
	let len = route.length;

	let distance = 0;
	for (let i = 0; i < len - 1; ++i) {
		let cur = route[i],
			next = route[i + 1];

		distance += distances[cur][next];
	}

	return distance;
}