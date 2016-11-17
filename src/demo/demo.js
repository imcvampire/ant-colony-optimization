import { pass, delay } from './helpers.js';

import { Ant } from './ant.js';
import { Colony } from './colony.js';
import { TSP } from './tsp.js';


/**
 * Ant Colony Optimization algorithm demo
 * 
 * @param {TSP} tsp
 * @param {{logRoute: function(number[]), logGraphInfo: function(number[][])}} logger
 */
function acoDemo(tsp, logger = {
						logGraphInfo: () => {},
						logRoute: () => {}
					}, infos = {
						numberOfAnts: 20,
						rho: 1,
						alpha: 1,
						beta: 1,
						Q: 1
					})
{
	let colony = new Colony(infos.numberOfAnts, tsp.distances);

	let period = pass();
	for (let i = 0; i < 100; ++i)
	{
		period = period.then(() =>
		{
			colony.nextPeriod();

			logger.logGraphInfo(colony.pheromones);
			logger.logRoute(colony.distances);
		})
		.then()
		.then(delay(800));
	}

	return periods
}