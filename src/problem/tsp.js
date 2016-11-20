import { distance } from 'stuff/route';

/**
 * Travel Saleman Problem
 */
export class TSP {

	constructor(numberOfNodes = 20, { width = 500, height = 500 }) {
		/** @readonly */
		this.numberOfNodes;

		this.width = width;
		this.height = height;

		/** @readonly */
		this.nodes = [];
		/** @readonly */
		this.distances = [[]];

		this.generateRandomNodes(numberOfNodes);
	}

	/**
	 * Generate random nodes from given number
	 * 
	 * @param {number} numberOfNodes
	 */
	generateRandomNodes(numberOfNodes) {
		let randomNode = () => {
			return { x: Math.random() * this.width, y: Math.random() * this.height }
		}

		this.nodes = Array.from({ length: numberOfNodes }, randomNode);
		this.numberOfNodes = numberOfNodes;
		this.distances = Array.from({ length: numberOfNodes }, (vi, i) => {
			return Array.from({ length: numberOfNodes }, (vj, j) => distance(this.nodes[i], this.nodes[j]));
		});
	}
}