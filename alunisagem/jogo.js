//Jogo da Alunissagem
//Ana Siqueira
//08/04/2026
//Versão 0.1.0

/** @type {HTMLCanvasElement}*/

let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let modulolunar = {
    posicao: {
    x: 100,
    y: 100
},
largura: 20,
altura: 20,
cor: "magenta",
velocidade:{
    x: 0,
    y: 2
}
}

function desenhar(){
    //atração gravitacional
    modulolunar.posicao.x += modulolunar.velocidade.x;
    modulolunar.posicao.y += modulolunar.velocidade.y

    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.fillStyle = "#ab3465";
    contexto.fillRect (0, 0, canvas.width, canvas.height);
    contexto.restore();

    contexto.save();
    contexto.beginPath();
    contexto.translate(modulolunar.posicao.x, modulolunar.posicao.y);
    contexto.rect(modulolunar.largura * -0.5, modulolunar.altura * -0.5,
        modulolunar.largura, modulolunar.altura);
    contexto.fillStyle = modulolunar.cor;
    contexto.fill();
    contexto.closePath();
    contexto.restore();

    requestAnimationFrame(desenhar);

}

desenhar();