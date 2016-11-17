/**
 * Travel Saleman Problem
 */
export class TSP
{
	/**
	 * @param {number} [numberOfNodes]
	 */
	constructor(numberOfNodes)
	{
		this.distances = [[]];

		/**
		 * @readonly
		 */
		this.numberOfNodes = 0;

		this.width = 10;
		this.height = 10;

		/**
		 * @param {any} logger
		 * @return {Promise<any>}
		 */
		this.solution = (logger) => {};
		this.logger = {};

		if (numberOfNodes) { this.generateRandomNodes() };
	}

	/**
	 * Generate random nodes from given number
	 * 
	 * @param {number} numberOfNodes
	 */
	generateRandomNodes(numberOfNodes)
	{
		let randomNode = () =>
		{
			return {x: Math.random() * this.width, y: Math.random() * this.height}
		}

		this.distances = Array.from({length: numberOfNodes}, randomNode);
		this.numberOfNodes = numberOfNodes;
	}
}