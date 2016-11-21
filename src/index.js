import { lengthOfRoute } from 'stuff/route';
import { pass, delay } from 'stuff/promise';

import { Colony } from 'algo/colony';
import { nearestNeighboorAlgo } from 'algo/nn';
import { TSP } from 'problem/tsp';

import { Graph } from 'dashboard/graph';

let graph = new Graph('#graph'),
	pheromonesGraph = new Graph('#pheromones');

let tsp = new TSP(20, {width: 470, height: 470});
let demo = "ACO";
let stop = false;

function setNodes(numberOfNodes) {
	tsp.generateRandomNodes(numberOfNodes);
	graph.setNodes(tsp.nodes);
	pheromonesGraph.setNodes(tsp.nodes);
}


function select(name = "ACO") {
	demo = name;
}

function start() {
	stop = false;
	switch (demo) {
		case "ACO": {
			let options = {
				pher: 1,
				numberOfAnts: 20,
				rho: 0.1,
				alpha: 1,
				beta: 1,
				Q: 100,
			};

			let maxIteration = 100,
				duration = 100;

			let colony = new Colony(tsp.distances, options);


			pheromonesGraph.setWeights(colony.pheromones);

			let iterations = pass();
			for (let i = 0; i < maxIteration; ++i) {
				iterations = iterations.then(() => {
					if (stop) {
						return;
					}

					let found = (route, length) => {
						graph.setRoute(route);
						console.log(i, length);
					}
					colony.setNotify(found);

					colony.iterate();
					pheromonesGraph.setWeights(colony.pheromones);
				}).then(delay(duration));
			}

			iterations.then(() => {
				console.log('done');
			})

			break;
		}

		case "NN": {
			let route = nearestNeighboorAlgo(tsp.distances);
			graph.setRoute(route);
			console.log('nn', lengthOfRoute(route, tsp.distances));
			pheromonesGraph.setWeights();
			break;
		}

		default: {
			break;
		}
	}
}

function refresh() {
	stop = true;
}


setNodes(20);
select("NN");
start();
select("ACO");
start();