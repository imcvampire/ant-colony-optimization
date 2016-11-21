let os = require('os'),
	exec = require('child_process').exec;

const opn = require('opn')

function executeCommand(command) {
	exec(command, (err, stdin, stdout) => {
		if (err) {
			console.log(err);
		}
	});
}

if (process.argv.find(arg => arg.toLowerCase() == '--server')) {
	switch (os.type().toUpperCase()) {
		case "WINDOWS_NT": {
			executeCommand('node express.js');
			break;
		}

		case "LINUX": {
			executeCommand('node express.js');
			break;
		}

		case "DARWIN": {
			executeCommand('node express.js');
			break;
		}

		default: {
			console.log("Command line interface does not support this command!");
			break;
		}
	}
} else {
	switch (os.type().toUpperCase()) {
		case "WINDOWS_NT": {
			executeCommand('start .\\dist\\index.html');
			break;
		}

		case "LINUX": {
			executeCommand('sensible-browser ./dist/index.html');
			break;
		}

		case "DARWIN": {
			executeCommand('open ./dist/index.html');
			break;
		}

		default: {
			console.log("Command line interface does not support this command!");
			break;
		}
	}
}

opn('http://localhost:5000')
