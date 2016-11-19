webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(11);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _demo = __webpack_require__(2);
	
	var _tsp = __webpack_require__(10);
	
	var tsp = new _tsp.TSP(20);
	
	var logger = {
		logRoute: function logRoute(period, route, length) {
			console.log(period, route, length);
		},
		logGraphInfo: function logGraphInfo(graph) {}
	};
	
	(0, _demo.acoDemo)(tsp, logger, {
		numberOfAnts: 10,
		rho: 0.1,
		duration: 10
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.acoDemo = acoDemo;
	
	var _promise = __webpack_require__(3);
	
	var _aco = __webpack_require__(4);
	
	var _tsp = __webpack_require__(10);
	
	/**
	 * Ant Colony Optimization algorithm demo
	 * 
	 * @param {TSP} tsp
	 */
	function acoDemo(tsp, _ref, _ref2) {
		var _ref$logRoute = _ref.logRoute,
		    logRoute = _ref$logRoute === undefined ? function () {} : _ref$logRoute,
		    _ref$logGraphInfo = _ref.logGraphInfo,
		    logGraphInfo = _ref$logGraphInfo === undefined ? function () {} : _ref$logGraphInfo;
		var _ref2$numberOfAnts = _ref2.numberOfAnts,
		    numberOfAnts = _ref2$numberOfAnts === undefined ? 2 : _ref2$numberOfAnts,
		    _ref2$rho = _ref2.rho,
		    rho = _ref2$rho === undefined ? 1 : _ref2$rho,
		    _ref2$alpha = _ref2.alpha,
		    alpha = _ref2$alpha === undefined ? 1 : _ref2$alpha,
		    _ref2$beta = _ref2.beta,
		    beta = _ref2$beta === undefined ? 1 : _ref2$beta,
		    _ref2$Q = _ref2.Q,
		    Q = _ref2$Q === undefined ? 1 : _ref2$Q,
		    _ref2$duration = _ref2.duration,
		    duration = _ref2$duration === undefined ? 100 : _ref2$duration;
	
	
		var colony = new Colony(tsp.distances, {
			numberOfAnts: numberOfAnts,
			rho: rho,
			alpha: alpha,
			beta: beta,
			Q: Q
		});
	
		var periods = (0, _promise.pass)();
	
		var _loop = function _loop(i) {
			periods = periods.then(function () {
				var notify = function notify(route, length) {
					logRoute(i, route, length);
				};
				colony.setNotify(notify);
	
				colony.iterate();
	
				logGraphInfo(colony.pheromones);
			}).then((0, _promise.delay)(duration));
		};
	
		for (var i = 0; i < 100; ++i) {
			_loop(i);
		}
	
		periods.then(function () {
			return console.log('done');
		});
	
		return periods;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pass = pass;
	exports.delay = delay;
	/**
	 * Pass the arguments for next promise task
	 */
	function pass() {
	  for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
	    arg[_key] = arguments[_key];
	  }
	
	  return new Promise(function (resolve) {
	    resolve.apply(undefined, arg);
	  });
	}
	
	/**
	 * Delay promise in given duration
	 * 
	 * E.g.
	 * ```
	 * emit('ok').then(delay(duration)).then(console.log);
	 * ```
	 * 
	 * @param {number} duration millisecond
	 */
	function delay(duration) {
	  return function () {
	    for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      arg[_key2] = arguments[_key2];
	    }
	
	    return new Promise(function (resolve) {
	      setTimeout(function () {
	        resolve.apply(undefined, arg);
	      }, duration);
	    });
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ant = __webpack_require__(5);
	
	Object.defineProperty(exports, 'Ant', {
	  enumerable: true,
	  get: function get() {
	    return _ant.Ant;
	  }
	});
	
	var _colony = __webpack_require__(9);
	
	Object.defineProperty(exports, 'Colony', {
	  enumerable: true,
	  get: function get() {
	    return _colony.Colony;
	  }
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Ant = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _math = __webpack_require__(6);
	
	var _route = __webpack_require__(7);
	
	var _opt = __webpack_require__(8);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Ant = exports.Ant = function () {
		function Ant(_ref) {
			var _ref$alpha = _ref.alpha,
			    alpha = _ref$alpha === undefined ? 1 : _ref$alpha,
			    _ref$beta = _ref.beta,
			    beta = _ref$beta === undefined ? 1 : _ref$beta,
			    _ref$Q = _ref.Q,
			    Q = _ref$Q === undefined ? 1 : _ref$Q;
	
			_classCallCheck(this, Ant);
	
			this.alpha = alpha;
			this.beta = beta;
			this.Q = Q;
	
			this.base = 0;
	
			this.route = [];
			this.routeLength;
		}
	
		/**
	  * Construct a new solution
	  * 
	  * @param {number[][]} distances
	  * @param {number[][]} pheromones
	  */
	
	
		_createClass(Ant, [{
			key: 'findRoute',
			value: function findRoute(distances, pheromones) {
				var route = [this.base];
				var numberOfNodes = distances.length;
	
				while (route.length < numberOfNodes) {
					var currentNode = route[route.length - 1],
					    unvisited = (0, _math.range)(numberOfNodes).filter(function (node) {
						return route.indexOf(node) == -1;
					}),
					    nextNode = this.nextNode(currentNode, unvisited, distances, pheromones);
	
					route.push(nextNode);
				}
	
				/** Optional */
				// twoOptComplete(route, distances);
	
				route.push(this.base);
	
				this.route = route;
				this.routeLength = (0, _route.lengthOfRoute)(this.route, distances);
			}
	
			/**
	   * Choose next node from probabilities
	   * 
	   * @param {number} currentNode
	   * @param {number[]} unvisited
	   * @param {number[][]} distances
	   * @param {number[][]} pheromones
	   */
	
		}, {
			key: 'nextNode',
			value: function nextNode(currentNode, unvisited, distances, pheromones) {
				var _this = this;
	
				var numberOfNodes = distances.length;
	
				var calculateWeight = function calculateWeight(distance, pheromone) {
					distance = distance < 0.1 ? 0.1 : distance;
					return Math.pow(1 / distance, _this.alpha) * Math.pow(pheromone, _this.beta);
				};
	
				var weights = unvisited.map(function (node) {
					return calculateWeight(distances[currentNode][node], pheromones[currentNode][node]);
				});
				var sumOfWeights = (0, _math.sumOf)(weights);
				var probs = weights.map(function (weight) {
					return weight / sumOfWeights;
				});
	
				var randomNode = unvisited[(0, _math.randomIndexFrom)(probs)];
				return randomNode;
			}
	
			/**
	   * Leave trail marking
	   * 
	   * @param {number[][]} distances
	   * @param {number[][]} pheromones
	   */
	
		}, {
			key: 'layPheromones',
			value: function layPheromones(distances, pheromones) {
				var numberOfNodes = distances.length;
	
				for (var i = 0; i < numberOfNodes; ++i) {
					var currentNode = this.route[i],
					    nextNode = this.route[i + 1];
	
					pheromones[currentNode][nextNode] += 1 / distances[currentNode][nextNode];
					pheromones[nextNode][currentNode] += pheromones[currentNode][nextNode];
				}
			}
		}]);

		return Ant;
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.sumOf = sumOf;
	exports.range = range;
	exports.randomIndexFrom = randomIndexFrom;
	/**
	 * @param {number[]} arr
	 */
	function sumOf(arr) {
		return arr.reduce(function (preVal, curVal) {
			return preVal + curVal;
		});
	}
	
	/**
	 * Return an array of number from the given range
	 * 
	 * @param {number} end
	 */
	function range(end) {
		return Array.from({ length: end }, function (v, k) {
			return k;
		});
	}
	
	/**
	 * Get a random index from probabilities
	 * 
	 * @param {number[]} probs probabilities
	 */
	function randomIndexFrom(probs) {
		var rand = Math.random();
	
		var randId = -1;
		var amount = 0;
		var len = probs.length;
	
		do {
			randId++;
			amount += probs[randId];
		} while (rand > amount && randId < len);
	
		return randId;
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.distance = distance;
	exports.lengthOfRoute = lengthOfRoute;
	/**
	 * Return distance between two point
	 * 
	 * @param {{x: number, y: number}} from
	 * @param {{x: number, y: number}} to
	 */
	function distance(from, to) {
		return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
	}
	
	/**
	 * Give the total length of the route from matrix of distances
	 * 
	 * @param {number[]} route
	 * @param {number[][]} distances
	 */
	function lengthOfRoute(route, distances) {
		var len = route.length;
	
		var distance = 0;
		for (var i = 0; i < len - 1; ++i) {
			var cur = route[i],
			    next = route[i + 1];
	
			distance += distances[cur][next];
		}
	
		return distance;
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.twoOptSwap = twoOptSwap;
	exports.twoOptComplete = twoOptComplete;
	exports.distance = distance;
	exports.lengthOfRoute = lengthOfRoute;
	/**
	 * Return a new route by performing 2-OPT swap
	 * 
	 * @param {number[]} route
	 * @param {number} start
	 * @param {number} end
	 */
	function twoOptSwap(route, start, end) {
		var paths = [route.slice(0, start), route.slice(start, end).reverse(), route.slice(end)];
	
		return paths.reduce(function (currentRoute, nextPath) {
			return currentRoute.concat(nextPath);
		}, []);
	}
	
	/**
	 * Perform 2-OPT complete search
	 * 
	 * @param {number[]} route
	 * @param {number[][]} distances
	 */
	function twoOptComplete(route, distances) {
		var noImprovement = true;
		var numberOfNodes = distances.length;
		do {
			for (var i = 1; i < numberOfNodes; ++i) {
				for (var j = i + 1; j < numberOfNodes; ++j) {
					if (distances[i - 1][i] + distances[j - 1][j] < distances[i - 1][j] + distances[j - 1][i]) {
						route = twoOptSwap(route, start, end);
						noImprovement = false;
					}
				}
			}
		} while (noImprovement);
	
		return route;
	}
	
	/**
	 * Return distance between two point
	 * 
	 * @param {{x: number, y: number}} from
	 * @param {{x: number, y: number}} to
	 */
	function distance(from, to) {
		return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
	}
	
	/**
	 * Give the total length of the route from matrix of distances
	 * 
	 * @param {number[]} route
	 * @param {number[][]} distances
	 */
	function lengthOfRoute(route, distances) {
		var len = route.length;
	
		var distance = 0;
		for (var i = 0; i < len - 1; ++i) {
			var cur = route[i],
			    next = route[i + 1];
	
			distance += distances[cur][next];
		}
	
		return distance;
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Colony = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ant = __webpack_require__(5);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Colony = exports.Colony = function () {
		/**
	  * @param {number[][]} distances
	  */
		function Colony(distances, _ref) {
			var _ref$numberOfAnts = _ref.numberOfAnts,
			    numberOfAnts = _ref$numberOfAnts === undefined ? 20 : _ref$numberOfAnts,
			    _ref$rho = _ref.rho,
			    rho = _ref$rho === undefined ? 1 : _ref$rho,
			    _ref$alpha = _ref.alpha,
			    alpha = _ref$alpha === undefined ? 1 : _ref$alpha,
			    _ref$beta = _ref.beta,
			    beta = _ref$beta === undefined ? 1 : _ref$beta,
			    _ref$Q = _ref.Q,
			    Q = _ref$Q === undefined ? 1 : _ref$Q;
	
			_classCallCheck(this, Colony);
	
			this.distances = distances;
			this.pheromones = [];
	
			this.initializePheromones();
	
			this.rho = rho;
			this.alpha = alpha;
			this.beta = beta;
			this.Q = Q;
	
			this.ants = [];
			this.numberOfAnts = 0;
	
			this.setPopulation(numberOfAnts);
	
			this.shortestRouteLength = Number.MAX_VALUE;
		}
	
		_createClass(Colony, [{
			key: 'initializePheromones',
			value: function initializePheromones() {
				var _this = this;
	
				this.pheromones = this.distances.map(function (v, i) {
					return v.map(function (n, j) {
						return _this.distances[i][j];
					});
				});
			}
	
			/**
	   * Determine the number of ants in the Colony
	   * 
	   * @param {number} numberOfAnts
	   */
	
		}, {
			key: 'setPopulation',
			value: function setPopulation(numberOfAnts) {
				var _this2 = this;
	
				var newAnt = function newAnt() {
					return new _ant.Ant({ alpha: _this2.alpha, beta: _this2.beta, Q: _this2.Q });
				};
				this.ants = Array.from({ length: numberOfAnts }, newAnt);
				this.numberOfAnts = numberOfAnts;
			}
		}, {
			key: 'iterate',
			value: function iterate() {
				this.exploreRoutes();
				this.indentifyBestPath();
				this.updatePheromones();
			}
	
			/**
	   * Send out ants to explorer routes
	   */
	
		}, {
			key: 'exploreRoutes',
			value: function exploreRoutes() {
				var _this3 = this;
	
				this.ants.forEach(function (ant) {
					ant.findRoute(_this3.distances, _this3.pheromones);
				});
			}
	
			/**
	   * Deamon actions
	   */
	
		}, {
			key: 'indentifyBestPath',
			value: function indentifyBestPath() {
				var _this4 = this;
	
				this.ants.forEach(function (ant) {
					if (_this4.shortestRouteLength > ant.routeLength) {
						_this4.shortestRouteLength = ant.routeLength;
						_this4.notify(ant.route, ant.routeLength);
					}
				});
			}
	
			/**
	   * Reinforce better routes
	   */
	
		}, {
			key: 'updatePheromones',
			value: function updatePheromones() {
				var _this5 = this;
	
				this.evaporatePheromones();
				this.ants.forEach(function (ant) {
					ant.layPheromones(_this5.distances, _this5.pheromones);
				});
			}
		}, {
			key: 'evaporatePheromones',
			value: function evaporatePheromones() {
				var _this6 = this;
	
				this.pheromones = this.pheromones.map(function (v) {
					return v.map(function (value) {
						return (1 - _this6.rho) * value;
					});
				});
			}
	
			/**
	   * Notify better route
	   */
	
		}, {
			key: 'notify',
			value: function notify() {}
		}, {
			key: 'setNotify',
			value: function setNotify(notify) {
				this.notify = notify;
			}
		}]);

		return Colony;
	}();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TSP = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _route = __webpack_require__(7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Travel Saleman Problem
	 */
	var TSP = exports.TSP = function () {
		/**
	  * @param {number} [numberOfNodes]
	  */
		function TSP() {
			var numberOfNodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
	
			_classCallCheck(this, TSP);
	
			/** @readonly */
			this.numberOfNodes;
	
			this.width = 20;
			this.height = 20;
	
			/** @readonly */
			this.nodes = [];
			/** @readonly */
			this.distances = [[]];
	
			this.generateRandomNodes(numberOfNodes);
		}
	
		/**
	  * Generate random nodes from given number
	  * 
	  * @param {number} numberOfNodes
	  */
	
	
		_createClass(TSP, [{
			key: 'generateRandomNodes',
			value: function generateRandomNodes(numberOfNodes) {
				var _this = this;
	
				var randomNode = function randomNode() {
					return { x: Math.random() * _this.width, y: Math.random() * _this.height };
				};
	
				this.nodes = Array.from({ length: numberOfNodes }, randomNode);
				this.numberOfNodes = numberOfNodes;
				this.distances = Array.from({ length: numberOfNodes }, function (vi, i) {
					return Array.from({ length: numberOfNodes }, function (vj, j) {
						return (0, _route.distance)(_this.nodes[i], _this.nodes[j]);
					});
				});
			}
		}]);

		return TSP;
	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ }
]);
//# sourceMappingURL=app.js.map