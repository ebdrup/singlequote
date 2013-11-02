var U2 = require("uglify-js");

module.exports = function singleQuote(code) {
	var hasReturn = code.indexOf('\r\n') !== -1;
	code = code.replace(/\r/g, '');
	var ast = U2.parse(code);
	// accumulate string-nodes in this array
	var stringNodes = [];
	ast.walk(new U2.TreeWalker(function (node) {
		if (node instanceof U2.AST_String) {
			stringNodes.push(node);
		}
	}));

	// now go through the nodes backwards and replace code
	for (var i = stringNodes.length; --i >= 0;) {
		var node = stringNodes[i];
		var replacement = code.substr(node.start.pos, node.end.endpos - node.start.pos);
		if (replacement.substr(0, 1) === '\'') {
			continue;
		}
		replacement = replacement.replace(/\\"/g, '"').replace(/'/g, '\\\'');
		replacement = '\'' + replacement.substr(1, replacement.length - 2) + '\'';
		code = splice_string(code, node.start.pos, node.end.endpos, replacement);
	}
	return hasReturn ? code.replace(/\n/g, '\r\n') : code;
};

function splice_string(str, begin, end, replacement) {
	return str.substr(0, begin) + replacement + str.substr(end);
}