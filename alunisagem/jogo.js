//Jogo da Alunissagem
//Ana Siqueira
//08/04/2026
//Versão 0.1.0

/** @type {HTMLCanvasElement}*/

let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let modulolunar = {
    posicao: {
    x: 700,
    y: 100
},
angulo: Math.PI/2,
largura: 20,
altura: 20,
cor: "magenta",
velocidade:{
    x: -2,
    y: 0
},
motorLigado: false,
combustível: 1000,
rotacaoAntihorario: false,
rotacaoHorario: false
}

function mostrarCombustivel(){
    contexto.font = "Bold 18px Arial";
    contexto.textAlign = "left";
    contexto.testBaseline = "middle";
    contexto.fillStyle = "white";
    contexto.fillText(
        `Combustível: ${(modulolunar.combustível / 10).toFixed()}%`,
    50, 
    80)
}

function mostrarVelocidadeVertical(){
    contexto.font = "Bold 18px Arial";
    contexto.textAlign = "left";
    contexto.testBaseline = "middle";
    contexto.fillStyle = "white";
    contexto.fillText(
        `Velocidade: ${(10*modulolunar.velocidade.y).toFixed(2)}%`,
    50, 
    60)
}

function mostrarVelocidadeHorizontal(){
    contexto.font = "Bold 18px Arial";
    contexto.textAlign = "left";
    contexto.testBaseline = "middle";
    contexto.fillStyle = "white";
    contexto.fillText(
        `Velocidade: ${(10*modulolunar.velocidade.x).toFixed(2)}%`,
    50, 
    40)
}

function desenharFundo(){
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.fillStyle = "#ab3465";
    contexto.fillRect (0, 0, canvas.width, canvas.height);
    contexto.restore();
}

function desenharModuloLunar(){

    contexto.save();
    contexto.beginPath();
    contexto.translate(modulolunar.posicao.x, modulolunar.posicao.y);
    contexto.rotate(modulolunar.angulo);
    contexto.rect(modulolunar.largura * -0.5, modulolunar.altura * -0.5,
        modulolunar.largura, modulolunar.altura);
    contexto.fillStyle = modulolunar.cor;
    contexto.fill();
    contexto.closePath();

    if(modulolunar.motorLigado == true && modulolunar.combustível > 0){
        desenharchama();
        modulolunar.combustível--;
        
    if(modulolunar.combustível == 0){
            modulolunar.motorLigado = false
        }

    }
     contexto.restore();
    
}

function desenharchama(){
      contexto.beginPath();
    contexto.moveTo(modulolunar.largura * -0.5, modulolunar.altura * 0.5);
    contexto.lineTo(modulolunar.largura * 0.5, modulolunar.altura * 0.5);
        //determinar o tamanho da chama
        //desenha um linha de posição aleatória entre a base do módulo e 35 pixels
    contexto.lineTo(0, modulolunar.altura * 0.5 + Math.random() * 35);
    contexto.closePath();
    contexto.fillStyle = "yellow";
    contexto.fill();
   
    
}

function desenhar(){

    atracaoGravitacional();
    desenharFundo();
    desenharModuloLunar();
    mostrarCombustivel();
    mostrarVelocidadeVertical();
    mostrarVelocidadeHorizontal();

    if(modulolunar.posicao.y > canvas.height -modulolunar.altura * 0.5 ){
        if(modulolunar.velocidade.y <= 0.5 && 
            modulolunar.velocidade.x >= 0.5 && 
            modulolunar.angulo <= 5){
            mostrarResultado("Você pousou com sucesso! +1000 créditos sociais✅", cor = "White");
        //você ganhou
        } else {
            mostrarResultado("Você morreu betinha -1000 aura", cor = "white");
        //você perdeu
        }   
       return
    }
    
    requestAnimationFrame(desenhar);

}

function mostrarResultado(mensagem,cor){
    contexto.font = "Bold, 40px Calibri";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = cor;
    contexto.fillText(mensagem, canvas.width * 0.5, canvas.height * 0.5);
}

document.addEventListener('keydown', teclaPressionada);
function teclaPressionada(evento){
    if(evento.keyCode == 38){
        modulolunar.motorLigado = true;
    }
}

function teclaPressionada(evento){
    if(evento.key == "ArrowUp" && modulolunar.combustível > 0){
        modulolunar.motorLigado = true;
    } else if(evento.key == "ArrowRight"){
        modulolunar.rotacaoHorario = true;
    } else if(evento.key == "ArrowLeft"){
        modulolunar.rotacaoAntihorario = true;
    }
}

document.addEventListener('keyup', teclaSolta);

function teclaSolta(evento){
    if(evento.keyCode == 38){
        modulolunar.motorLigado = false;
    } else if(evento.key == "ArrowRight"){
        modulolunar.rotacaoHorario = false;
    } else if (evento.key == "ArrowLeft"){
        modulolunar.rotacaoAntihorario = false;
    }
}

const gravidade = 0.01;
function atracaoGravitacional(){
    modulolunar.posicao.x += modulolunar.velocidade.x;
    modulolunar.posicao.y += modulolunar.velocidade.y
    modulolunar.velocidade.y += gravidade;

    if(modulolunar.rotacaoHorario){
        modulolunar.angulo += Math.PI/180
    } else if(modulolunar.rotacaoAntihorario){
        modulolunar.angulo -= Math.PI/180
    }

    if(modulolunar.motorLigado && modulolunar.combustível > 0){
        modulolunar.velocidade.y -= 0.0150 * Math.cos(modulolunar.angulo);
        modulolunar.velocidade.x += 0.0150 * Math.sin(modulolunar.angulo); 
    }
}

desenhar();