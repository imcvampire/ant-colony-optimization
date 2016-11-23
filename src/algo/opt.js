/**
 * Return a new route by performing 2-OPT swap
 * 
 * @param {number[]} route
 * @param {number} start
 * @param {number} end
 */
export function twoOptSwap(route, start, end) {
	let paths = [
		route.slice(0, start),
		route.slice(start, end + 1).reverse(),
		route.slice(end + 1)
	];

	let newRoute = paths.reduce((currentRoute, nextPath) => currentRoute.concat(nextPath), []);

	return newRoute;
}


/**
 * Perform 2-OPT complete search
 * 
 * @param {number[]} route
 * @param {number[][]} distances
 */
export function twoOptComplete(route, distances) {
	let noImprovement;
	let numberOfNodes = distances.length;

	let count = 0;
	do {
		noImprovement = true;
		for (let i = 1; i < numberOfNodes - 1; ++i) {
			for (let j = i + 1; j < numberOfNodes; ++j) {
				let newRoute = twoOptSwap(route, i, j);
				if (lengthOfRoute(route, distances) > lengthOfRoute(newRoute, distances)) {
					route = newRoute;
					noImprovement = false;
				}
			}
		}
	} while (!noImprovement);

	return route;
}


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