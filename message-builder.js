'use strict';
const Defaults  = require('./defaults');
const Parameter = require('./parameter');
const Int64     = require('int64-buffer');

class MessageBuilder {
	/**
	 * All available types are defined in `Message.Types` object
	 *
	 * @param {Buffer} buffer
	 * @param {Object} args
	 * @param {String} args.messageSizeType -
	 * @param {String} args.messageIdType -
	 * @param {String} args.parameterSizeType -
	 * @param {String} args.parameterIdType -
	 */
	constructor(id, args) {
		if (typeof id !== 'number')
			throw new Error('id must be a number');

		args = args || {};

		this.id = id;

		this.messageSizeType = args.messageSizeType || Defaults.messageSizeType;
		this.messageIdType = args.messageIdType || Defaults.messageIdType;
		this.parameterSizeType = args.parameterSizeType || Defaults.parameterSizeType;
		this.parameterIdType = args.parameterIdType || Defaults.parameterIdType;

		this.parameters = [];
	}

	generateBytes() {
		const self = this;
		let fullSize = this.messageSizeType.size + this.messageIdType.size;

		this.parameters.forEach(param => {
			fullSize += self.parameterSizeType.size + self.parameterIdType.size + param.size;
		});

		const result = Buffer.alloc(fullSize);

		this.messageSizeType.write(result, fullSize, 0);
		this.messageIdType.write(result, this.id, this.messageSizeType.size);

		let currentIdx = this.messageSizeType.size + this.messageIdType.size;

		this.parameters.forEach(param => {
			this.parameterSizeType.write(result, param.size, currentIdx);
			this.parameterIdType.write(result, param.id, currentIdx + this.parameterSizeType.size);

			param.data.copy(result, currentIdx + this.parameterSizeType.size + this.parameterIdType.size);

			currentIdx += this.parameterSizeType.size + this.parameterIdType.size + param.size;
		});

		return result;
	}

	/**
	 *
	 * @param {Number} id     - id of the parameter
	 * @param {Buffer} buffer - buffer containing parameter data
	 */
	addParameter(id, buffer) {
		if (typeof buffer === 'string') {
			buffer = Buffer.from(buffer);
		}

		this.parameters.push(new Parameter(buffer.length, id, buffer));
	}

	addInt8(id, val) {
		const buffer = Buffer.alloc(1);
		buffer.writeInt8(val);
		this.addParameter(id, buffer);
	}

	addUInt8(id, val) {
		const buffer = Buffer.alloc(1);
		buffer.writeUInt8(val);
		this.addParameter(id, buffer);
	}

	addInt16LE(id, val) {
		const buffer = Buffer.alloc(2);
		buffer.writeInt16LE(val);
		this.addParameter(id, buffer);
	}

	addInt16BE(id, val) {
		const buffer = Buffer.alloc(2);
		buffer.writeInt16BE(val);
		this.addParameter(id, buffer);
	}

	addUInt16LE(id, val) {
		const buffer = Buffer.alloc(2);
		buffer.writeUInt16LE(val);
		this.addParameter(id, buffer);
	}

	addUInt16BE(id, val) {
		const buffer = Buffer.alloc(2);
		buffer.writeUInt16BE(val);
		this.addParameter(id, buffer);
	}

	addInt32LE(id, val) {
		const buffer = Buffer.alloc(4);
		buffer.writeInt32LE(val);
		this.addParameter(id, buffer);
	}

	addInt32BE(id, val) {
		const buffer = Buffer.alloc(4);
		buffer.writeInt32BE(val);
		this.addParameter(id, buffer);
	}

	addUInt32LE(id, val) {
		const buffer = Buffer.alloc(4);
		buffer.writeUInt32LE(val);
		this.addParameter(id, buffer);
	}

	addUInt32BE(id, val) {
		const buffer = Buffer.alloc(4);
		buffer.writeUInt32BE(val);
		this.addParameter(id, buffer);
	}

	addInt64LE(id, val) {
		const val64 = Int64.Int64LE(val);
		this.addParameter(id, val64.toBuffer());
	}

	addInt64BE(id, val) {
		const val64 = Int64.Int64BE(val);
		this.addParameter(id, val64.toBuffer());
	}

	addUInt64LE(id, val) {
		const val64 = Int64.Uint64LE(val);
		this.addParameter(id, val64.toBuffer());
	}

	addUInt64BE(id, val) {
		const val64 = Int64.Uint64BE(val);
		this.addParameter(id, val64.toBuffer());
	}

	addFloatLE(id, val) {
		const buffer = Buffer.alloc(4);
		buffer.writeFloatLE(val);
		this.addParameter(id, buffer);
	}

	addFloatBE(id, val) {
		const buffer = Buffer.alloc(4);
		buffer.writeFloatBE(val);
		this.addParameter(id, buffer);
	}

	addDoubleLE(id, val) {
		const buffer = Buffer.alloc(8);
		buffer.writeDoubleLE(val);
		this.addParameter(id, buffer);
	}

	addDoubleBE(id, val) {
		const buffer = Buffer.alloc(8);
		buffer.writeDoubleBE(val);
		this.addParameter(id, buffer);
	}
}

module.exports = MessageBuilder;
