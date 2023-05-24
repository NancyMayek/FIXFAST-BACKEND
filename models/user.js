const {Schema, model} = require ('mongoose');

const UserSchema = Schema({
    name:{
        type:String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type:String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'La contraseña es obligatoria']
    },
    role:{
        type:String,
        required:true,
        emun: ['USER_ROLE, WORKER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google: {
        type:Boolean,
        default:false
    }
    
})

UserSchema.methods.toJSON = function(){
    const {__v,password,_id,...user } = this.toObject(); //para no mostrar el password ni la version (__v) en el json pero el resto del user si (,...user)
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);