var socket = io();

$("#btnJugar").on("click", function () {
    socket.emit("iniciarTiempo", null);
  });