const User = require("../models/User")
const asyncHandler = require("../middlewares/asyncHandler")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body

  // both fields should be filled
  if (!username || !password) {
    return next({
      message: "Please enter both username and password",
      statusCode: 400,
    })
  }

  // check if user already exists
  const user = await User.findOne({ username })

  if (!user) {
    return next({
      message: "User not found",
      statusCode: 400,
    })
  }

  // checking password
  const match = await user.checkPassword(password)

  if (!match) {
    return next({ message: "The password does not match", statusCode: 400 })
  }
  const token = user.getJwtToken()

  // send json web token as response
  res.status(200).json({ success: true, token })
})

exports.signup = asyncHandler(async (req, res, next) => {
  const { username, fullName, email, password, referralCode } = req.body

  const user = await User.create({
    username,
    fullName,
    email,
    password,
    referralCode,
  })

  const token = user.getJwtToken()

  res.status(200).json({ success: true, token })
})

exports.userprofile = asyncHandler(async (req, res, next) => {
  const { avatar, username, fullname, email, _id, referralCode, role, phoneNo } = req.user

  res.status(200).json({
    success: true,
    data: { avatar, username, fullname, email, _id, referralCode, role, phoneNo },
  })
})
