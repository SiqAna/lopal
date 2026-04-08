function mapa(){
    const frutas = new Map();

    frutas.set("maçã", 500);
    frutas.set("banana", 300);
    frutas.set("laranja", 200);
    frutas.set("pera", 200);

    let preco = frutas.get("pera");

    console.log(frutas)

    //size é uma propriedade que armazena o tamanho do mapa
    console.log(frutas.size)

    //o método has() retorna verdadeiro ou falso para uma determinada chave
    console.log(frutas.has('banana'));
    frutas.forEach((valor, chave) => console.log (`${chave} = R$${valor},00`));

    //values() é um método que retorna uma coleção contendo todos os valores de um mapa
    for (const x of frutas.values()){
        console.log(x);
    }

}

mapa();