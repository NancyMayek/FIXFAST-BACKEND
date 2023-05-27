const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const {validationResult} = require ('express-validator');
const worker = require('../models/worker');
const worker = require('../models/worker');


const workerGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;// argumentos opcionales del query por defecto
    const query = {estado:true};//obtener solo los que estan en estado true

    const [ total, workers]= await Promise.all([ 
        Worker.countDocuments(query),
        Worker.find(query)
            .skip( Number(desde) )
            .limit( Number(limite) ) //los parametros para enseñar los usuarios
    ])

    res.json({//imprimir en la respuesta
        total,
        workers
    });

}

//NEED ONE by category

const workerPost = async(req, res = response) => {

    const {name,email,password,direction,description,category,role}= req.body; //destructuracion 
    
    //const body = req.body; //obtenermos los datos del body de postman
    const worker = new Worker({name,email,password,direction,description,category,role});//creamos una instancia de un usuario y ponemos los datos (body)


    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    worker.password = bcryptjs.hashSync(password, salt);


    //guardar en BD
    await worker.save();//esperamos a que se salven los datos dentro de la base de datos

    res.json({//la respuesta que da cuando se ejecuta
        worker//imprime la instancia
    });

}

const workerPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    //Validar contra base de datos
    if( password ){
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const worker =  await Worker.findByIdAndUpdate(id, resto);

    res.json({worker});
}



const workerDelete = async(req, res = response) => {

    const { id } = req.params;
    const worker = await worker.findByIdAndUpdate( id, { estado: false } );
    res.json(worker);
}


module.exports = {
    workerGet,
    workerPost,
    workerPut,
    workerDelete
}