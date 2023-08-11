const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
      name : {
            type : String,
            required : true,
      },
      category:{
            type : String,
            required : true,
      },
      price : {
            type : Number,
            required : true,
      },
      stock : {
            type : Number, 
            required : true,
      },
      createdAt: {
            type: Date,
            default: Date.now,
      },
      updatedBy : {
            type : String,
            required : true,
      },

});

const ProductCLTN = mongoose.Model('Products', productSchema);
module.exports = ProductCLTN;