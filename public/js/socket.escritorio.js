// Comando para establecer la conexión
var socket = io();

$("#tdAcertadas").hide();
$("#tdFalladas").hide();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}

var escritorio = searchParams.get("escritorio");
var label = $("small");
var btnAcertada = $("#btnAcertada");
var btnPaso = $("#btnPaso");
var lblAcertadas = $("#lblAcertadas");
var lblFalladas = $("#lblFalladas");

//console.log(escritorio);
$("h1").text("Participante: " + escritorio);

socket.emit("atenderTicket", { escritorio: escritorio, tipo: "" }, function (
  resp
) {
  if (resp === "No hay más palabras") {
    label.text(resp);
    alert(resp);
    btnAcertada.hide();
    btnPaso.hide();
    return;
  }
  //label.text(resp.numero);
});

$("#btnAcertada").on("click", function () {
  socket.emit(
    "atenderTicket",
    { escritorio: escritorio, tipo: "acertada" },
    function (resp) {
      if (resp === "No hay más palabras") {
        label.text(resp);
        alert(resp);
        btnAcertada.hide();
        btnPaso.hide();
        return;
      }

      //label.text(resp.numero);
    }
  );
});

$("#btnPaso").on("click", function () {
  socket.emit(
    "atenderTicket",
    { escritorio: escritorio, tipo: "fallada" },
    function (resp) {
      if (resp === "No hay más palabras") {
        label.text(resp);
        alert(resp);
        btnAcertada.hide();
        btnPaso.hide();
        return;
      }

      //label.text(resp.numero);
    }
  );
});

socket.on("finTiempo", function (data) {
  alert("SE ACABÓ EL TIEMPO");
  btnAcertada.hide();
  btnPaso.hide();
  lblAcertadas.text(`Aciertos: ${data.acertadas}`);
  lblFalladas.text(`Fallos: ${data.falladas}`);
  $("#tdAcertadas").show();
  $("#tdFalladas").show();
  socket.emit("reiniciarConteo", null);
});
