const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/users', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Base de datos mongo en linea');
    }catch(error){
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
}
module.exports = {
    dbConnection
}