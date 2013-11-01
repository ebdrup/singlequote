var jsHint = require("../node_modules/jshint/src/cli.js");
if (!jsHint.run({ args: ['.']})) {
	return setTimeout(function () {
		console.error("Exiting because of jsHint errors");
		process.exit(1);
	}, 1000);
}
//run Mocha
var realProcessExit = process.exit;
process.exit = function (code) {
	setTimeout(realProcessExit.bind(process, code), 2000);
};
require('../node_modules/mocha/bin/_mocha');
