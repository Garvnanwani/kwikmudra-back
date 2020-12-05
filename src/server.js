const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
const morgan = require("morgan")
require("dotenv").config()
const connectDB = require("./utils/db")
const mongoose = require("mongoose")

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

// Schema

const Schema = mongoose.Schema;
const userSchema =new Schema({
  name:String,
  phone:Number,
  address: String,
  email: String
})

//model

const userData = mongoose.model('userData',userSchema);

app.get('/',function(req,res){

  const data = {
    name:'shubh om khuswaha',
    phone:'123456789',
    address:'varanasi 123 india 221002',
    email:'hariomkushwaha1947@gmail.com'
  };


  const newUserData = new userData(data);

  newUserData.save((error)=>{
    if(error){
      console.log('something went wrong!!');
    }else{
      console.log('Data has been saved')
    }
  })
  userData.find({})
  .then((data)=>{
    console.log('Data: ',data)
  })
  .catch((error)=>{
    console.log('error',error);
  })

  res.json(data);

})





app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
})
