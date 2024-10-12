const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  toJSON: true,
  toObject: true
})

userSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "user"
})

const userModel = mongoose.model("User", userSchema);

module.exports = userModel