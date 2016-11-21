import { lengthOfRoute } from 'stuff/route';
import { range } from 'stuff/math';

/**
 * Get nearest unvisited node from current node
 * 
 * @param {number} currentNode
 * @param {number[]} unvisited
 * @param {number[][]} distances
 */
function nearestNode(currentNode, unvisited, distances) {
	return unvisited.reduce((nearest, cur) =>
	{
		return distances[currentNode][cur] < distances[currentNode][nearest] ? cur : nearest;
	});
}


/**
 * Best route when start from base node using nearest neighboor strategy
 * 
 * @param {number} base
 * @param {number[][]} distances
 */
function bestRouteFrom(base, distances) {
	let route = [base];
	let numberOfNodes = distances.length;

	while (route.length < numberOfNodes) {
		let currentNode = route[route.length - 1],
			unvisited = range(numberOfNodes)
			.filter(node => route.indexOf(node) == -1);
		
		route.push(nearestNode(currentNode, unvisited, distances));
	}

	route.push(base);

	return route;
}


/**
 * Return best route from matrix of distances
 * 
 * @param {number[][]} distances
 * @return {number[]} shortestRoute
 */
export function nearestNeighboorAlgo(distances) {
	let numberOfNodes = distances.length;

	let shortestRoute = [];
	let shortestRouteLength = Number.MAX_VALUE;
	for (let i = 0; i < numberOfNodes; ++i) {
		let recentRoute = bestRouteFrom(i, distances),
			recentRouteLength = lengthOfRoute(recentRoute, distances);

		if (shortestRouteLength > recentRouteLength) {
			shortestRoute = recentRoute;
			shortestRouteLength = recentRouteLength;
		}
	}

	return shortestRoute;
}