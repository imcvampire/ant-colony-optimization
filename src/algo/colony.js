import { Ant } from './ant.js';

export class Colony {
	/**
	 * @param {number[][]} distances
	 */
	constructor(distances, { numberOfAnts = 20, rho = 1, alpha = 1, beta = 1, Q = 1, pher = 1 }) {
		this.distances = distances;
		this.pheromones = [];
		this.pher = pher

		this.initializePheromones();

		this.rho = rho;
		this.alpha = alpha;
		this.beta = beta;
		this.Q = Q;

		this.ants = [];
		this.numberOfAnts = 0;

		this.setPopulation(numberOfAnts);

		this.bestRouteLength = Number.MAX_VALUE;
		this.bestRoute = [];
	}

	initializePheromones() {
		this.pheromones = this.distances.map((v, i) => v.map((n, j) => {
			return this.pher;
		}));
	}

	/**
	 * Determine the number of ants in the Colony
	 * 
	 * @param {number} numberOfAnts
	 */
	setPopulation(numberOfAnts) {
		let newAnt = () => new Ant({ alpha: this.alpha, beta: this.beta, Q: this.Q, });
		this.ants = Array.from({ length: numberOfAnts }, newAnt);
		this.numberOfAnts = numberOfAnts;
	}

	iterate() {
		this.exploreRoutes();
		this.indentifyBestPath();
		this.updatePheromones();
	}

	/**
	 * Send out ants to explorer routes
	 */
	exploreRoutes() {
		this.ants.forEach(ant => {
			ant.findRoute(this.distances, this.pheromones)
		});
	}

	/**
	 * Deamon actions
	 */
	indentifyBestPath() {
		this.ants.forEach(ant => {
			if (this.bestRouteLength > ant.routeLength) {
				this.bestRouteLength = ant.routeLength;
				this.notify(ant.route, ant.routeLength);
				this.bestRoute = ant.route;
			}
		})
	}

	/**
	 * Reinforce better routes
	 */
	updatePheromones() {
		this.evaporatePheromones();
		this.ants.forEach(ant => {
			ant.layPheromones(this.distances, this.pheromones);
		})
	}

	evaporatePheromones() {
		this.pheromones = this.pheromones.map(v =>
			v.map((value) => (1 - this.rho) * value));
	}

	/**
	 * Notify when better route found
	 */
	notify(route, length) {

	}

	setNotify(notify) {
		this.notify = notify;
	}
}