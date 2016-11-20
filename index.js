let os = require('os'),
	exec = require('child_process').exec;

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
			executeCommand('start http://localhost:5000 && node express.js');
			break;
		}

		case "LINUX": {
			executeCommand('curl "http://localhost:5000" && node express.js');
			break;
		}

		case "DARWIN": {
			executeCommand('open "http://localhost:5000" && node express.js');
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