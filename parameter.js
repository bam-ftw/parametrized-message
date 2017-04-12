'use strict';
const Int64     = require('int64-buffer');

module.exports = class Parameter {
	/**
	 *
	 * @param {Number} size
	 * @param {Number} id
	 * @param {Buffer} data
	 */
	constructor (size, id, data) {
		this.size = size;
		this.id = id;
		this.data = data;
	}

	readInt8 (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readInt8(byteOffset);
	}

	readUInt8 (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readUInt8(byteOffset);
	}

	readInt16LE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readInt16LE(byteOffset);
	}

	readInt16BE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readInt16BE(byteOffset);
	}

	readUInt16LE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readUInt16LE(byteOffset);
	}

	readUInt16BE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readUInt16BE(byteOffset);
	}

	readInt32LE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readInt32LE(byteOffset);
	}

	readInt32BE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readInt32BE(byteOffset);
	}

	readUInt32LE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readUInt32LE(byteOffset);
	}

	readUInt32BE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readUInt32BE(byteOffset);
	}

	readInt64LE (byteOffset) {
		byteOffset = byteOffset || 0;
		return Int64.Int64LE(this.data.slice(byteOffset, byteOffset + 8)).toNumber();
	}

	readInt64BE (byteOffset) {
		byteOffset = byteOffset || 0;
		return Int64.Int64BE(this.data.slice(byteOffset, byteOffset + 8)).toNumber();
	}

	readUInt64LE (byteOffset) {
		byteOffset = byteOffset || 0;
		return Int64.Uint64LE(this.data.slice(byteOffset, byteOffset + 8)).toNumber();
	}

	readUInt64BE (byteOffset) {
		byteOffset = byteOffset || 0;
		return Int64.Uint64BE(this.data.slice(byteOffset, byteOffset + 8)).toNumber();
	}

	readFloatLE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readFloatLE(byteOffset);
	}

	readFloatBE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readFloatBE(byteOffset);
	}

	readDoubleLE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readDoubleLE(byteOffset);
	}

	readDoubleBE (byteOffset) {
		byteOffset = byteOffset || 0;
		return this.data.readDoubleBE(byteOffset);
	}
};

