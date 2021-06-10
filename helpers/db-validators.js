const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol='') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El ${rol} no esta registrado en la bd.`);
    }
}

const emailExiste = async (correo = '')=>{
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo){
        throw new Error(`Ya existe un usuario con el correo: ${correo}`)
    }
}

const existeUsuarioPorId = async (id)=>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`No existe usuario con id: ${id}`)
    }
}
module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId

}