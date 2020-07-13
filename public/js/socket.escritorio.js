// Comando para establecer la conexión
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es necesario");
}

var escritorio = searchParams.get("escritorio");
var label = $("small");
var btnAcertada = $("#btnAcertada");
var btnPaso = $("#btnPaso");

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
