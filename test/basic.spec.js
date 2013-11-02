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
		function x(){
			return 'hello" I am a string\'s for sure';
		}
		expect(result, result).to.equal(x.toString());
	});
});

describe("singlequote", function(){
	var result;
	before(function(){
		function x(){
			return "hello\" I am a string's for sure";
		}
		result = singleQuote(x.toString().replace(/\r/g, ''));
	});

	it("should return code with single quotes string", function(){
		function x(){
			return 'hello" I am a string\'s for sure';
		}
		expect(result, result).to.equal(x.toString().replace(/\r/g, ''));
	});
});

describe("singlequote already single quoted string", function(){
	var result;
	before(function(){
		function x(){
			return 'when customer payment term is "dueDate"';
		}
		result = singleQuote(x.toString());
	});

	it("should return code with single quotes string", function(){
		function x(){
			return 'when customer payment term is "dueDate"';
		}
		expect(result, result).to.equal(x.toString());
	});
});