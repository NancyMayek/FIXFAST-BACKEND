const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const {validationResult} = require ('express-validator');
const user = require('../models/user');


const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;// argumentos opcionales del query por defecto
    const query = {estado:true};//obtener solo los que estan en estado true

    const [ total, users]= await Promise.all([ 
        User.countDocuments(query),
        User.find(query)
            .skip( Number(desde) )
            .limit( Number(limite) ) //los parametros para enseñar los usuarios
    ])

    res.json({//imprimir en la respuesta
        total,
        users
    });

}

const usuariosPost = async(req, res = response) => {

    const {name,email,password,role}= req.body; //destructuracion 
    
    //const body = req.body; //obtenermos los datos del body de postman
    const user = new User({name,email,password,role});//creamos una instancia de un usuario y ponemos los datos (body)


    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);


    //guardar en BD
    await user.save();//esperamos a que se salven los datos dentro de la base de datos

    res.json({//la respuesta que da cuando se ejecuta
        user//imprime la instancia
    });

}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    //Validar contra base de datos
    if( password ){
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user =  await User.findByIdAndUpdate(id, resto);

    res.json({user});
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;
    const usuario = await user.findByIdAndUpdate( id, { estado: false } );
    res.json(usuario);
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}