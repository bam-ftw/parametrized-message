const Message = require('../message');
const expect  = require('chai').expect;

describe('Defaults', () => {
	it('defaults should be of Int32LE type', () => {
		expect(Message.Defaults.messageSizeType).to.equal(Message.Types.Int32LE);
		expect(Message.Defaults.messageIdType).to.equal(Message.Types.Int32LE);
		expect(Message.Defaults.parameterSizeType).to.equal(Message.Types.Int32LE);
		expect(Message.Defaults.parameterIdType).to.equal(Message.Types.Int32LE);
	});

	it('should correctly update and reset defaults', () => {
		Message.Defaults.update({
			messageSizeType   : Message.Types.UInt8,
			messageIdType     : Message.Types.Int16LE,
			parameterSizeType : Message.Types.UInt16BE,
			parameterIdType   : Message.Types.Int64LE,
		});

		expect(Message.Defaults.messageSizeType).to.equal(Message.Types.UInt8);
		expect(Message.Defaults.messageIdType).to.equal(Message.Types.Int16LE);
		expect(Message.Defaults.parameterSizeType).to.equal(Message.Types.UInt16BE);
		expect(Message.Defaults.parameterIdType).to.equal(Message.Types.Int64LE);

		Message.Defaults.reset();

		expect(Message.Defaults.messageSizeType).to.equal(Message.Types.Int32LE);
		expect(Message.Defaults.messageIdType).to.equal(Message.Types.Int32LE);
		expect(Message.Defaults.parameterSizeType).to.equal(Message.Types.Int32LE);
		expect(Message.Defaults.parameterIdType).to.equal(Message.Types.Int32LE);
	});
});
