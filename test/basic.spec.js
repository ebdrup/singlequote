var singleQuote = require('..');

describe('singlequote with \\r', function () {
	var result;
	before(function () {
		function x() {
			return 'hello" I am a string\'s for sure';
		}
		result = singleQuote(x.toString().replace(/\r/g, '').replace(/\n/g, '\r\n')); //make sure we have \r on both mac an win
	});

	it('should return code with single quotes string', function () {
		function x() {
			return 'hello" I am a string\'s for sure';
		}
		expect(result, result).to.equal(x.toString().replace(/\r/g, '').replace(/\n/g, '\r\n'));
	});
});

describe('singlequote without \\r', function () {
	var result;
	before(function () {
		function x() {
			return 'hello" I am a string\'s for sure';
		}
		result = singleQuote(x.toString().replace(/\r/g, ''));
	});

	it('should return code with single quotes string', function () {
		function x() {
			return 'hello" I am a string\'s for sure';
		}
		expect(result, result).to.equal(x.toString().replace(/\r/g, ''));
	});
});

describe('singlequote already single quoted string', function () {
	var result;
	before(function () {
		function x() {
			return 'when customer payment term is "dueDate"';
		}
		result = singleQuote(x.toString());
	});

	it('should return code with single quotes string', function () {
		function x() {
			return 'when customer payment term is "dueDate"';
		}
		expect(result, result).to.equal(x.toString());
	});
});

describe('singlequote with tab in string', function () {
	var code, result;
	before(function () {
		code = 'var x="\t"';
		result = singleQuote(code);
	});

	it('should return code with tab in string', function () {
		expect(result, result).to.equal('var x=\'\t\'');
	});
});

describe('singlequote with \\t in string', function () {
	var code, result;
	before(function () {
		code = 'var x="\\t"';
		result = singleQuote(code);
	});

	it('should return code with \\t in string', function () {
		expect(result, result).to.equal('var x=\'\\t\'');
	});
});

describe('singlequote with #!/usr/bin/env node', function () {
	var result;
	before(function () {
		function x() {
			return 'hello" I am a string\'s for sure';
		}
		result = singleQuote('#!/usr/bin/env node\n' + x.toString().replace(/\r/g, ''));
	});

	it('should return code with single quotes string', function () {
		function x() {
			return 'hello" I am a string\'s for sure';
		}
		expect(result, result).to.equal('#!/usr/bin/env node\n' + x.toString().replace(/\r/g, ''));
	});
});

describe('singlequote code with return-statment in main cod (allowed in node.js)', function () {
	var code, result;
	before(function () {
		code = 'var x=3;\nreturn;';
		result = singleQuote(code);
	});

	it('should return code with \\t in string', function () {
		expect(result, result).to.equal(code);
	});
});