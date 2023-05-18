const { perfis } = require('../database/db');

module.exports = {
    
    salario(usuario) {
        //resolvendo a questão do valor salario_real para salario
        return usuario.salario_real;
      },
      perfil(usuario) {
        const perfilNome = perfis.filter( p => p.id === usuario.perfil);
        return perfilNome ? perfilNome[0] : null;
      }

}