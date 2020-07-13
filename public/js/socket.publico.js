// Comando para establecer la conexión
var socket = io();

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
/*var lblTicket4 = $('#lblTicket4');*/

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
/*var lblEscritorio4 = $('#lblEscritorio4');*/

var lblTickets = [lblTicket1];
var lblEscritorios = [lblEscritorio1];

socket.on("estadoActual", function (data) {
  //console.log(data);
  actualizaHTML(data.ultimos4, data.acertadas, data.falladas);
});

socket.on("ultimos4", function (data) {
  //console.log(data);

  //var audio = new Audio('audio/new-ticket.mp3');
  //audio.play();

  actualizaHTML(data.ultimos4, data.acertadas, data.falladas);
});

function actualizaHTML(ultimos4, acertadas, falladas) {
  for (var i = 0; i < ultimos4.length; i++) {
    lblTickets[i].text(ultimos4[i].numero);
    //lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    // Actualizar puntajes
  }
  lblTicket2.text(acertadas);
  lblTicket3.text(falladas);
}
