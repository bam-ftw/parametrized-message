'using strict';
const Types = require('./types');

class Defaults {
	constructor () {
		this.messageSizeType   = Types.Int32LE;
		this.messageIdType     = Types.Int32LE;
		this.parameterSizeType = Types.Int32LE;
		this.parameterIdType   = Types.Int32LE;
	}

	update (args) {
		this.messageSizeType   = args.messageSizeType || Types.Int32LE;
		this.messageIdType     = args.messageIdType || Types.Int32LE;
		this.parameterSizeType = args.parameterSizeType || Types.Int32LE;
		this.parameterIdType   = args.parameterIdType || Types.Int32LE;
	}

	reset () {
		this.update({});
	}
}

module.exports = new Defaults();
