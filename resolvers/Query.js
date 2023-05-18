const { usuarios, perfis } = require('../database/db');

module.exports = {

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