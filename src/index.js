import { acoDemo } from 'demo/aco';
import { nnDemo } from 'demo/nn';
import { TSP } from 'problem/tsp';

import { Graph } from 'dashboard/graph';

let graph = new Graph('#graph'),
	tsp = new TSP(20, { width: 470, height: 470 });

graph.setNodes(tsp.nodes);

let logger = {
	logRoute: function (period, route, length) {
		console.log(period, route, length);
		graph.setRoute(route);
	},
	logGraphInfo: function (graph) { }
}

acoDemo(tsp, logger, {
	numberOfAnts: 10,
	rho: 0.1,
	duration: 800,
	pher: 1
})
.then(() => {
	nnDemo(tsp, logger);
});