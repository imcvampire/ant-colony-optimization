import { pass, delay } from 'stuff/promise';
import { TSP } from 'problem/tsp';
import { Colony } from 'aco';


/**
 * Ant Colony Optimization algorithm demo
 * 
 * @param {TSP} tsp
 */
export function acoDemo(tsp,
	{
		logRoute = () => { },
		logGraphInfo = () => { }
	}, {
		numberOfAnts = 2,
		rho = 1,
		alpha = 1,
		beta = 1,
		Q = 1,
		duration = 100
	}) {

	let colony = new Colony(tsp.distances, {
		numberOfAnts: numberOfAnts,
		rho: rho,
		alpha: alpha,
		beta: beta,
		Q: Q
	});

	let periods = pass();
	for (let i = 0; i < 100; ++i) {
		periods = periods.then(() => {
			let notify = (route, length) => {
				logRoute(i, route, length);
			}
			colony.setNotify(notify);
			
			colony.iterate();

			logGraphInfo(colony.pheromones);
		})
			.then(delay(duration));
	}

	periods.then(() => console.log('done'));

	return periods;
}