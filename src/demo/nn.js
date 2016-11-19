import { TSP } from 'problem/tsp';
import { lengthOfRoute } from 'stuff/route';
import { nearestNeighboorAlgo } from 'nn/nn';

/**
 * Nearest Neighboor algorithm demo
 */
export function nnDemo(tsp,
	{
		logRoute = () => { }
	}) {
	
	let route = nearestNeighboorAlgo(tsp.distances);

	logRoute(0, route, lengthOfRoute(route));
}