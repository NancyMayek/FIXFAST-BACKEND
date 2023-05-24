
const {Schema, model}=require('mongoose'); 

//A Schema refers to the structure or blueprint of a database.
//It defines the organization, relationships, and constraints of the data stored in the database.

const RoleSchema = Schema({ 
    role:{
        type: String,
        required:[true,'El rol es obligatorio']
    }
});

module.exports = model ('Role', RoleSchema)//In the given code snippet, module.exports is used to export a model named 'Role' defined using a schema called RoleSchema.