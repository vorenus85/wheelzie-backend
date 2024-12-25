const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  country: { type: String },
  state: { type: String },
  zip: { type: String },
  additional: { type: String },
  residenceCard: { type: String },
  driveLicense: { type: String },
  points: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
