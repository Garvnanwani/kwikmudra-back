const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
const morgan = require("morgan")
require("dotenv").config()
const connectDB = require("./utils/db")
const mongoose = require("mongoose")
const Auth = require("./models/auth")

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

app.post('/',function(req,res){

  const data = {
    name: req.body.name,
    phone: req.body.phone,
    income: req.body.income,
    address: req.body.address,
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

app.post('/register',function(req,res){

  Auth.findOne({userName: req.body.userName }).then((auth) =>{
    if(auth){
      return res.status(400).json({email:"user already registered"})
    }else{
      const newAuth = new Auth({
        name: req.body.name,
        userName: req.body.userName,
        password: req.body.password,
        refCode: req.body.refCode,
      
      });
      newAuth.save()
      return res.status(200).json({msg:newAuth})
    }
  });
});




app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`)
})
