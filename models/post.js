const {Schema, model}=require('mongoose'); 

const PostSchema = Schema({ 
    description:{
        type: String,
    },
    estado:{
        type:Boolean,
        default:true,
        required: true
    },
    user: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

});

module.exports = model ('Post', PostSchema)