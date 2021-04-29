const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        // Propiedas this.server le enviamos el servidor de express, para hacer la conjuncion de socket y express
        this.server = require('http').createServer( this.app );
        // this.io requiere su paquete propio y le enviamos el this.server
        // io es toda la info de los socket conectados (Clientes conectados)
        this.io = require('socket.io')( this.server );

        this.paths = {};

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Sockets
        this.sockets();

    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        // this.app.use( this.paths.auth, require('../routes/auth'));
        
    }

    sockets() {

        // socket, cliente o socket cliente
        this.io.on('connection', socketController);

    }

    listen() {
        // se debe levantar el this.server y no el de express( this.app )
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;