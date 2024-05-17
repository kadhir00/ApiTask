const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/tasks').catch(error => console.error(error));;
mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
  });


const Schema = mongoose.Schema

const listSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    city:{
        type:String
    }


})

const List = mongoose.model("list",listSchema)
//creation api
app.post("/usercreation", async(req,res, next)=>{
 
    try {
      const newUser = {}
      newUser.name = req.body.name
      newUser.email = req.body.email
      newUser.phone = req.body.phone
      newUser.city = req.body.city
      const newUserD = new List(newUser)
    await newUserD.save()
      res.send({newUserD, message:"new user added successfully"})
    } catch (error) {
      console.log(error)
    }
   
   })
   //get api
   app.get("/userlist", async(req,res,next)=>{
    //parseint converts string to number
    console.log(typeof(parseInt(req.query.limit))) 
     try {
         const userList = await List.find()
         const docNumber= await List.countDocuments()
         res.send({userList,docNumber})
     } catch (error) {
         console.log(error)
     }
   })
   //get api by id
   app.get("/userlist/:id", async(req,res,next)=>{
    try {
      const userList = await List.findById(req.params.id)
      res.send({userList})
      } catch (error) {
        console.log(error)
        }
        })
   //update api
   app.put("/List/:id", async(req,res,next)=>{
    try {
      await List.findOneAndUpdate({_id:req.params.id},{...req.body})
      let user = await List.findOne({_id:req.params.id})
        res.send({user, message:"your details successfully udpated"})
      } catch (error) {
      console.log(error)
      }
})

//delete api
app.delete("/List/:id", async(req,res,next)=>{
  try {
    await List.findByIdAndDelete({_id:req.params.id})
    res.send({message:"Your record deleted successfully"})  
  } catch (error) {
      console.log(error)
  }
})
    





















app.listen(8000,()=>{
    console.log("Server is up")
})
