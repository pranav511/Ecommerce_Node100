const mongoose = require("mongoose");

const empSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    managerId: { type: mongoose.Schema.Types.ObjectId, 
      ref: 'managers', 
      required: true
     }
  },
  {
    timestamps: true,
  }
);

const URL = mongoose.model("employee", empSchema);

module.exports = URL;
