const {response} = require('express');
const {Post} = require('../models');

const obtenerCategorias = async(req, res = response)=>{

    const {limite = 5, desde = 0} = req.query;// argumentos opcionales del query por defecto
    const query = {estado:true};//obtener solo los que estan en estado true

    const [ total, categorias]= await Promise.all([ 
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip( Number(desde) )
            .limit( Number(limite) ) //los parametros para enseñar los usuarios
    ])

    res.json({//imprimir en la respuesta
        total,
        categorias
    });
}

const obtenerUnaCategoria = async(req, res = response)=>{

    const name =  req.body.name.toUpperCase();//leemos el body y lo capitalozo
    
    const categoriaDB = await Categoria.findOne({name});//pregunto si existe una categoria con ese nombre

    if(!categoriaDB){ //si existe
        return res.status(400).json({
            msg: `La Categoria ${categoriaDB.name}, no existe`
        });
    }

    res.status(201).json(categoriaDB); //impresion de la respuesta
}

const crearCategoria = async(req, res = response)=>{
    const name =  req.body.name.toUpperCase();//leemos el body y lo capitalozo
    
    const categoriaDB = await Categoria.findOne({name});//pregunto si existe una categoria con ese nombre

    if(categoriaDB){ //si existe
        return res.status(400).json({
            msg: `La Categoria ${categoriaDB.name}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        name
    }

    const categoria = new Categoria(data);

    //guardar en BD
    await categoria.save();

    res.status(201).json(categoria); //impresion de la respuesta
}

module.exports={
    crearCategoria, //exportamos la funcion
    obtenerCategorias,
    obtenerUnaCategoria

}