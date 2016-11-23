import $ from 'jquery'


import { lengthOfRoute } from 'stuff/route';
import { pass, delay } from 'stuff/promise';
import { round10, range } from 'stuff/math';

import { Colony } from 'algo/colony';
import { nearestNeighboorAlgo } from 'algo/nn';
import { twoOptComplete } from 'algo/opt';
import { TSP } from 'problem/tsp';

import { Graph } from 'dashboard/graph';

let graph = new Graph('#graph'),
	pheromonesGraph = new Graph('#pheromones');

let tsp = new TSP(20, {width: 470, height: 470});

let iterations = null;

graph.setNodes(tsp.nodes);
pheromonesGraph.setNodes(tsp.nodes);


function setNodes(numberOfNodes) {
	tsp.generateRandomNodes(numberOfNodes);
	graph.setNodes(tsp.nodes);
	pheromonesGraph.setNodes(tsp.nodes);
}

function addRoute(id, route, length) {
	let dRoute = route instanceof Array ? [...route] : route;
	if (route instanceof Array && dRoute.length > 24) {
		dRoute = dRoute.slice(0, 24);
		dRoute.push('...');
	}
	let row = $('<tr></tr>', {
		class: 'row',
		html: `
			<th class="mdl-data-table__cell--non-numeric">${id}</th>
			<th class="mdl-data-table__cell--non-numeric">${dRoute}</th>
			<th>${round10(length, 2)}</th>`
	}).click(() => {
		if (route instanceof Array) {
			graph.setRoute(route);
		}
		// window.location.href = "#display";
	});

	$("#routeTable").append(row);
}

function clearTable() {
	$("#routeTable").empty();
}

function stop() {
	clearInterval(iterations);
}

function refresh() {
	stop();
	clearTable();
	graph.clear();
	pheromonesGraph.clear();
	setNodes($("#numberOfNodes").val() || 20);
}

function start() {
	stop();
	let demo = $("input[name='demo']:checked").val();
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
			addRoute('aco', 'following', 0);
			iterations = setInterval(() => {
				++i;

				let found = (route, length) => {
					graph.setRoute(route);
					addRoute(i, route, length);
				}
				colony.setNotify(found);

				colony.iterate();
				pheromonesGraph.setWeights(colony.pheromones);

				if (i == maxIteration) {
					stop();
					addRoute('aco', 'finish', colony.bestRouteLength);
				}
			}, duration);

			break;
		}

		case "NN": {
			let route = nearestNeighboorAlgo(tsp.distances);
			graph.setRoute(route);
			addRoute('nn', route, lengthOfRoute(route, tsp.distances));
			pheromonesGraph.setWeights();
			break;
		}
		
		case "2OPT": {
			let route = [],
				unvisited = range(tsp.distances.length);

			route.push(unvisited.shift());
			while (unvisited.length > 0) {
				let [randomNode] = unvisited.splice(Math.random() * unvisited.length, 1);
				route.push(randomNode);
			}
			route.push(0);
			graph.setRoute(route);
			addRoute('rnd', route, lengthOfRoute(route, tsp.distances));

			route = twoOptComplete(route, tsp.distances);
			setTimeout(() => {
				graph.setRoute(route);
				addRoute('2opt', route, lengthOfRoute(route, tsp.distances));
			}, +$('#duration').val() || 100);
			break;
		}

		default: {
			break;
		}
	}
}

$("#start").click(() => {
	pass().then(delay(+$("#duration").val() || 100))
		.then(start);
});

$("#stop").click(stop);
$("#refresh").click(refresh);
$("#clear").click(clearTable);