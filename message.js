'using strict';
const Parameter = require('./parameter');
const Defaults  = require('./defaults');
const Int64     = require('int64-buffer');

class Message {
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
	constructor (buffer, args) {
		if (buffer instanceof Buffer === false) {
			throw new TypeError('buffer must be instance of Buffer class');
		}

		args = args || {};

		this.buffer = buffer;

		this.messageSizeType   = args.messageSizeType || Defaults.messageSizeType;
		this.messageIdType     = args.messageIdType || Defaults.messageIdType;
		this.parameterSizeType = args.parameterSizeType || Defaults.parameterSizeType;
		this.parameterIdType   = args.parameterIdType || Defaults.parameterIdType;

		this._parseData();
	}

	_parseData () {
		this.size = this.buffer[this.messageSizeType.readMethod](0);
		this.id = this.buffer[this.messageIdType.readMethod](this.messageIdType.size);

		if (this.size !== this.buffer.length)
			throw new Error('buffer size does not match its contents');

		let currentIndex = this.messageSizeType.size + this.messageIdType.size;

		this.parameters = [];

		const readParamSize     = this.buffer[this.parameterSizeType.readMethod].bind(this.buffer);
		const paramSizeTypeSize = this.parameterSizeType.size;
		const readParamId       = this.buffer[this.parameterIdType.readMethod].bind(this.buffer);
		const paramIdTypeSize   = this.parameterSizeType.size;

		while (currentIndex < this.buffer.length) {
			const sliceIdx = currentIndex + paramSizeTypeSize + paramIdTypeSize;

			const size = readParamSize(currentIndex);
			const id = readParamId(currentIndex + paramSizeTypeSize);
			const data = this.buffer.slice(sliceIdx, sliceIdx + size);

			const parameter = new Parameter(size, id, data);

			this.parameters.push(parameter);

			currentIndex += paramSizeTypeSize + paramIdTypeSize + size;
		}
	}

	/**
	 *
	 * @param {Number} id - (optional)
	 */
	getParameters (id) {
		if (typeof id === 'undefined') {
			return this.parameters;
		}

		const result = [];

		this.parameters.forEach(param => {
			if (param.id === id) {
				result.push(param);
			}
		});

		return result;
	}
};

Message.Types = require('./types');
Message.Parameter = require('./parameter');
Message.Builder = require('./message-builder');
Message.Defaults = require('./defaults');

module.exports = Message;
