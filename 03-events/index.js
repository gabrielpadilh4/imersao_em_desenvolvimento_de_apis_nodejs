const EventEmitter = require("events");

class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor();
const novoEvento = "usuario:click";
meuEmissor.on(novoEvento, function (click) {
  console.log("um usuario clicou", click);
});

// meuEmissor.emit(novoEvento, 'barra de rolagem')
// meuEmissor.emit(novoEvento, 'ok')

// let count = 0;

// setInterval(function(){
//     meuEmissor.emit(novoEvento, 'ok ' + (count++))\
// }, 1000)

const stdin = process.openStdin();

stdin.addListener("data", function (value) {
  console.log(`Você digitou: ${value.toString().trim()}`);
});
