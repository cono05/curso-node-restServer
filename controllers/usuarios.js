const {response} = require('express');

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario')

const usuariosGet = async (req, res = response) =>{
    //const query = req.query; con esta linea me quedo la query que viene en la url del get
    //const{ q, nombre = 'No name', apikey, page, limit} = req.query;
    const{ limite = 5, desde = 0 } = req.query;
    const query = {estado:true};
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))//se saltea los primeros "desde"
    //     .limit(Number(limite));//es la cantidad de registros a recuperar

    // const total = await Usuario.countDocuments(query);//esta linea es para contabilizar los registros, al ponerle estado:true
    //solo va a contar los registros que cumplan con esa condicion. Esto nos puede servir en el obligatorio

    //Una manera mas performante de hacer lo mismo es usando promise.all, dado que ejecuta las dos promesas al mismo tiempo
    const [total , usuarios] = await Promise.all([ //total es el resultado de la primera promesa, usuarios es el resultado de la segunda promesa
        Usuario.count(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])


    res.json({
        total,
        usuarios
        //resp
        // total,
        // usuarios
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
    const {_id, password, google, correo, ...resto} = req.body // excluye psw, google y correo del resto del body
    //el _id esta bueno sacarlo si es que viene, porque evitamos que se caiga en esa parte
    //TODO validar contra base de datos
    if(password){
        const salt = bcrypt.genSaltSync(5);
        resto.password = bcrypt.hashSync(password, salt);
    }
    //findByIdAndUpdate busca por id, y actualiza todo lo que va en resto
    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);
    res.json(usuarioDB);


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