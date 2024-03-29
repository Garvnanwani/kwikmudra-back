const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
require("dotenv").config()
const connectDB = require("./utils/db")
const authRouter = require("./routes/auth")
const formRouter = require("./routes/form")
const errorHandler = require("./middlewares/errorHandler")
const app = express()
const PORT = process.env.PORT || 5000

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan")
  app.use(morgan("dev"))
}
app.use(helmet())
app.use(helmet.hidePoweredBy())
app.use(cors())

app.use(express.json())
app.set("trust proxy", 1)

if (process.env.NODE_ENV === "production") {
  app.use(compression())
}

connectDB()

app.use("/api/auth", authRouter)
app.use("/api/form", formRouter)

app.get("/", (req, res) => {
  res.send("This is the api of kwikmudra")
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
})
