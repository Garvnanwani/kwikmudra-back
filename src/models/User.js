const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    phoneNo: {
      type: Number,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password should be atleast minimum of 6 characters"],
    },
    referralCode: {
      type: String,
    },
    role: {
      type: String,
      default: "User",
    },
    resetToken: {
      type: String,
    },
    expireToken: {
      type: Date,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/douy56nkf/image/upload/v1594060920/defaults/txxeacnh3vanuhsemfc8.png",
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

UserSchema.methods.checkPassword = async function (password) {
  return await (password === this.password)
}

module.exports = mongoose.model("User", UserSchema)
