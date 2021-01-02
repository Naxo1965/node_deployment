const Url = require('../models/Url');

exports.home = (req, res) => {
    res.render('index');
    // res.send para enviar algo al navegador, es decir el cliente
    // el render se utilizar para mostrar la vista, por eso especificamos el nombre de la vista
    // 
}

exports.agregarUrl = async (req, res, next) => {
    //console.log(req.body.urlOriginal)
    let respuesta;
    const url = new Url({ urlOriginal : req.body.urlOriginal})
    try {
        let resultado = await url.save();
        respuesta = {
            codigo: 201,
            mensaje : 'Guardado Correctamente',
            url : resultado.urlCorta
        }
    } catch (error) {
        console.log(error);
        respuesta = {
            codigo: 400,
            error: 'Hubo un error'
        }
    }
    res.json(respuesta);
    next();
}

// cuando el usuario visita la URL corta
exports.redirecUrl = async (req, res, next) => {
    const url = await Url.findOne({ urlCorta : req.params.url });
    if(!url) {
        res.redirect('/error=404');
        next();
    }
    res.redirect(url.urlOriginal);
    next();
}