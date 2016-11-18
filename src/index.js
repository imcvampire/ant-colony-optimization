import { acoDemo } from './demo/demo.js';
import { TSP } from './problem/tsp.js';

let tsp = new TSP(100);

let logger = {
	logRoute: function (period, route, length) {
		console.log(period, route, length);
	},
	logGraphInfo: function (graph) { }
}

acoDemo(tsp, logger, {
	numberOfAnts: 40,
	rho: 0.1,
	duration: 10
});