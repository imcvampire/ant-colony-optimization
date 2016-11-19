import { acoDemo } from 'demo/aco';
import { nnDemo } from 'demo/nn';
import { TSP } from 'problem/tsp';


let tsp = new TSP(20);

let logger = {
	logRoute: function (period, route, length) {
		console.log(period, route, length);
	},
	logGraphInfo: function (graph) { console.log(graph) }
}

acoDemo(tsp, logger, {
	numberOfAnts: 10,
	rho: 0.1,
	duration: 10,
	pher: 1
});


nnDemo(tsp, logger);