const {Schema, model} = require ('mongoose');

const WorkerSchema = Schema({
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
    direction:{
        type:String,
        required: [true, 'La direccion es obligatoria']
    },
    description:{
        type:String,
        required: [true, 'La direccion es obligatoria']
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    google: {
        type:Boolean,
        default:false
    }
    
})

UserSchema.methods.toJSON = function(){
    const {__v,password,_id,...user } = this.toObject(); //para no mostrar el password ni la version (__v) en el json pero el resto del user si (,...user)
    user.uid = _id;
    return worker;
}

module.exports = model('Worker', WorkerSchema);