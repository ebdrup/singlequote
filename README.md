singlequote
--------------

Transform all double quote strings in a piece of JavaScript code to single quoted strings

```
npm install singlequote
```

usage
-----
```js
var singlequote = require("singlequote");

function x(){
	return "hello\" I am a string's for sure";
}

var singleQuoteStringsCode = singlequote(x.toString())

//singleQuoteStringsCode will contain the string:
function x(){
	return 'hello" I am a string\'s for sure';
}
```

running singlequote on an entire directory of .js files
-------------------------------------------------------
You need to have the module `findit` installed in your solution.

```js
var finder = require('findit')(process.argv[2] || '.');
var fs = require('fs');
var singleQuote = require('singlequote');

finder.on('file', function (file) {
	if (/\.js$/.test(file)) {
		var code = fs.readFileSync(file, "utf-8");
		var codeWithSingleQuotes;
		try {
			codeWithSingleQuotes = singleQuote(code);
		} catch (ex) {
			console.log("Error parsing %s", file, ex);
			return;
		}
		if (code !== codeWithSingleQuotes) {
			console.log("replacing double quoted strings with single quoted strings in %s", file);
			fs.writeFileSync(file, codeWithSingleQuotes, "utf-8");
		}
	}
});
```
