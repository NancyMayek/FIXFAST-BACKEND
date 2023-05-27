const { Schema, model } = require('mongoose');

const ResenaSchema = Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria'],
       
    },
    direccion: {
        type: String,
          required: [true, 'direccion es obligatoria']
          
    },
    usuario: {
      type: String,
        required: [true, 'uid de usuario es obligatoria']
        
    },
    worker: {
        type: String,
          required: [true, 'uid de worker es obligatoria']
          
    }

});


ResenaSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Resena', ResenaSchema );