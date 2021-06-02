const {response} = require('express');

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

const usuariosPost = (req, res) =>{
    const {nombre , edad} = req.body;


    res.status(200).json({
        msg: 'post API desde controlador',
        nombre,
        edad
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