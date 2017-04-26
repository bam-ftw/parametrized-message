const Int64     = require('int64-buffer');

function generateReadMethod (methodName) {
	return (buffer, pos) => {
		return buffer[methodName](pos);
	}
}

function generateWriteMethod (methodName) {
	return (buffer, val, pos) => {
		return buffer[methodName](val, pos);
	}
}

function generateProperty(size, readMethod, writeMethod) {
	return {
		size: size,
		read: generateReadMethod(readMethod),
		write: generateWriteMethod(writeMethod),
	};
}

module.exports = {
	Int8     : generateProperty(1, 'readInt8',     'writeInt8'),
	Int16LE  : generateProperty(2, 'readInt16LE',  'writeInt16LE'),
	Int16BE  : generateProperty(2, 'readInt16BE',  'writeInt16BE'),
	Int32LE  : generateProperty(4, 'readInt32LE',  'writeInt32LE'),
	Int32BE  : generateProperty(4, 'readInt32BE',  'writeInt32BE'),
	Int64LE  : {
		size: 8,
		read: (buffer, pos) => Int64.Int64LE(buffer.slice(pos, pos + 8)).toNumber(),
		write: (buffer, val, pos) => Int64.Int64LE(val).copy(buffer, pos),
	},
	Int64BE  : {
		size: 8,
		read: (buffer, pos) => Int64.Int64BE(buffer.slice(pos, pos + 8)).toNumber(),
		write: (buffer, val, pos) => Int64.Int64BE(val).copy(buffer, pos),
	},
	UInt8    : generateProperty(1, 'readUInt8',    'writeUInt8'),
	UInt16LE : generateProperty(2, 'readUInt16LE', 'writeUInt16LE'),
	UInt16BE : generateProperty(2, 'readUInt16BE', 'writeUInt16BE'),
	UInt32LE : generateProperty(4, 'readUInt32LE', 'writeUInt32LE'),
	UInt32BE : generateProperty(4, 'readUInt32BE', 'writeUInt32BE'),
	UInt64LE : {
		size: 8,
		read: (buffer, pos) => Int64.Uint64LE(buffer.slice(pos, pos + 8)).toNumber(),
		write: (buffer, val, pos) => Int64.Uint64LE(val).copy(buffer, pos),
	},
	UInt64BE : {
		size: 8,
		read: (buffer, pos) => Int64.Uint64BE(buffer.slice(pos, pos + 8)).toNumber(),
		write: (buffer, val, pos) => Int64.Uint64BE(val).copy(buffer, pos),
	},
};
