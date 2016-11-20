import { acoDemo } from 'demo/aco';
import { nnDemo } from 'demo/nn';
import { TSP } from 'problem/tsp';

import { Graph } from 'dashboard/graph';

let graph = new Graph('#graph'),
	pherGraph = new Graph('#pheromones'),
	tsp = new TSP(20, { width: 470, height: 470 });

graph.setNodes(tsp.nodes);
pherGraph.setNodes(tsp.nodes);

console.log(graph);

let logger = {
	logRoute: function (period, route, length) {
		console.log(period, route, length);
		graph.setRoute(route);
	},
	logGraphInfo: function (matrix) {
		pherGraph.setWeights(matrix);
	}
}

acoDemo(tsp, logger, {
	numberOfAnts: 10,
	rho: 0.6,
	duration: 100,
	pher: 1,
	maxIteration: 50
})
.then(() => {
	nnDemo(tsp, logger);
});