
const socketController = ( socket ) => {

    console.log('Cliente conectado', socket.id );

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id );
    });

    // Escuchando cuando el cliente emite el enviar-mensaje
    socket.on('enviar-mensaje', ( payload, callback ) => {

        const id = 123456789;
        callback( id );

        // Enviar mensaje a todos los clientes conectados
        // this.io es cuando el servidor de sockets lo envia
        // En este caso el socket.broadcast cumple la misma funcion
        socket.broadcast.emit('enviar-mensaje', payload);

    });

}

module.exports = {
    socketController
}