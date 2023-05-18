const { ApolloServer, gql } = require('apollo-server');
const { importSchema } = require('graphql-import');
const resolvers = require('./resolvers'); //quando tem um arquivo index.js só precisa referenciar a pasta

const server = new ApolloServer({
    typeDefs: importSchema('./schema/index.graphql'),
    resolvers: resolvers
});

//porta padrão 4000
server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});


/*

Criar Tipo: 

Produto

-nome(obrigatorio)
-preco(obrigatorio)
-desconto
-precoComDesconto (resolver)

Consulta:

-produtoEmDestaque

*/


/*

EXEMPLO DE QUERY NO TERMINAL PLAYGROUND

{
  #hour  //SOLICITAÇÃO DE UM SCALAR
  #ola
  #usuariologado {
  #  id
 #   idade
 #   nome
 #   salario
 #   vip
 #   email
 # }
  #produtoemdestaque {
  #  nome
  #  desconto
  #  preco
  #  precocomdesconto
  #}
  #numerosmegasena
  usuarios {   //SOLICITAÇÃO DE UM TIPO
    id
    nome
    idade
    email
  }
  usuario (id: 1) {
    id
    nome
    idade
    email
  }
}


*/