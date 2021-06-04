const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{ type: String, required: [true, 'El nombre es obligatorio']},
    //en el correo me aseguro que no puedan existir repetidos con la propiedad unique
    correo:{ type: String, required: [true, 'El correo es obligatorio'], unique: true},

    password:{ type: String, required: [true, 'La psw es obligatoria']},

    rol: { type: String, required: true, enum: ['ADMIN' , 'USER']},

    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }    
});

module.exports = model( 'Usuario' , UsuarioSchema);