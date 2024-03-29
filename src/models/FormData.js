const mongoose = require("mongoose")

const DataSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    productName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Data", DataSchema)
