const express = require("express")
const router = express.Router()
const {
  login,
  signup,
  userprofile
} = require("../controllers/auth")

const protect = require("../middlewares/auth")

router.post("/signup", signup)
router.post("/login", login)
router.get("/userprofile", protect, userprofile)

module.exports = router;
