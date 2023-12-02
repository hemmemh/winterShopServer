const mongoose = require('mongoose');
const { Schema } = mongoose;

const BasketItem= new Schema({
  count:{type:Number,default:1},
  size:{type:String},
  color:{type:String},
  product:{
    type:Schema.Types.ObjectId,
    ref:"Product"
  },
  basket:{
    type:Schema.Types.ObjectId,
    ref:"Basket"
  },
 
});

module.exports = mongoose.model('BasketItem', BasketItem);