
module.exports = {
	Int8     : { size: 1, readMethod: 'readInt8',     writeMethod: 'writeInt8' },
	Int16LE  : { size: 2, readMethod: 'readInt16LE',  writeMethod: 'writeInt16LE' },
	Int16BE  : { size: 2, readMethod: 'readInt16BE',  writeMethod: 'writeInt16BE' },
	Int32LE  : { size: 4, readMethod: 'readInt32LE',  writeMethod: 'writeInt32LE' },
	Int32BE  : { size: 4, readMethod: 'readInt32BE',  writeMethod: 'writeInt32BE' },
	Int64LE  : { size: 8, readMethod: 'readInt64LE',  writeMethod: 'writeInt64LE' },
	Int64BE  : { size: 8, readMethod: 'readInt64BE',  writeMethod: 'writeInt64BE' },
	UInt8    : { size: 1, readMethod: 'readUInt8',    writeMethod: 'writeUInt8' },
	UInt16LE : { size: 2, readMethod: 'readUInt16LE', writeMethod: 'writeUInt16LE' },
	UInt16BE : { size: 2, readMethod: 'readUInt16BE', writeMethod: 'writeUInt16BE' },
	UInt32LE : { size: 4, readMethod: 'readUInt32LE', writeMethod: 'writeUInt32LE' },
	UInt32BE : { size: 4, readMethod: 'readUInt32BE', writeMethod: 'writeUInt32BE' },
	UInt64LE : { size: 8, readMethod: 'readUInt64LE', writeMethod: 'writeUInt64LE' },
	UInt64BE : { size: 8, readMethod: 'readUInt64BE', writeMethod: 'writeUInt64BE' },
};
