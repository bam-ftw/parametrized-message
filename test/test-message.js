const Message = require('../message');
const expect  = require('chai').expect;

describe('Message', () => {
	it('should throw on invalid contructor arguments', () => {
		expect(() => new Message()).to.throw(Error);
		expect(() => new Message(1)).to.throw(Error);
		expect(() => new Message('test')).to.throw(Error);
		expect(() => new Message(null)).to.throw(Error);
		expect(() => new Message({})).to.throw(Error);
	});
});
