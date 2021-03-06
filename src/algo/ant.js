import { randomIndexFrom, range, sumOf } from 'stuff/math';
import { lengthOfRoute } from 'stuff/route';

import { twoOptComplete } from 'algo/opt';

export class Ant {
	constructor({alpha = 1, beta = 1, Q = 1}) {
		this.alpha = alpha;
		this.beta = beta;
		this.Q = Q;

		this.base = 0;

		this.route = [];
		this.routeLength = Number.MAX_VALUE;
	}

	/**
	 * Construct a new solution
	 * 
	 * @param {number[][]} distances
	 * @param {number[][]} pheromones
	 */
	findRoute(distances, pheromones) {
		let route = [this.base];
		let numberOfNodes = distances.length;

		while (route.length < numberOfNodes) {
			let currentNode = route[route.length - 1],
				unvisited = range(numberOfNodes).filter((node) => {
					return route.indexOf(node) == -1
				}),
				nextNode = this.nextNode(currentNode, unvisited, distances, pheromones);
				
			route.push(nextNode);
		}

		/** Optional */
		// route = twoOptComplete(route, distances);

		route.push(this.base);

		this.route = route;

		this.routeLength = lengthOfRoute(this.route, distances);
	}

	/**
	 * Choose next node from probabilities
	 * 
	 * @param {number} currentNode
	 * @param {number[]} unvisited
	 * @param {number[][]} distances
	 * @param {number[][]} pheromones
	 */
	nextNode(currentNode, unvisited, distances, pheromones) {
		let numberOfNodes = distances.length;

		let calculateWeight = (distance, pheromone) => {
			distance = distance < 0.1 ? 0.1 : distance;
			return (1 / distance) ** this.alpha * pheromone ** this.beta;
		}

		let weights = unvisited.map(node => {
			return calculateWeight(distances[currentNode][node], pheromones[currentNode][node]);
		});

		let sumOfWeights = sumOf(weights);
		let probs = weights.map(weight => weight / sumOfWeights);

		let randomNode = unvisited[randomIndexFrom(probs)];
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

		let max = 0;

		for (let i = 0; i < numberOfNodes; ++i) {
			let currentNode = this.route[i],
				nextNode = this.route[i + 1],
				distance = distances[currentNode][nextNode];
			
			if (distance < 0.1) {
				distance = 0.1;
			}

			pheromones[currentNode][nextNode] += this.Q / this.routeLength;

			if (pheromones[currentNode][nextNode] < 0.1) {
				pheromones[currentNode][nextNode] = 0.1;
			}

			if (max < pheromones[currentNode][nextNode]) {
				max = pheromones[currentNode][nextNode];
			}

			pheromones[nextNode][currentNode] = pheromones[currentNode][nextNode];
		}
	}
}