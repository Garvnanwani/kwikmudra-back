const Data = require("../models/FormData")
const asyncHandler = require("../middlewares/asyncHandler")

exports.formSend = asyncHandler(async (req, res, next) => {
  const { fullName, phoneNo, email, productName } = req.body

  const user = await Data.create({
    fullName,
    email,
    phoneNo,
    productName,
  })

  res.status(200).json({ success: true })
})
