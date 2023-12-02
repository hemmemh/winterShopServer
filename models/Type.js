const mongoose = require('mongoose');
const { Schema } = mongoose;

const Type = new Schema({
  name:{type:String,unique:true,required:true},
  image:{type:String},
  products:[{
    type:Schema.Types.ObjectId,
    ref:"Product"
  }],
});

module.exports = mongoose.model('Type', Type);