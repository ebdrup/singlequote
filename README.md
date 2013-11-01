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
