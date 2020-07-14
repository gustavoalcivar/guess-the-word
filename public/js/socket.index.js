var socket = io();

socket.emit('siguienteTicket', null, function(siguienteTicket) {
  //label.text('Palabras generadas')
  //label.text(siguienteTicket);

});

$("#btnJugar").on("click", function () {
    socket.emit("iniciarTiempo", null);
  });