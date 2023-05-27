const { response, request } = require('express');



const Resena = require('../models/resena');



const resenasGet = async(req = request, res = response) => {

    const { iud } = req.query;
    const query = { usuario:iud };
    
    const [ total, resenas ] = await Promise.all([
        Resena.countDocuments(query),
        Resenas.find(query)
    ]);

    res.json({
        total,
        categorias
    });
}



const resenasPost = async(req, res = response) => {
    
    const { descripcion, direccion, usuario, worker } = req.body;
    const resena = new Resena({ descripcion, direccion, usuario, worker });

    // Guardar en BD
    await resena.save();

    res.json({
        resena
    });
}



module.exports = {
    resenasGet,
    resenasPost
}