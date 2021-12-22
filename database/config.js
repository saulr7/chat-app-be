const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // eslint-disable-next-line no-console
    console.log('connected');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error("Couldn't connect to DB");
  }
};

module.exports = { dbConnection };
