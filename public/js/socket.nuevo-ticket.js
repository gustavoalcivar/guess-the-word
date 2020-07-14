// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket');


socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

// on 'estadoActual'
socket.on('estadoActual', function(resp) {

    //console.log(resp);
    label.text('Click en el botón para generar un nuevo conjunto de palabras');

});


$('button').on('click', function() {

    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        //label.text('Palabras generadas')
        //label.text(siguienteTicket);

    });

});