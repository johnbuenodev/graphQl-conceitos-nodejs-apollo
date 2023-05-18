let id = 1;
function proximoID() {
  return id++;
}

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
     id: proximoID(),
     nome: "john bueno",
     email: "jbueno@gmail.com",
     idade: 34,
     perfil: 2,
     vip: true,
     salario_real: 10000.55,
     status: 'ATIVO'
    },
    {
      id: proximoID(),
      nome: "Marcela antunes",
      email: "mantunes@gmail.com",
      idade: 22,
      perfil: 1,
      vip: false,
      salario_real: 5000.82,
      status: 'BLOQUEADO'
     },
     {
      id: proximoID(),
      nome: "Daniel madeira",
      email: "dmadeira@gmail.com",
      idade: 31,
      perfil: 1,
      vip: true,
      salario_real: 8000.36,
      status: 'INATIVO'
     },
  
  ];

 module.exports = { usuarios, perfis, proximoID} 