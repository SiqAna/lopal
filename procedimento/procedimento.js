function procedimento(){

    function inicio(){
        calcular(a = 3, b = 4);
        resultado = a * a + b * b
        mensagem(frase= "resultado de (a * a + b * b) é: " + resultado);

    function mensagem(frase){
        let linha = "-";
        let i = 0;


        do{
            linha = linha + "-"
            i++;
        }while( i < 50);

        alert(linha + "\n" + frase + "\n" + linha);

    }
    function calcular (a, b){
        return a * a + b * b;

    }
}

     inicio()
}