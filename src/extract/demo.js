/**
 * Created by kiwi on 19/11/2016.
 */
var tps = require('./tps.js');
var data = require('./data.js');
var best_tour = tps.get_best_tour(data.data40);
console.log(best_tour);
