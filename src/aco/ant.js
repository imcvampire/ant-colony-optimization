import { twoOptComplete, randomIndexFrom, lengthOfRoute, range, sumOf } from './helpers.js';

export class Ant
{
	constructor(info = {
					rho: 1,
					alpha: 1,
					beta: 1,
					Q: 1
				})
	{
		this.alpha = info.alpha;
		this.beta = info.beta;
		this.Q = info.Q;

		this.base = 0;

		this.route = [];
		this.routeLength = 0;
	}
	
	/**
	 * Construct a new solution
	 * 
	 * @param {number[][]} distances
	 * @param {number[][]} pheromones
	 */
	findRoute(distances, pheromones)
	{
		this.route = [this.base];
		let numberOfNodes = distances.length;

		while (this.route.length < numberOfNodes)
		{
			let currentNode = this.route[this.route.length - 1];
			this.route.push(this.nextNode(currentNode, distances, pheromones));
		}

		/** Optional */
		// twoOptComplete(route, distances);

		route.push(this.base);

		this.route = route;
		this.routeLength = lengthOfRoute(route, distances);
	}

	/**
	 * Choose next node from probabilities
	 * 
	 * @param {number} currentNode
	 * @param {number[][]} distances
	 * @param {number[][]} pheromones
	 */
	nextNode(currentNode, distances, pheromones)
	{
		let numberOfNodes = distances.length;

		let unvisited = (node => this.route.indexOf(node));
			calculateWeight = (distance, pheromone) => (Math.pow(1 / distance, this.alpha) * Math.pow(pheromone, this.beta));

		let weights = range(numberOfNodes).filter(unvisited)
			.map(unvisitedNode => calculateWeight(distances[currentNode][unvisitedNode], pheromones[currentNode][unvisitedNode]));

		let sumOfWeights = sumOf(weights);

		let probs = weights.map(weight => weight / sumOfWeights);

		return randomIndexFrom(probs);
	}

	/**
	 * Leave trail marking
	 * 
	 * @param {number[][]} distances
	 * @param {number[][]} pheromones
	 */
	layPheromones(distances, pheromones)
	{
		let numberOfNodes = distances.length;

		for (let i = 0; i < numberOfNodes; ++i)
		{
			let currentNode = this.route[i],
				nextNode = this.route[i + 1];

			pheromones[currentNode][nextNode] += 1 / distances[currentNode][nextNode];
			pheromones[nextNode][currentNode] += 1 / distances[nextNode][currentNode];
		}
	}
}