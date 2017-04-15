const Message = require('../message');
const expect  = require('chai').expect;

describe('MessageBuilder', () => {
	it('should throw on invalid contructor arguments', () => {
		expect(() => new Message.Builder()).to.throw(Error);
		expect(() => new Message.Builder('a')).to.throw(Error);
		expect(() => new Message.Builder('1')).to.throw(Error);
		expect(() => new Message.Builder({})).to.throw(Error);
		expect(() => new Message.Builder(null)).to.throw(Error);
	});

	it('should build empty message', () => {
		const builder = new Message.Builder(258, {
			messageSizeType   : Message.Types.UInt16LE,
			messageIdType     : Message.Types.UInt16LE,
		});
		const a = builder.generateBytes();
		const b = Buffer.from([ 0x04, 0x00, 0x02, 0x01 ]);
		expect(a.compare(b)).to.be.equal(0);
	});

	const params = [
		{ methodAdd: 'addInt8', methodRead: 'readInt8', id: 2, value: -128, expected: Buffer.from([ 0x01, 0x00, 0x02, 0x00, -128 ]) },
		{ methodAdd: 'addUInt8', methodRead: 'readUInt8', id: 2, value: 255, expected: Buffer.from([ 0x01, 0x00, 0x02, 0x00, 255 ]) },
		{ methodAdd: 'addInt16LE', methodRead: 'readInt16LE', id: 2, value: -32767, expected: Buffer.from([ 0x02, 0x00, 0x02, 0x00, 0x01, 0x80 ]) },
		{ methodAdd: 'addInt16BE', methodRead: 'readInt16BE', id: 2, value: 32767, expected: Buffer.from([ 0x02, 0x00, 0x02, 0x00, 0x7F, 0xFF ]) },
		{ methodAdd: 'addUInt16LE', methodRead: 'readUInt16LE', id: 2, value: 65534, expected: Buffer.from([ 0x02, 0x00, 0x02, 0x00, 0xFE, 0xFF ]) },
		{ methodAdd: 'addUInt16BE', methodRead: 'readUInt16BE', id: 2, value: 65534, expected: Buffer.from([ 0x02, 0x00, 0x02, 0x00, 0xFF, 0xFE ]) },
		{ methodAdd: 'addInt32LE', methodRead: 'readInt32LE', id: 2, value: 2147483646, expected: Buffer.from([ 0x04, 0x00, 0x02, 0x00, 0xFE, 0xFF, 0xFF, 0x7F ]) },
		{ methodAdd: 'addInt32BE', methodRead: 'readInt32BE', id: 2, value: 2147483646, expected: Buffer.from([ 0x04, 0x00, 0x02, 0x00, 0x7F, 0xFF, 0xFF, 0xFE ]) },
		{ methodAdd: 'addUInt32LE', methodRead: 'readUInt32LE', id: 2, value: 4294967294, expected: Buffer.from([ 0x04, 0x00, 0x02, 0x00, 0xFE, 0xFF, 0xFF, 0xFF ]) },
		{ methodAdd: 'addUInt32BE', methodRead: 'readUInt32BE', id: 2, value: 4294967294, expected: Buffer.from([ 0x04, 0x00, 0x02, 0x00, 0xFF, 0xFF, 0xFF, 0xFE ]) },
		{ methodAdd: 'addInt64LE', methodRead: 'readInt64LE', id: 2, value: 4294967296, expected: Buffer.from([ 0x08, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00 ]) },
		{ methodAdd: 'addInt64BE', methodRead: 'readInt64BE', id: 2, value: 4294967296, expected: Buffer.from([ 0x08, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]) },
		{ methodAdd: 'addUInt64LE', methodRead: 'readUInt64LE', id: 2, value: 4294967296, expected: Buffer.from([ 0x08, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00 ]) },
		{ methodAdd: 'addUInt64BE', methodRead: 'readUInt64BE', id: 2, value: 4294967296, expected: Buffer.from([ 0x08, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00 ]) },

		{ methodAdd: 'addFloatLE', methodRead: 'readFloatLE', id: 2, value: 123.456, expected: Buffer.from([ 0x04, 0x00, 0x02, 0x00, 0x79, 0xE9, 0xF6, 0x42 ]) },
		{ methodAdd: 'addFloatBE', methodRead: 'readFloatBE', id: 2, value: 123.456, expected: Buffer.from([ 0x04, 0x00, 0x02, 0x00, 0x42, 0xF6, 0xE9, 0x79 ]) },
		{ methodAdd: 'addDoubleLE', methodRead: 'readDoubleLE', id: 2, value: 1234.5678, expected: Buffer.from([ 0x08, 0x00, 0x02, 0x00, 0xAD, 0xFA, 0x5C, 0x6D, 0x45, 0x4A, 0x93, 0x40 ]) },
		{ methodAdd: 'addDoubleBE', methodRead: 'readDoubleBE', id: 2, value: 1234.5678, expected: Buffer.from([ 0x08, 0x00, 0x02, 0x00, 0x40, 0x93, 0x4A, 0x45, 0x6D, 0x5C, 0xFA, 0xAD ]) },
	];

	const properties = {
		messageSizeType   : Message.Types.UInt16LE,
		messageIdType     : Message.Types.UInt16LE,
		parameterSizeType : Message.Types.UInt16LE,
		parameterIdType   : Message.Types.UInt16LE,
	};

	for (var param of params) {
		let p = param;
		it('should build message with method: ' + p.methodAdd, () => {
			const builder = new Message.Builder(258, properties);
			builder[p.methodAdd](p.id, p.value);

			const a = builder.generateBytes();
			const b = Buffer.concat([ Buffer.from([ 0x04 + p.expected.length, 0x00, 0x02, 0x01 ]), p.expected ]);

			expect(a.compare(b)).to.be.equal(0);

			const message = new Message(a, properties);

			expect(message.getParameter(param.id)).to.not.equal(null);
			expect(message.getParameter(param.id)[p.methodRead]()).to.be.approximately(p.value, 0.0001);


		});
	}
});
