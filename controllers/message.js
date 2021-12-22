const { response } = require('express');
const Message = require('../services/Message');

const getChat = async (req, res = response) => {
  const myId = req.uid;
  const { from } = req.params;

  const last30 = await Message.find({
    $or: [
      { from: myId, to: from },
      { from, to: myId },
    ],
  }).sort({ createdAt: 'asc' }).limit(30);

  return res.json({
    ok: true, messages: last30,
  });
};

module.exports = { getChat };
