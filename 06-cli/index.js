const Commander = require("commander");
const Database = require("./database");
const Heroi = require("./Heroi");

async function main() {
  Commander.version("v1")
    .option("-n, --nome [value]", "Nome do Heroi")
    .option("-p, --poder [value]", "Poder do Heroi")
    .option("-i, --id [value]", "Id do Heroi")
    .option("-c, --cadastrar", "Cadastrar um heroi")
    .option("-l, --listar", "Listar todos os herois")
    .option("-r, --remover [value]", "Remover um heroi")
    .option("-a, --atualizar", "Atualizar um heroi")
    .parse(process.argv);

  const heroi = new Heroi(Commander._optionValues);

  try {
    if (Commander._optionValues.cadastrar) {
      const resultado = await Database.cadastrar(heroi);

      console.log(heroi);

      if (!resultado) {
        console.error("Heroi nao foi cadastrado");
        return;
      }

      console.log("Heroi cadastrado com sucesso!");
    }

    if (Commander._optionValues.atualizar) {
      const resultado = await Database.atualizar(heroi.id, heroi);

      if (!resultado) {
        console.error("Heroi nao foi atualizado");
        return;
      }

      console.log("Heroi atualizado com sucesso!");
    }

    if (Commander._optionValues.listar) {
      const resultado = await Database.listar();
      console.log(resultado);
    }

    if (Commander._optionValues.remover) {
      const resultado = await Database.remove(Commander._optionValues.remover);

      if (!resultado) {
        console.error("Erro ao remover o heroi");
        return;
      }

      console.log("Heroi removido com sucesso");
    }
  } catch (error) {
    console.log(error);
  }
}

main();
