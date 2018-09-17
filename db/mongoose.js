const mongoose = require('mongoose');

mongoose.connect('mongodb://<username>:<password>@ds245022.mlab.com:45022/mydatabse',{useNewUrlParser: true})

module.exports={
  mongoose
}