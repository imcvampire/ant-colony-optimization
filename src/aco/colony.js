import { Ant } from './ant.js';

export class Colony
{
	/**
	 * @param {number} [numberOfAnts=10]
	 * @param {number[][]} distances
	 */
	constructor(distances, info = {
								numberOfAnts: 20,
								rho: 1,
								alpha: 1,
								beta: 1,
								Q: 1
							})
	{
		this.distances = distances;
		this.pheromones = distances.map((v, i) => v.map((n, j) => 1 / distances[i][j]));

		this.rho = info.rho;
		this.alpha = info.alpha;
		this.beta = info.beta;
		this.Q = info.Q;

		let newAnt = () => new Ant(info);
		this.ants = Array.from({length: info.numberOfAnts}, newAnt);
		this.numberOfAnts = info.numberOfAnts;

		this.routes = [];
	}


	/**
	 * Determine the number of ants in the Colony
	 * 
	 * @param {number} numberOfAnts
	 */
	setPopulation(numberOfAnts)
	{
		let newAnt = () => new Ant(this.rho, this.alpha, this.beta);
		this.ants = Array.from({length: numberOfAnts}, newAnt);
		this.numberOfAnts = numberOfAnts;
	}


	/**
	 * Iterate
	 */
	nextPeriod()
	{
		this.exploreRoutes();
		this.indentifyBestPath();
		this.updatePheromones();
	}

	/**
	 * Send out ants to explorer routes
	 */
	exploreRoutes()
	{
		this.ants.forEach(ant =>
		{
			ant.findRoute(this.distances, this.pheromones)
		});
	}

	/**
	 * Deamon actions
	 */
	indentifyBestPath()
	{
		let bestPathInPeriod = this.ants.map(ant => ant.routeLength)
			.reduce((lastShortest, curLength) => Math.min(lastShortest, curLength));
		
		let lastRoutes = this.routes[this.routes.length - 1];
		
		if (bestPathInPeriod > lastRoutes)
		{
			this.routes.push(bestPathInPeriod)
		}
	}

	/**
	 * Reinforce better routes
	 */
	updatePheromones()
	{
		this.evaporatePheromones();
		this.ants.forEach(ant =>
		{
			ant.layPheromones(this.distances, this.pheromones);
		})
	}

	evaporatePheromones()
	{
		this.pheromones.forEach(v =>
		{
			v.map((value) => (1 - this.rho) * value);
		})
	}
}