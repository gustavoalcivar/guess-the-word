// Comando para establecer la conexión
var socket = io();

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
/*var lblTicket4 = $('#lblTicket4');*/
var lblTiempo = $("#lblTiempo");
var lblParticipante = $("#lblParticipante");

var lblEscritorio1 = $("#lblEscritorio1");
var lblEscritorio2 = $("#lblEscritorio2");
var lblEscritorio3 = $("#lblEscritorio3");
/*var lblEscritorio4 = $('#lblEscritorio4');*/

var lblTickets = [lblTicket1];
var lblEscritorios = [lblEscritorio1];

socket.on("estadoActual", function (data) {
  //console.log(data);
  actualizaHTML(data.ultimos4, data.acertadas, data.falladas, data.participante);
});

socket.on("ultimos4", function (data) {
  //console.log(data);

  //var audio = new Audio('audio/new-ticket.mp3');
  //audio.play();

  actualizaHTML(data.ultimos4, data.acertadas, data.falladas, data.participante);
});

function actualizaHTML(ultimos4, acertadas, falladas, participante) {
  for (var i = 0; i < ultimos4.length; i++) {
    lblTickets[i].text(ultimos4[i].numero);
    //lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    // Actualizar puntajes
  }
  lblTicket2.text(acertadas);
  lblTicket3.text(falladas);
  lblParticipante.text(participante);
}

socket.on("iniciarTiempo", function (data) {
  var deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 121);
  var x = setInterval(function () {
    var now = new Date().getTime();
    var t = deadline - now;
    //var days = Math.floor(t / (1000 * 60 * 60 * 24));
    //var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    document.getElementById("lblTiempo").innerHTML = minutes + ":" + seconds;
    if (t < 1) {
      clearInterval(x);
      document.getElementById("lblTiempo").innerHTML = "TIEMPO";
      console.log(document.getElementById("lblTicket2").innerHTML);
      socket.emit("finTiempo", {
          acertadas: document.getElementById("lblTicket2").innerHTML,
          falladas: document.getElementById("lblTicket3").innerHTML
        });
        socket.emit("reiniciarConteo", null);
    }
  }, 1000);
});
