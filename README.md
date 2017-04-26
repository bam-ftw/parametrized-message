# parametrized-message

Parametrized messages are binary structures that provide unified way of handling
known and unknown data at the cost of adding prefixes to each `message` and
`parameter`.

# Structure of messages

Message is a structure for storing `parameter`s.

|name|description|
|-|-|
|message-size |number of bytes message consists of (including this field)|
|message-id   |if of the message|
|parameters   |array of parameters|

# Structure of parameters

|name|description|
|-|-|
|data-size    |number of bytes in `data` filed|
|parameter-id |id of the parameter|
|data         |data bytes|



# Documentation

Work in progress...

## Message

This class...

### Methods

* constructor(buffer, args)
* getParameter(id)
* getParameters(id)

### Example

```js
const Message = require('parametrized-message');
```

## Message.Parameter

This class...

### Methods
### Example

```js
const Message = require('parametrized-message');
```

## Message.Builder

This class...

### Methods

* constructor(id, args)
* generateBytes()
* addParameter(id, buffer)
* addInt8(id, val)
* addUInt8(id, val)
* addInt16LE(id, val)
* addInt16BE(id, val)
* addUInt16LE(id, val)
* addUInt16BE(id, val)
* addInt32LE(id, val)
* addInt32BE(id, val)
* addUInt32LE(id, val)
* addUInt32BE(id, val)
* addInt64LE(id, val)
* addInt64BE(id, val)
* addUInt64LE(id, val)
* addUInt64BE(id, val)
* addFloatLE(id, val)
* addFloatBE(id, val)
* addDoubleLE(id, val)
* addDoubleBE(id, val)

### Example

```js
const Message = require('parametrized-message');
```

## Message.Defaults

This object is used to determine structure of messages and parameters, that is:
* type of message size field,
* type of message id field,
* type of parameter data size field,
* type of parameter id field.

All are by default set to `Message.Types.Int32LE`.

When no object describing structure is passed to constructors of `Message`,
`Message.Parameter` and `Message.Builder` classes, values from
`Message.Defaults` are used.

Available types are defined in `Message.Types` object.

### Methods

* update(defaults)

* reset()

### Example

```js
const Message = require('parametrized-message');

const defaults = {
  messageSizeType   : Message.Types.Int8,
  messageIdType     : Message.Types.Int16LE,
  parameterSizeType : Message.Types.Int32LE,
  parameterIdType   : Message.Types.Int64LE,
};

Message.Defaults.update(defaults);

const messageId = 1;

const builder1 = new Message.Builder(messageId);
const builder2 = new Message.Builder(messageId, defaults);
```

## Message.Types

This object stores objects containing properties describing size of the type and
how to read and write values to the buffer object.

### Members

* Message.Types.Int8
* Message.Types.Int16LE
* Message.Types.Int16BE
* Message.Types.Int32LE
* Message.Types.Int32BE
* Message.Types.Int64LE
* Message.Types.Int64BE
* Message.Types.UInt8
* Message.Types.UInt16LE
* Message.Types.UInt16BE
* Message.Types.UInt32LE
* Message.Types.UInt32BE
* Message.Types.UInt64LE
* Message.Types.UInt64BE

### Custom types

To define custom type, an object with following structure must be created:

```js
const MyType = {
	size: 12,
	read: (buffer, pos) => { return 0; }
	write: (buffer, val, pos) => {}
}
```

* `size` - number of bytes type takes
* `read` - method accepting an Buffer object (`buffer`) and buffer offset
(`pos`), it needs to read data from the buffer and return numeric value
* `write` - method accepting an Buffer object (`buffer`), numeric value (`val`)
and buffer offset (`pos`), it needs to write given value to the buffer at
given offset


# Example message

By default types all of the following fileds: `message-size`, `message-id`,
`data-size`, `parameter-id` are `int32_t`. This can be changed using `defaults`
or by passing desired properties to constructors of objects.

Example structure of `message` with `id` = 1 containing 2 parameters:
`{ id: 1, data: 1.234f }` and `{ id: 2, data: 4000000000u }`:

|byte #|type|name|value|
|-|-|-|-|
|0|int32_t|message-size|32|
|4|int32_t|message-id|1|
|8|int32_t|data-size|4|
|12|int32_t|parameter-id|1|
|16|float|data|1.234f|
|20|int32_t|data-size|4|
|24|int32_t|parameter-id|2|
|28|uint32_t|data|4000000000|

# Example code

```js
const Message = require('parametrized-message');

// update default properties so they would not need to be passed as argument
// to every instance of Message, Parameter or MessageBuilder object
Message.Defaults.update({
  messageSizeType   : Message.Types.Int32LE,
  messageIdType     : Message.Types.Int32LE,
  parameterSizeType : Message.Types.Int32LE,
  parameterIdType   : Message.Types.Int32LE,
});

// use MessageBuilder to generate message bytes
const builder = new Message.Builder(1); // message-id = 1
builder.addInt32LE(0, 123); // parameter-id = 0, data = 123
builder.addInt32LE(0, 456);
builder.addInt32LE(1, 1);
builder.addInt32LE(2, 2);
const messageBytes = builder.generateBytes();

// extract the parameters from message bytes
const message = new Message(messageBytes);

// get all parameters
console.log('all:');
for (var param of message.getParameters()) {
  console.log(param.id + ' = ' + param.readInt32LE());
}

// get only parameters with id 0
console.log('zeroes:');
for (var param of message.getParameters(0)) {
  console.log(param.id + ' = ' + param.readInt32LE());
}
```

# Tests

```sh
npm test
```
