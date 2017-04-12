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
