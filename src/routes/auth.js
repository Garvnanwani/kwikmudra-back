const express = require("express")
const router = express.Router()
const {
  login,
  signup,
  userprofile,
  resetPassword,
  newPassword,
} = require("../controllers/auth")

const protect = require("../middlewares/auth")

router.post("/signup", signup)
router.post("/login", login)
router.get("/userprofile", protect, userprofile)
router.post("/reset-password", resetPassword)
router.post("/new-password", newPassword)

module.exports = router
