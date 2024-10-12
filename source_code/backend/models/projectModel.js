const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["NotStarted", "InProgress", "Completed"],
    default: "NotStarted"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps: true
})

const projectModel = mongoose.model("Project", projectSchema);

module.exports = projectModel;

