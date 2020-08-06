require("dotenv").config();

module.exports = {
  url: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ofilms-demo-f9iwz.mongodb.net/${process.env.DB}`,
};
