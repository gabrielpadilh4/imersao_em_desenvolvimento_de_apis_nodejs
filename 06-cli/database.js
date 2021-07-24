const { readFile } = require("fs");

const { promisify } = require("util");

const readFileAsync = promisify(readFile);

class Database {
  constructor() {
    this.nomeArquivo = "herois.json";
  }

  async _obterDadosArquivo() {
    const arquivo = await readFileAsync(this.nomeArquivo, "utf8");
    return JSON.parse(arquivo.toString());
  }

  _escreverArquivo() {}

  async listar(id) {
    const dados = await this._obterDadosArquivo();

    const dadosFiltrados = dados.filter((item) => (id ? item.id == id : true));

    return dadosFiltrados;
  }
}

module.exports = new Database();
