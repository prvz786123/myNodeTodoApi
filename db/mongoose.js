const mongoose = require('mongoose');

mongoose.connect('mongodb://prvz7861232:Testing123@ds245022.mlab.com:45022/mydatabse',{useNewUrlParser: true})

module.exports={
  mongoose
}