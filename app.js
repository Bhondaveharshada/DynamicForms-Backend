const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const formRoute= require("./api/form/form.route")
const patientRoutes = require("./api/patient/route")
const timepointRoutes = require("./api/timepoint/route")
const relationRoutes = require("./api/relation/route")
require('dotenv').config()
const cors = require('cors')
const app = express();
const morgan = require("morgan")

//connectMongoDb("mongodb+srv://harshadabhondave:<db_password>@form-cluster.s6j9y.mongodb.net/?retryWrites=true&w=majority&appName=Form-cluster")
mongoose.connect(`mongodb+srv://harshadabhondave:${process.env.MONGO_PASS}@form-cluster.s6j9y.mongodb.net/forms?retryWrites=true&w=majority&appName=Form-cluster`)
.then(()=>{console.log("Mongodb Connected",`${mongoose.connection.host}`)})
.catch((err)=>{console.log("Mongo error",err);})

app.use(morgan('dav'))

app.use(bodyParser.json({ limit: '100mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-type, Accept, Authorization'
 );
 if(req.method ==='OPTIONS'){
  res.header('Access-Control-Allow-Methods','GET, POST, PATCH,PUT, DELETE');
  res.status(200).json({});
 }
 next()
})

/* app.use("/health",(req,res)=>{
    console.log("backend succesful");
    
    
}) */

app.use('/',formRoute);
app.use('/patient', patientRoutes);
app.use('/timepoint',timepointRoutes);
app.use('/relation',relationRoutes)

module.exports = app