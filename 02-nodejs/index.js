const util = require("util");

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        id: 1,
        nome: "Aluno",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        telefone: "99999-8888",
        ddd: 19,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Rua Joao Antonio",
    });
  }, 2000);
}

const obterEnderecoAsync = util.promisify(obterEndereco)

main();
async function main(){
    try{

        console.time('medida-promise')

        const usuario = await obterUsuario();
        // const telefone = await obterTelefone(usuario.id);
        // const endereco = await obterEnderecoAsync(usuario.id);

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[1]
        const endereco = resultado[0]

        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.rua}
        `);

        console.timeEnd('medida-promise')
    }catch(error){
        console.error(error);
    }
}

// const usuarioPromise = obterUsuario();

// const obterEnderecoAsync = util.promisify(obterEndereco);

// usuarioPromise
//   .then(function (resultado) {
//     return obterTelefone(resultado.id).then(function resolverTelefone(result) {
//       return {
//         usuario: {
//           nome: resultado.nome,
//           id: resultado.id,
//         },
//         telefone: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id);

//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result,
//       };
//     });
//   })
//   .then(function (resultado) {
//     console.log("resultado", resultado);
//   })
//   .catch(function (error) {
//     console.error("Erro =>", error);
//   });

// obterUsuario(function resolverUsuario(erro, usuario) {
//   if (erro) {
//     console.error("Erro em usuario", erro);
//     return;
//   }

//   obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
//     if (erro1) {
//       console.error("Erro em telefone", erro);
//       return;
//     }

//     obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
//       if (erro2) {
//         console.error("Erro em endereco", endereco);
//         return;
//       }

//       console.log(`
//       Nome: ${usuario.nome},
//       Endereco: ${endereco.rua},
//       Telefone: (${telefone.ddd})${telefone.telefone}
//       `);

//     });
//   });
// });

// console.log("telefone", telefone);
