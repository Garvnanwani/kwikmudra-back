const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
const morgan = require("morgan")
require("dotenv").config()
const connectDB = require("./utils/db")

const app = express()
const PORT = process.env.PORT || 5000

app.use(morgan("dev"))
app.use(helmet())
app.use(helmet.hidePoweredBy())

app.use(express.json())
app.set("trust proxy", 1)

if (process.env.NODE_ENV === "production") {
  app.use(compression())
}

connectDB()

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
})
