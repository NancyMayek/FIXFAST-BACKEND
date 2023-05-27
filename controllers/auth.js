const { response } = require("express");
const bcryptjs =  require('bcryptjs');
const Usuario = require('../models/user');
const {generarJWT} = require('../helpers/generar-jwt');

const login = async(req, res = response) => {
    const{email, password}=req.body;

    try{
        
        //Verificar si el email existe
        const user = await Usuario.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'El email no es correcto :/'
            });
        }

        //Verificar si el usuario esta activo
        if(user.estado === false ){
            return res.status(400).json({
                msg: 'El estado es false, el usuario no esta activo :/'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,user.password);
        if (!validPassword){
            return res.status(400).json({
                msg: 'El Password no es correcto :/'
            });
        }
        
        //Generar un JWT
        const token = await generarJWT(user.id);


        res.json({
            msg: "Login ok",
            user,
            token
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        });
    }

 
};

const googleSingin = async(req,res = response) =>{
    const {id_token} = req.body;

    res.json({
        msg: 'todo bien!',
        id_token
    })
}

module.exports = {
  login,
  googleSingin
};
