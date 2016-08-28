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

singlequote will throw an exception if the JavaScript code can not be parsed.

singlequote will throw an error if there is a bug in singlequote, that would produce invalid JavaScript code.

running singlequote on an entire directory of .js files
-------------------------------------------------------
Use the command line tool [jsq](https://github.com/Muscula/jsq)

License
-------
MIT