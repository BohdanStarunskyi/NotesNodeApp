const { MongoClient, ServerApiVersion } = require('mongodb');
const Constants = require('../constants/app_constants');

const client = new MongoClient(Constants.MONGO_KEY, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

module.exports = client;