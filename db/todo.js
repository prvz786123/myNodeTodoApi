const {mongoose} = require('./mongoose');

let TodoSchema = mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim:true,
    unique:true
  },
  body:{
      type:String,
      trim:true,    
  },
  completed:{
    type:Boolean,   
  },
  completedClass:{
    type:String
  }
})

let Todo = mongoose.model('mytodolist',TodoSchema);

module.exports={
  Todo
}
