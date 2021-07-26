const { readFile, writeFile } = require("fs");

const { promisify } = require("util");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database {
  constructor() {
    this.nomeArquivo = "herois.json";
  }

  async _obterDadosArquivo() {
    const arquivo = await readFileAsync(this.nomeArquivo, "utf8");
    return JSON.parse(arquivo.toString());
  }

  async _escreverArquivo(dados) {
    await writeFileAsync(this.nomeArquivo, JSON.stringify(dados));
    return true;
  }

  async cadastrar(heroi) {
    const dados = await this._obterDadosArquivo();

    const id = heroi.id <= 2 ? heroi.id : Date.now();

    const heroiToSave = { ...heroi, id };

    const dadosFinal = [...dados, heroiToSave];

    const resultado = await this._escreverArquivo(dadosFinal);

    return resultado;
  }

  async listar(id) {
    const dados = await this._obterDadosArquivo();

    const dadosFiltrados = dados.filter((item) => (id ? item.id == id : true));

    return dadosFiltrados;
  }

  async atualizar(id, heroi) {
    const dados = await this._obterDadosArquivo();

    const indice = dados.findIndex((item) => item.id === parseInt(id));

    if (indice === -1) {
      throw Error("O heroi informado nao existe");
    }

    const atual = dados[indice];

    const modificacao = {
      ...atual,
      ...heroi,
    };

    dados.splice(indice, 1);

    return await this._escreverArquivo([...dados, modificacao]);
  }

  async remove(id) {
    if (!id) {
      return await this._escreverArquivo([]);
    }

    const dados = await this._obterDadosArquivo();

    const indice = dados.findIndex((item) => item.id === parseInt(id));

    if (indice === -1) {
      throw Error("O id do heroi nao existe");
    }

    dados.splice(indice, 1);

    return await this._escreverArquivo(dados);
  }
}

module.exports = new Database();
