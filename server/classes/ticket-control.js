const fs = require("fs");

let removeItemFromArr = (arr, item) => {
  var i = arr.indexOf(item);
  i !== -1 && arr.splice(i, 1);
};

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = "";
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];

    let data = require("../data/data.json");
    this.words = require("../data/words.json").words;
    this.wordsCount = this.words.length;
    this.acertadas = 0;
    this.falladas = 0;

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    } else {
      this.reiniciarConteo();
    }
  }

  getWord() {
    return this.words[Math.floor(Math.random() * Math.random() * this.words.length)];
    /*const length = 10;
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;*/
  }

  siguiente() {
    this.reiniciarConteo();

    let data = fs.readFileSync(
      process.cwd() + "/server/data/words.json",
      "utf8"
    );

    let words2 = JSON.parse(data);
    this.words = words2.words;

    for (let i = 0; i < this.wordsCount; i++) {
      this.ultimo = this.getWord();
      removeItemFromArr(this.words, this.ultimo);
      let ticket = new Ticket(this.ultimo, null);
      this.tickets.push(ticket);

      this.grabarArchivo();
    }

    return this.ultimo;
  }

  getUltimoTicket() {
    return this.ultimo;
  }

  getUltimos4() {
    return this.ultimos4;
  }

  getAcertadas() {
    return this.acertadas;
  }

  getFalladas() {
    return this.falladas;
  }

  atenderTicket(escritorio, tipo) {
    if (this.tickets.length === 0) {
      if (tipo === "acertada") this.acertadas++;
      if (tipo === "fallada") this.falladas++;
      this.grabarArchivo();
      return "No hay más palabras";
    }

    let numeroTicket = this.tickets[0].numero;
    this.tickets.shift();

    let atenderTicket = new Ticket(numeroTicket, escritorio);

    this.ultimos4.unshift(atenderTicket);

    if (this.ultimos4.length > 1) {
      this.ultimos4.splice(-1, 1); // borra el último
    }
    if (tipo === "acertada") this.acertadas++;
    if (tipo === "fallada") this.falladas++;

    //console.log("Ultimos 4");
    //console.log(this.ultimos4);

    this.grabarArchivo();

    return atenderTicket;
  }

  reiniciarConteo() {
    this.ultimo = "";
    this.tickets = [];
    this.ultimos4 = [];
    this.acertadas = 0;
    this.falladas = 0;

    console.log("Se ha inicializado el sistema");
    this.grabarArchivo();
  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
      acertadas: this.acertadas,
      falladas: this.falladas,
    };

    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl,
};
