const express = require("express")
const router = express.Router()
const { formSend } = require("../controllers/form")

router.post("/", formSend)

module.exports = router
