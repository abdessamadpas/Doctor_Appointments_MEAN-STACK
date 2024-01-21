const databaseConfig = {
  url: process.env.MONGODB_URI || "mongodb://localhost:27017/",
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

module.exports = databaseConfig;
