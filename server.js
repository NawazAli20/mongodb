import db from "./db.js"; 
import Student from "./models/student.js"; 
import express from 'express'; 
import { ObjectId } from 'mongodb';

const app = express(); 
db(); //call db()
const port =8080; 

app.use(express.static("public")); 
app.use(express.urlencoded({extended:false})); 
app.use(express.json()); 

app.set("view engine","pug"); 
app.set("views", "views"); 

//select all students
app.get("/",async (req,res)=>{
    try{
    const result= await Student.find({});
        res.send(result);
    }catch(err){
        res.send(err)
    }
}); 

//insert a student
app.post("/insert",async (req,res)=>{
    try{
    const result= await Student.insertOne(req.body);
        res.send(result);
    }catch(err){
        res.send(err)
    }
}); 

//select a specific student by id
app.get("/student/:id",async (req,res)=>{
    const id = new ObjectId(req.params.id); 
    try{
    const result= await Student.find({_id:id});
        res.send(result);
    }catch(err){
        res.send(err)
    }
}); 

//delete a specific student by id
app.get("/delete/:id",async (req,res)=>{
    const id = new ObjectId(req.params.id); 
    try{
    const result= await Student.deleteOne({_id:id});
        res.send(result);
    }catch(err){
        res.send(err)
    }
});

//update a specific student by id
app.get("/update/:id/:name",async (req,res)=>{
    const {id,name} = req.params;
     
    try{
    const result= await Student.updateOne({_id:new ObjectId(id)},{$set:{name:name}});
        res.send(result);
    }catch(err){
        res.send(err)
    }
});

//update a specific student by id
app.post("/update",async (req,res)=>{
    const {id,name,dept_name, tot_credit} = req.body;
     
    try{
    const result= await Student.updateOne({_id:new ObjectId(id)},{$set:{name, dept_name, tot_credit}});
        res.send(result);
    }catch(err){
        res.send(err)
    }
});




//run the server
app.listen(port,(err)=>{
    if(err) console.log(err); 
    console.log("Server is running at port numnber: "+port);
})