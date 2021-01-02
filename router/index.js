const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// para hacer el codigo disponible al resto de la aplicacion
// tenemos que usar module.exports que vendria a ser lo mismo
// que el export default de React.
module.exports = () => {
    // req ---> informacion que envias al servidor.
    // res ---> informacion de respuesta del servidor.
    router.get('/', urlController.home);
    router.post('/', urlController.agregarUrl)

    // Generar una URL que nos sirva como comodin
    router.get('/:url', urlController.redirecUrl)
    return router;
}

// otro modo de escribir el mismo codigo:
// router.get('/' , (req,res) => {
//     res.send('Hola Mundo');
// });
// module.exports = router;