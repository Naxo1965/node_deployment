const formulario = document.querySelector('#agregar-url');
formulario.addEventListener('submit', async e => {
    e.preventDefault();

    const urlOriginal = document.querySelector('#urlOriginal').value;

    const respuesta = await fetch(e.target.action, {
        method: e.target.method,
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({urlOriginal : urlOriginal})
    });
    const resultado = await respuesta.json();
    // Eliminar los mensajes anteriores
    const alertas = document.querySelector('.mensaje-url');
    if(alertas) {
        document.querySelector('.mensaje-url').remove();
    }
    // verificar que todo esta bien
    if(resultado.codigo === 201) {
        //construir un mensaje de que todo se creo bien
        const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-url');
        mensaje.innerHTML = `<p>SE ha acortado correctametne la URL, vísita 
                <a target="_blank" rel="noopener noreferrer" 
                href="/${resultado.url}"> el enlace aquí</a> </p>`;
        const contenedor = document.querySelector('main');
        contenedor.appendChild(mensaje);
    } else {
        const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-url', 'error');
        mensaje.innerHTML = `<p>${resultado.error}</p>`;
        const contenedor = document.querySelector('main');
        contenedor.appendChild(mensaje);
    }
});

//Si hay un error en el querystgring
const urlParams = new URLSearchParams(window.location.search);

if(urlParams.has('error')) {
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-url', 'error');
    mensaje.innerHTML = `<p>URL no valida</p>`;
    const contenedor = document.querySelector('main');
    contenedor.appendChild(mensaje);
}