const rollup = require("rollup");
const babel = require("rollup-plugin-babel");

rollup.rollup({
  entry: "client/js/main.js",
  plugins: [babel()]
}).then(function (bundle) {
  bundle.write({
    dest: "client/js/bundle.js",
    format: "umd"
  });
});