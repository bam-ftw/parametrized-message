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

	it('should handle 64 bit integers', () => {
		const message = new Message(Buffer.from([
			0, 0, 0, 0, 0, 0, 0, 32 + 8, // size
			0, 0, 0, 0, 0, 0, 0, 1, // id
			0, 0, 0, 0, 0, 0, 0, 8, // parameter-data-size
			0, 0, 0, 0, 0, 0, 0, 1, // parameter-id
			0, 0, 0, 255, 255, 255, 255, 255, // parameter-data
		]), {
				messageSizeType   : Message.Types.Int64BE,
				messageIdType     : Message.Types.Int64BE,
				parameterSizeType : Message.Types.Int64BE,
				parameterIdType   : Message.Types.Int64BE,
		});

		expect(message.getParameter(1).readUInt64BE()).to.equal(0xFFFFFFFFFF);
	})
});
