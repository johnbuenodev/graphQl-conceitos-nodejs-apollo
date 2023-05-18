module.exports = {
    
    precocomdesconto(prod) {
        if(prod.desconto) {
        return  prod.preco * (1 - prod.desconto);//prod.preco * desconto / 100;
        } else {
          return prod.preco;
        }
      }

}