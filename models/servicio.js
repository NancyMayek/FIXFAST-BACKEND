const { Schema, model } = require('mongoose');

const ServicioSchema = Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
       
    },
    uid_usuario: {
      type: String,
        required: [true, 'uid de usuario es obligatoria']
        
    },
    uid_worker: {
        type: String,
          required: [true, 'uid de worker es obligatoria']
          
    },
    fecha: {
        type: String,
          required: [true, 'fecha es obligatoria']
    
    },
    direccion: {
        type: String,
          required: [true, 'La descripcion es obligatoria']
          
      }
});


CategoriaSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Servicio', ServicioSchema );
