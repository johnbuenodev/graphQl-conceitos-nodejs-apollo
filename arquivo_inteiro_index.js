const { ApolloServer, gql } = require('apollo-server');

const perfis = [
  {
   id: 1,
   nome: "Comum",
  },
  {
    id: 2,
    nome: "Administrador",
   },
];


const usuarios = [
  {
   id: 1,
   nome: "john bueno",
   email: "jbueno@gmail.com",
   idade: 34,
   perfil: 2,
   vip: true,
   salario_real: 10000.55
  },
  {
    id: 2,
    nome: "Marcela antunes",
    email: "mantunes@gmail.com",
    idade: 22,
    perfil: 1,
    vip: false,
    salario_real: 5000.82
   },
   {
    id: 3,
    nome: "Daniel madeira",
    email: "dmadeira@gmail.com",
    idade: 31,
    perfil: 1,
    vip: true,
    salario_real: 8000.36
   },

];



//Valores Scalares disponiveis no GraphQL

//Int Float String Boolean ID

//Pode criar um proprio Scalar

//biblioteca apollo entende como default typeDefs
const typeDefs = gql`

   #criado tipo Scalar Date para retornar o valor Date do Javascript
   scalar Date 

   type Perfil {
    id: Int!
    nome: String! 
   }

   #Criando um tipo
   #Tipo de Scalares que existem de default no GraphQL
   type Usuario {
    id: Int!  # alterado de ID String para  Int
    nome: String!
    email: String!
    idade: Int 
    salario: Float
    vip: Boolean,
    perfil: Perfil
   }

   type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precocomdesconto: Float
   }
   
   # Pontos de entrada da sua API!
   #consultas simples 
   # add na frente do valor atributo esperado ! tem q voltar o valor
   # exemplo ola: String!
   type Query {
      ola: String,
      hour: String,
      dataagora: Date,
      usuariologado: Usuario,
      produtoemdestaque: Produto
      numerosmegasena: [Int!]!
      usuarios: [Usuario!]!
      usuario(id: Int, idPerfil: Int): Usuario # alterado de ID String para Int
      perfis: [Perfil]
      perfil(id: Int): Perfil
   }
`

//biblioteca apollo entende como default resolvers
const resolvers = {

   //resolver para produto para aplicar o preço-com-desconto 
   Produto: {
    precocomdesconto(prod) {
      if(prod.desconto) {
      return  prod.preco * (1 - prod.desconto);//prod.preco * desconto / 100;
      } else {
        return prod.preco;
      }
    }
   },

   //resolvendo valores para o type Usuario
   Usuario: {
    salario(usuario) {
      //resolvendo a questão do valor salario_real para salario
      return usuario.salario_real;
    },
    perfil(usuario) {
      const perfilNome = perfis.filter( p => p.id === usuario.perfil);
      return perfilNome ? perfilNome[0] : null;
    }
   },

    //objeto query
   Query: {
      ola() {
        return 'Retornando a string solicitada';
      },
      hour() {
        //return new Date().toString();
        return `${new Date()}`;
      }, 
      dataagora() {
        //return new Date().toString();
        return new Date();
      }, 
      usuariologado() {
      //usuariologado(objeto) { se tivesse um objeto aqui ele iniciaria undefined porq ainda estaria buscando os 
      //console.log(objeto) estaria vazio
      //valores dos resolvers pelo grafos para retornar a resposta  
        //Pode consultar varias apis para retornar o valor
        return {
          id: 1,
          nome: 'Ana da Web',
          email: 'anadaweb@email.com',
          idade: 24, 
          salario_real: 1234.56,
          vip: true
        }
      },
      produtoemdestaque() {
        return{
          nome: 'Cadeira madeira',
          preco: 150.30,
          desconto: 0.15, //null para testar retornando somente o valor do produto 0.15 % de desconto
        }
      },
      numerosmegasena() {
        //return [4,8,13,27,33,54,61]
        const crescente = (a , b) => a - b;
        const numeros = Array(6).fill(0)
        .map(v => parseInt(Math.random() * 60 + 1))
        .sort(crescente); //vai pegar o padrão de ordenação e aplicar forma crescente
        return [... new Set(numeros)]; //removendo numeros repetidos     
      },
      usuarios() {
        return usuarios;
      },

      usuario(_, { id }) { // args são os valores passados na consulta
        // usuario(_, args)  acima foi aplicado tipo uma desestruturação para extrair somente o valor q quer receber mais rapido
        //const searchUsuario = usuarios.filter(u => u.id === args.id);

        // ===  ==  ID Scalar ele é um String , mudar para  Int no Type de usuario o id
        const searchUsuario = usuarios.filter(u => u.id === id 
          // && u.idPerfil === idPerfil
          );
    
        return searchUsuario ? searchUsuario[0] : null;  
      },
      perfis() {
        return perfis;
      },
      perfil(_, { id }) {

        const searchPerfil = perfis.filter(u => u.id === id);
        return searchPerfil ? searchPerfil[0] : null;  
  
      }
   }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
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