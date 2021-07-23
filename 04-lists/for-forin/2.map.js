const service = require("./service");

Array.prototype.myMap = function (callback) {
  const novoArrayMapeado = [];

  for (let indice = 0; indice <= this.length - 1; indice++) {
    const resultado = callback(this[indice], indice);
    novoArrayMapeado.push(resultado);
  }

  return novoArrayMapeado;
};

async function main() {
  try {
    const results = await service.obterPessoas("a");

    // const names = []

    // console.time('forEach')
    // results.results.forEach(item => {
    //     names.push(item.name)
    // });
    // console.timeEnd('forEach')

    // console.time("map");
    // const names = results.results.map((item) => item.name);
    // console.timeEnd("map");

    console.time("meu map");
    const names = results.results.myMap((item, indice) => `${item.name} - ${indice}`);
    console.timeEnd("meu map");

    console.log(names);
  } catch (error) {
    console.error(error);
  }
}

main();
