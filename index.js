let exec = require('child_process').exec,
	executeCommand = function(command) {
		exec(command, (err, stdin, stdout) => {
			if (err) {
				console.log(err);
			}
		});
	}

if (process.argv.reduce((pre, cur) => pre || cur.toLowerCase == '--server'), false) {

	if (process.env.OS.toUpperCase() == "WINDOWS_NT") {
		executeCommand('start http://localhost:5000 && node express.js');
	}
	else if (process.env.OS.toUpperCase() == "LINUX") {
		executeCommand('curl "http://localhost:5000" && node express.js');
	}
	else if (process.env.OS.toUpperCase() == "DARWIN") {
		executeCommand('open "http://localhost:5000" && node express.js')
	}
	else {
		excuteCommand("Command line interface does not support this command!");
	}
} else {
	if (process.env.OS.toUpperCase() == "WINDOWS_NT") {
		executeCommand('start .\\dist\\index.html');
	}
	else if (process.env.OS.toUpperCase() == "LINUX") {
		executeCommand('sensible-browser ./dist/index.html');
	}
	else if (process.env.OS.toUpperCase() == "DARWIN") {
		executeCommand('open ./dist/index.html')
	}
	else {
		excuteCommand("Command line interface does not support this command!");
	}
}