const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const _=require('lodash');


const {mongoose} = require('./db/mongoose');
const { Todo } = require('./db/todo');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

app.post('/todos', (req, res) => {
  let newTodoData= _.pick(req.body,['title','body','completed','completedClass']);  
  let newTodo=new Todo(newTodoData);
  newTodo.save().then((result)=>{
    res.send(result)
  }).catch((err)=>{
    res.send(err);
  }) 
})

app.get('/todos', (req, res) => {
 Todo.find().then((result)=>{
   res.send(result);
 }).catch((err)=>{
   res.send(err)
 })
})

app.delete('/todos/:id',(req,res) => {
  Todo.findOneAndDelete({
    _id:req.params.id
  }).then((result)=>{
    console.log('deleted')
    res.send("Removed")
  }).catch((err)=>{
    console.log('not deleted',err)
    res.send("unable to delete")
  })
})

app.patch('/todos/:id',(req,res) => {
  // console.log(req.body)
  let updatedTodo=_.pick(req.body,['title','body','completed','completedClass'])
  console.log(req.params.id);
  Todo.findByIdAndUpdate(
    req.params.id,{
    $set:{
      title:updatedTodo.title,
      body:updatedTodo.body,
      completed:updatedTodo.completed,
      completedClass:updatedTodo.completedClass
    }
  },{new:true}).then((result)=>{
    res.send("Success"+result)
  }).catch((err)=>{
    res.send("errorP : "+err)
  })

})

app.listen(process.env.PORT)