const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); //para poder acceder al req.body en un paticion post necesitamos activar esto.
const mongoose = require('mongoose');
const endpoint = require('./router/index');

// Importar variales de entorno locales
require('dotenv').config({ path: 'variables.env'});

const server = express();

// habilitar el Body parser par leer los datos del formulario
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Conectar con Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL , {
    useNewUrlParser: true
})

// Habilitar pug. View engine es un valor que requiere express.
// hay que colocarl odespuer de declarrar el server o app

server.set('view engine', 'pug');

// indicarle a express donde estan las vistas
// con __dirnanme obtenermos la ubicación del archivo actual gracias a la
// funcion path de express
server.set('views', path.join(__dirname, './views'));

// Cargar los archivos estaticos en public
server.use(express.static('public'));

// usar las rustas de la aplicacion
server.use('/', endpoint());

// leer localhost de variables y puerto
// la url 0.0.0.0 no es una url valida, Heroku lo detecta asi y entonces le asigna un host automatico.
const host = process.env.HOST || '0.0.0.0';
// Tanto HosT como PORT son variales que heroku asigna.
// por eso en caso de que exista la variable de entorno PORT heroku le asigna el valor correspondiente
// en caso contrario estamos en local y se asigna el puerto de localhost que es el 3000
const port = process.env.PORT || 3000;

server.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});