const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product= new Schema({
  name:{type:String,unique:true},
  date:{type:String},
  images:{type:String},
  description:{type:String},
  purchaseNumber:{type:Number,default:0},
  price:{type:Number},
  colors:{type:String},
  sizes:{type:String},
  brand:{
    type:Schema.Types.ObjectId,
    ref:"Brand"
  },

  type:{
    type:Schema.Types.ObjectId,
    ref:"Type"
  },
  ratings:[{
    type:Schema.Types.ObjectId,
    ref:"Rating"
  }],


});

module.exports = mongoose.model('Product', Product);