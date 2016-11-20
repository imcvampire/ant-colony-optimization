import * as d3 from 'd3';

export class Graph {
	constructor(selector) {
		this.nodes = [];
		
		this.weightElements = d3.select(selector)
			.append("g")
			.classed("weights", true);

		this.lineElements = d3.select(selector)
			.append("g")
			.classed("lines", true);

		this.nodeElements = d3.select(selector)
			.append("g")
			.classed("nodes", true);
	}

	setNodes(nodes) {
		this.nodes = nodes;
		this.nodeElements.selectAll("circle").remove();
		this.nodeElements.selectAll("circle")
			.data(nodes).enter()
			.append("circle")
			.classed("node", true)
			.attr("cx", (data) => data.x)
			.attr("cy", (data) => data.y);
	}

	setWeights(weights) {

	}

	setRoute(route) {
		let lines = [],
			len = route.length -1;
		
		for (let i = 0; i < len; ++i) {
			let cur = route[i],
				next = route[i + 1],
				line = { from: this.nodes[cur], to: this.nodes[next] };

			lines.push(line);
		}
		
		this.lineElements.selectAll("line").remove();
		this.lineElements.selectAll("line")
			.data(lines).enter()
			.append("line")
			.classed("line", true)
			.attr("x1", data => data.from.x)
			.attr("y1", data => data.from.y)
			.attr("x2", data => data.to.x)
			.attr("y2", data => data.to.y);
	}
}