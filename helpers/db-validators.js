const Role = require('../models/role');
const User = require('../models/user');

const esRoleValido = async(role= '') => {

    const existeRole = await Role.findOne({role});
    if(!existeRole){
        throw new Error(`El role ${role}no esta registrado en la base de datos`);
    }

}

const emailExiste = async(email = '')=>{
    const existeEmail = await User.findOne ({email})
    if(existeEmail){
        throw new Error(`El email ${email}, ya esta registrado en la base de datos`);
    }
}

const existeUsuarioPorId = async(id)=>{

    const existeUsuario = await User.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id}, no existe`);
    }

}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}