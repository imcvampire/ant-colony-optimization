import $ from 'jquery'


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

let iterations = null;

graph.setNodes(tsp.nodes);
pheromonesGraph.setNodes(tsp.nodes);


function setNodes(numberOfNodes) {
	tsp.generateRandomNodes(numberOfNodes);
	graph.setNodes(tsp.nodes);
	pheromonesGraph.setNodes(tsp.nodes);
}



function start() {
	switch (demo) {
		case "ACO": {
			let options = {
				pher: +$("#pher").val() || 1,
				numberOfAnts: +$("#numberOfAnts").val() || 20,
				rho: +$("#rho").val() || 0.1,
				alpha: +$("#alpha").val() || 1,
				beta: +$("#beta") || 1,
				Q: +$("#Q").val || 100,
			};

			let maxIteration = +$("#maxIteration").val() || 200,
				duration = +$("#duration").val() || 100;

			let colony = new Colony(tsp.distances, options);


			pheromonesGraph.setWeights(colony.pheromones);

			let i = 0;
			iterations = setInterval(() => {
				++i;

				let found = (route, length) => {
					graph.setRoute(route);
					console.log(i, length);
				}
				colony.setNotify(found);

				colony.iterate();
				pheromonesGraph.setWeights(colony.pheromones);
			}, duration);

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

function stop() {
	clearInterval(iterations);
}

function refresh() {
	stop();
	graph.clear();
	pheromonesGraph.clear();
	setNodes($("#numberOfNodes").val() || 20);
}

$("#start").click(() => {
	pass().then(delay(+$("#duration").val() || 100))
		.then(start);
});

$("#stop").click(stop);
$("#refresh").click(refresh);
$("input[name='demo']").change(() => {
	demo = $("input[name='demo']:checked").val();
});