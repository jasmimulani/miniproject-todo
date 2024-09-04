const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'users',
    },
    task:{
     type:String,
     unique:true,
    },
    isComplated: {
      type: Boolean,
      require: false,
    },
    isDelete:{
       type:Boolean,
       default:false
    }
  },
  {
    versionKey: false,
    timestamps: true,
  });

  module.exports = mongoose.model('Todo',TodoSchema)
