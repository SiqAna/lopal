function arranjo(){
    let turma = ["Alessandra", "Alexandre", "Allan", "Ana"];
    console.log(turma);

    const frutas = new Map();

    frutas.set("maçã", 500);
    frutas.set("banana", 300);
    frutas.set("laranja", 200);
    frutas.set("pera", 200);

    let preco = frutas.get("banana");

    console.log(frutas)

    for (i = 0; i < frutas.length; i++) 
        console.log(i + " " + frutas[i]);

    for(i = 0; i < turma.length; i++){
        console.log(i + " " + turma[1])
    }
    turma.forEach

}

arranjo();