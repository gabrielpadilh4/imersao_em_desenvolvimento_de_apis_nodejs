const { get } = require("axios");

const URL = "https://swapi.dev/api/people";

async function obterPessoas(nome) {
  const url = `${URL}/?search=${nome}&format=json`;
  const response = await get(url);

  return response.data.results.map(mapearPessoas);
}

function mapearPessoas(items) {
  return {
    nome: items.name,
    peso: items.height,
  };
}

module.exports = {
  obterPessoas,
};
