/**
 * Return a new route by performing 2-OPT swap
 * 
 * @param {number[]} route
 * @param {number} start
 * @param {number} end
 */
export function twoOptSwap(route, start, end)
{
	let paths = [
			route.slice(0, start),
			route.slice(start, end).reverse(),
			route.slice(end)
		];

	return paths.reduce((currentRoute, nextPath) => currentRoute.concat(nextPath), []);
}


/**
 * Perform 2-OPT complete search
 * 
 * @param {number[]} route
 * @param {number[][]} distances
 */
export function twoOptComplete(route, distances)
{
	let noImprovement = true;
	let numberOfNodes = distances.length;
	do {
		for (let i = 1; i < numberOfNodes; ++i)
		{
			for (let j = i + 1; j < numberOfNodes; ++j)
			{
				if (distances[i - 1][i] + distances[j - 1][j] < distances[i - 1][j] + distances[j - 1][i])
				{
					route = twoOptSwap(route, i, j);
					noImprovement = false;
				}
			}
		}
	} while (noImprovement);

	return route;
}


/**
 * Return distance between two point
 * 
 * @param {{x: number, y: number}} from
 * @param {{x: number, y: number}} to
 */
export function distance(from, to)
{
	return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
}


/**
 * Give the total length of the route from matrix of distances
 * 
 * @param {number[]} route
 * @param {number[][]} distances
 */
export function lengthOfRoute(route, distances)
{
	let len = route.length;

	let distance = 0;
	for (let i = 0; i < len - 1; ++i)
	{
		let cur = route[i],
			next = route[i + 1];
			
		distance += distances[cur][next];
	}

	return distance;
}