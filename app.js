const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const quizRoutes = require('./Routes/quizRoutes');

require("dotenv").config()
const {connection}=require("./config/db")
const app = express();

app.use(express.json());







// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/quizzes', limiter);

// MongoDB Connection


// Initialize routes
app.use('/quizzes', quizRoutes);


// Start cron job
//cronJob.start();

app.listen(process.env.port,async()=>{
  try{
      await connection
      console.log("connected to mongoose")
  }catch(err){
console.log(err)
  }
  console.log(`server running to ${process.env.port}`)
})
