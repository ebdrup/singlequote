var U2 = require("uglify-js");

module.exports = function singleQuote(code) {
	var ast = U2.parse(code);
	// accumulate string-nodes in this array
	var stringNodes = [];
	ast.walk(new U2.TreeWalker(function(node){
		if (node instanceof U2.AST_String) {
			stringNodes.push(node);
		}
	}));
	// now go through the nodes backwards and replace code
	for (var i = stringNodes.length; --i >= 0;) {
		var node = stringNodes[i];
		var replacement = JSON.stringify(node.value).replace('\\\"', '"').replace(/'/g, '\\\'');
		replacement = '\'' + replacement.substr(1, replacement.length-2) + '\'';
		code = splice_string(code, node.start.pos + node.start.line-1, node.end.endpos + node.end.line-1, replacement);
	}
	return code;
};

function splice_string(str, begin, end, replacement) {
	return str.substr(0, begin) + replacement + str.substr(end);
}