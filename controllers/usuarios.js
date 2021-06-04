const {response} = require('express');
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

    const body = req.body;
    const usuario = new Usuario( body );
    await usuario.save();

    res.json({
        msg: 'post API desde controlador',
        usuario
    });
}

const usuariosPut = (req, res) =>{
    const id = req.params.id;
    res.json({
        msg: 'put API desde controlador',
        id
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