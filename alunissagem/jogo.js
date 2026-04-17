//Jogo da Alunissagem
//Ana Siqueira
//08/04/2026
//Versão 0.1.0
// MVC Modelo, Visualização e Controle / Design Pattern (padrão de projeto)
// Modelo é uma região do seu código que vai tratar dos dados
// Visualização é a parte do código responsável por exibir os resultados
// Controle é o trecho do seu código que detém a lógica e os algorítimos do seu app

/** @type {HTMLCanvasElement}*/

let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");
let lancamento = (Math.round (Math.random()) == 0); //variável booleana aleatória

let estrelas = [];
for (let i = 0; i < 500; i++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(2 * Math.random()),
        brilho: 1.0,
        apagando: true,
        cintilacao: 0.05 * Math.random()
    }
}

let modulolunar = {
    posicao: {
    x: lancamento ? 100 : 700,
    y: 100
},
angulo: lancamento ? -Math.PI/2 : Math.PI/2,
largura: 20,
altura: 20,
cor: "pink",
velocidade:{
    x: lancamento ? 2 : -2,
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
     mostrarIndicador(
        `Velocidade vertical: ${(10*modulolunar.velocidade.y).toFixed(2)}`,
    50, 
    60)
}

function mostrarVelocidadeHorizontal(){
     mostrarIndicador(
        `Velocidade horizontal: ${(10*modulolunar.velocidade.x).toFixed(2)}`,
    50, 
    40)
}
function mostrarAltitude(){
    mostrarIndicador(
        `Altitude: ${(canvas.height - modulolunar.posicao.y - 0.5 * 
        modulolunar.altura).toFixed(2)}`,
    400, 
    60)
}
function mostrarIndicador(mensagem, x, y){
     contexto.font = "Bold 18px Arial";
    contexto.textAlign = "left";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "white";
    contexto.fillText(
        mensagem,
        x,
        y,
    )
}



function mostrarAngulo(){
    mostrarIndicador(
        `Angulo: ${(modulolunar.angulo * 100 / Math.PI).toFixed(0)}`,
    400, 
    40)
}

function desenharFundo(){
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.fillStyle = "#ab3465";
    contexto.fillRect (0, 0, canvas.width, canvas.height);
    contexto.restore();
}

function desenharEstrelas(){
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.fillStyle = "#ab3465";
    contexto.fillRect (0,0, canvas.width, canvas.height);
    for (let i = 0; i < estrelas.length; i++){
        let estrela = estrelas [i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = `rgba(255, 255, 255, ${estrela.brilho})`;
        contexto.fill();
        if(estrela.apagando){
            estrela.brilho -= estrela.cintilacao;
            if(estrela.brilho <= 0.1){
            estrela.apagando = false;
            }
        } else {
            estrela.brilho += estrela.cintilacao;
            if(estrela.brilho > 0.95){
                estrela.apagando = true;
            }
        }
    }
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
        consumirCombustível();
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
    contexto.fill()
}

function desenhar(){

    atracaoGravitacional();
    desenharEstrelas();
    desenharModuloLunar();
    mostrarCombustivel();
    mostrarVelocidadeVertical();
    mostrarVelocidadeHorizontal();
    mostrarAltitude();
    mostrarAngulo();
    

    if (encerrarJogo()){
        return
    }

    /*if(modulolunar.posicao.y > canvas.height -modulolunar.altura * 0.5 ){
        if(modulolunar.velocidade.y <= 0.5 && 
            modulolunar.velocidade.x <= 0.5 && 
            modulolunar.angulo <= 5){
            mostrarResultado("Você pousou com sucesso! +1000 créditos sociais✅", cor = "White");
        //você ganhou
        } else {
            mostrarResultado("Você morreu betinha -1000 aura", cor = "white");
        //você perdeu
        }   
       return
    }*/
    
    requestAnimationFrame(desenhar);

}
function encerrarJogo(){
        if (modulolunar.posicao.y > canvas.height -modulolunar.altura * 0.5 ){
            if(modulolunar.velocidade.y <= 0.5 && 
            Math.abs (modulolunar.velocidade.x) <= 0.5 && 
            Math.abs (modulolunar.angulo) <= 5){
            mostrarResultado("Você pousou com sucesso! +1000 créditos sociais✅", cor = "White");
        //você ganhou
        } else {
            mostrarResultado("Você morreu betinha -1000 aura", cor = "white");
        //você perdeu
        }
        return true;
    }
    return false;
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

function consumirCombustível(){
    modulolunar.combustível--;
    if(modulolunar.combustível == 0){
            modulolunar.motorLigado = false
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