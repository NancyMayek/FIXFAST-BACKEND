const { response, request } = require('express');
const {Post} = require('../models');




const postsGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;// argumentos opcionales del query por defecto
    const query = {estado:true};//obtener solo los que estan en estado true

    const [ total, posts]= await Promise.all([ 
        Post.countDocuments(query),
        Post.find(query)
            .populate('user','name')
            .skip( Number(desde) )
            .limit( Number(limite) ) //los parametros para enseñar los usuarios
    ])

    res.json({//imprimir en la respuesta
        total,
        posts
    });

}

const postsPost = async(req, res = response) => {

    const {estado, user, ...body}= req.body; //destructuracion
    
    const data = {
        ...body,
        user: req.user._id
    }

    const post = new Post({data});//creamos una instancia de un usuario y ponemos los datos (body)
                     
    //guardar en BD
    await post.save();//esperamos a que se salven los datos dentro de la base de datos

    res.status(201).json({//la respuesta que da cuando se ejecuta
        post//imprime la instancia
    });

}


const postsDelete = async(req, res = response) => {

    const { id } = req.params;
    const postBorrardo = await user.findByIdAndUpdate( id, { estado: false } );
    res.json(postBorrado);
}


module.exports = {
    postsGet,
    postsPost,
    postsDelete,
}