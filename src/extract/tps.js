/**
 * Created by kiwi on 19/11/2016.
 */

/* ============= utils ====================*/
exports.get_best_tour = function (data) {
  var getDistance = function (start_point, end_point) {
    return Math.sqrt(Math.abs((start_point.x - end_point.x) * (start_point.x - end_point.x) - (start_point.y - end_point.y) * (start_point.y - end_point.y)));
  }
  var is_same_point = function (point_a, point_b) {
    return point_a.x === point_b.x && point_a.y === point_b.y;
  }
  var get_index_point_in_list = function (point, list_point) {
    for (var n_point = 0; n_point < list_point.length; n_point++) {
      if (is_same_point(point, list_point[n_point])) {
        return n_point;
      }
    }
    return 0;
  }
  var get_distance_tour = function (list_output_tour) {
    var sum = 0;
    for (var i = 0; i < list_output_tour.length - 1; i++) {
      sum = sum + getDistance(list_output_tour[i], list_output_tour[i + 1]);
    }
    return sum;
  }
  /* ============= main ====================*/
  var build_list_line = function (current_point, list_processing_point) {
    var list_line = [];
    for (var i = 0; i < list_processing_point.length; i++) {
      if (is_same_point(current_point, list_processing_point[i])) {
        continue;
      }
      var line = {
        start_point: current_point,
        end_point: list_processing_point[i],
        distance: getDistance(current_point, list_processing_point[i])
      };
      list_line.push(line)
    }
    return list_line;
  }

  var get_point_has_min_distance = function (current_point, list_processing_point) {
    var list_line = build_list_line(current_point, list_processing_point);
    var min_line = list_line[0];
    for (var i = 0; i < list_line.length; i++) {
      if (min_line.distance > list_line[i].distance) {
        min_line = list_line[i];
      }
    }
    return list_processing_point.splice(get_index_point_in_list(min_line.end_point, list_processing_point), 1)[0];
  }
  var getTour = function (list_processing_point, current_point, index_current_point) {
    var list_output_tour = [];
    var length_list_process = list_processing_point.length;
    list_output_tour.push(current_point);
    list_processing_point.splice(index_current_point, 1);
    while (list_output_tour.length != length_list_process) {
      current_point = get_point_has_min_distance(current_point, list_processing_point);
      list_output_tour.push(current_point);
    }
    return list_output_tour;
  }

  var run = function (data) {
    var list_processing_point = data;
    var list_processing_point_temp = [];
    list_processing_point.forEach(function (item) {
      list_processing_point_temp.push(item);
    });
    var current_point = list_processing_point_temp[0];
    var list_output_tour = getTour(list_processing_point_temp, current_point, 0);
    var distance_tour = get_distance_tour(list_output_tour);
    var current_resolve = {tour: list_output_tour, distance: distance_tour}
    for (var i = 1; i < list_processing_point.length; i++) {
      list_processing_point.forEach(function (item) {
        list_processing_point_temp.push(item);
      });
      current_point = list_processing_point[i];
      list_output_tour = getTour(list_processing_point_temp, current_point, i);
      distance_tour = get_distance_tour(list_output_tour);
      if (current_resolve.distance > distance_tour) {
        current_resolve = {tour: list_output_tour, distance: distance_tour}
      }
    }
    return current_resolve;
  }
  return run(data);
}
