const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/my-Home-db')
    .then(() => console.log('Connected to my-Home-db'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;