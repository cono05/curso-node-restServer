const {response} = require('express');

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario')

const usuariosGet = (req, res = response) =>{
    //const query = req.query; con esta linea me quedo la query que viene en la url del get
    const{ q, nombre = 'No name', apikey, page, limit} = req.query;
    res.json({
        msg: 'get API desde controlador',
        //query
        q,
        nombre,
        apikey,
        limit
    });
}

const usuariosPost = async (req, res) =>{
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );
    //verificar si el correo ya existe
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){
        return res.status(400).json({
            msg: 'Correo ya existente'
        });
    }

    //encriptar la contrasena
    const salt = bcrypt.genSaltSync(5);
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar en bd
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res) =>{
    const {id} = req.params; //este es .params porque viene en la linea de la url
    const {password, google, correo, ...resto} = req.body // excluye psw, google y correo del resto del body

    //TODO validar contra base de datos
    if(password){
        const salt = bcrypt.genSaltSync(5);
        resto.password = bcrypt.hashSync(password, salt);
    }
    //findByIdAndUpdate busca por id, y actualiza todo lo que va en resto
    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'put API desde controlador',
        usuarioDB
    });


}

const usuariosDelete = (req, res) =>{
    res.json({
        msg: 'delete API desde controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}