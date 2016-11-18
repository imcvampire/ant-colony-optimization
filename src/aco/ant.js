import { twoOptComplete, randomIndexFrom, lengthOfRoute, range, sumOf } from '../helpers.js';

export class Ant {
	constructor({alpha = 1, beta = 1, Q = 1}) {
		this.alpha = alpha;
		this.beta = beta;
		this.Q = Q;

		this.base = 0;

		this.route = [];
		this.routeLength;
	}

	/**
	 * Construct a new solution
	 * 
	 * @param {number[][]} distances
	 * @param {number[][]} pheromones
	 */
	findRoute(distances, pheromones) {
		this.route = [this.base];
		let numberOfNodes = distances.length;

		while (this.route.length < numberOfNodes) {
			let currentNode = this.route[this.route.length - 1];
			this.route.push(this.nextNode(currentNode, distances, pheromones));
		}

		/** Optional */
		// twoOptComplete(route, distances);

		this.route.push(this.base);
		this.routeLength = lengthOfRoute(this.route, distances);
	}

	/**
	 * Choose next node from probabilities
	 * 
	 * @param {number} currentNode
	 * @param {number[][]} distances
	 * @param {number[][]} pheromones
	 */
	nextNode(currentNode, distances, pheromones) {
		let numberOfNodes = distances.length;

		let unvisited = (node) => {
			return this.route.indexOf(node) == -1;
		};
		let calculateWeight = (distance, pheromone) => {
			distance = distance < 0.1 ? 0.1 : distance;
			return Math.pow(1 / distance, this.alpha) * Math.pow(pheromone, this.beta);
		}

		let unvisitedNodes = range(numberOfNodes).filter(unvisited);

		let weights = unvisitedNodes.map(node => {
			return calculateWeight(distances[currentNode][node], pheromones[currentNode][node]);
		});
		let sumOfWeights = sumOf(weights);
		let probs = weights.map(weight => weight / sumOfWeights);

		let randomNode = unvisitedNodes[randomIndexFrom(probs)];
		return randomNode;
	}

	/**
	 * Leave trail marking
	 * 
	 * @param {number[][]} distances
	 * @param {number[][]} pheromones
	 */
	layPheromones(distances, pheromones) {
		let numberOfNodes = distances.length;

		for (let i = 0; i < numberOfNodes; ++i) {
			let currentNode = this.route[i],
				nextNode = this.route[i + 1];

			pheromones[currentNode][nextNode] += 1 / distances[currentNode][nextNode];
			pheromones[nextNode][currentNode] += pheromones[currentNode][nextNode];
		}
	}
}