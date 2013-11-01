var singleQuote = require('..');

describe("singlequote", function(){
	var result;
	before(function(){
		function x(){
			return "hello\" I am a string's for sure";
		}
		result = singleQuote(x.toString());
	});

	it("should return code with single quotes string", function(){
		function y(){
			return 'hello" I am a string\'s for sure';
		}
		expect(result).to.equal(y.toString());
	});
});