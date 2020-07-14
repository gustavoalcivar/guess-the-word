const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();



io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        //console.log(siguiente);
        callback(siguiente);
    });


    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4(),
        acertadas: ticketControl.getAcertadas(),
        falladas: ticketControl.getFalladas(),
        participante: null
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }


        let atenderTicket = ticketControl.atenderTicket(data.escritorio, data.tipo);


        callback(atenderTicket);

        // actualizar/ notificar cambios en los ULTIMOS 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4(),
            acertadas: ticketControl.getAcertadas(),
            falladas: ticketControl.getFalladas(),
            participante: `Está jugando ${data.escritorio}`
        });


    });

    client.on("iniciarTiempo", (data, callback) => {
        client.broadcast.emit("iniciarTiempo", null);
    })

    client.on("finTiempo", (data, callback) => {
        client.broadcast.emit("finTiempo", data);
    })

    client.on("reiniciarConteo", (data, callback) => {
        ticketControl.siguiente();
    })

});