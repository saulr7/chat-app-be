const { Schema, model } = require('mongoose');

const MessageSchema = Schema({

  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

}, { timestamps: true });

// eslint-disable-next-line func-names
MessageSchema.method('toJSON', function () {
  const {
    __v, _id, password, ...obj
  } = this.toObject();
  obj.uid = _id;
  return obj;
});

module.exports = model('Message', MessageSchema);
