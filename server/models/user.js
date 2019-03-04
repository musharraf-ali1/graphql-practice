const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  dob: String,
  username: String,
  email: {
    type: String,
    unique: true
  },
  password: String
});

module.exports = mongoose.model("User", userSchema);
