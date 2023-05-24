const {Schema, model}=require('mongoose'); 

//A Schema refers to the structure or blueprint of a database.
//It defines the organization, relationships, and constraints of the data stored in the database.

const CategoriaSchema = Schema({ 
    name:{
        type: String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required: true
    },
    usuario: {
        type:Schema.Types.ObjectId,
        ref:'User'
    }

});

module.exports = model ('Categoria', CategoriaSchema)//In the given code snippet, module.exports is used to export a model named 'Role' defined using a schema called RoleSchema.
