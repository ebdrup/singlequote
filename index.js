var U2 = require('uglify-js');

module.exports = function singleQuote(codeIn) {
	var code = codeIn;
	var hasReturn = code.indexOf('\r\n') !== -1;
	var hasCommandLineInfo = code.substr(0, 2) === '#!';
	var commandlineInfo = '';
	var functionStart = '(function (){\n', functionEnd = "\n})();";
	var ast;
	code = code.replace(/\r/g, '');
	if (hasCommandLineInfo) {
		var endOfLine = (code.indexOf('\n') + 1);
		if (!endOfLine) {
			return codeIn;
		}
		commandlineInfo = code.substr(0, endOfLine);
		code = code.substr(endOfLine);
	}
	code = functionStart + code + functionEnd;
	try {
		ast = U2.parse(code);
	} catch (ex) {
		var parseError = new Error('Error parsing code');
		parseError.code = 'parse';
		parseError.inner = ex;
		throw parseError;
	}
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
	try {
		U2.parse(code); //do sanity-check so we don't mess up files
	} catch (ex) {
		var singleQuoteError = new Error('Error parsing code produced by singlequote');
		singleQuoteError.code = 'singlequote';
		singleQuoteError.inner = ex;
		throw singleQuoteError;
	}
	code = code.substr(functionStart.length, code.length - functionStart.length - functionEnd.length);
	code = commandlineInfo + code;
	code = hasReturn ? code.replace(/\n/g, '\r\n') : code;
	return code;
};

function splice_string(str, begin, end, replacement) {
	return str.substr(0, begin) + replacement + str.substr(end);
}