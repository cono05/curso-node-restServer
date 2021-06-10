const { validationResult } = require('express-validator');

//por ser un middleware, hay que incluir una funcion como tercer parametro, llamada 'next'
const validarCampos = (req, res, next)=>{
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next(); //aqui next es la siguiente funcion(middleware) si este middleware pasa, cuando no le quedan middlewares por ejecutar,
            //ahi recien se ejecuta el controlador
}

module.exports = {validarCampos}