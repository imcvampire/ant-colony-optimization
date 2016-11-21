let exec = require('child_process').exec,
	open = require('opn')

function executeCommand(command) {
	exec(command, (err, stdin, stdout) => {
		if (err) {
			console.log(err);
		}
	});
}

if (process.argv.find(arg => arg.toLowerCase() == '--server')) {
	executeCommand("node ./express.js");
	open("http://localhost:5000");
} else {
	open("./dist/index.html");
}
