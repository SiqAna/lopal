const numeros = [45, 4, 9, 16, 25]

/* for( i = 0; i<5; i++){
    console.log(numeros[i])
}*/
//forEach() é um método que aplica uma função callback a cada elemento do array
numeros.forEach(valor => console.log(valor));

//map() é um método que cria um novo array com elementos
// retornados por um callback function
const numeros2 = numeros.map(valor => valor * 2)
numeros2.forEach(valor => console.log(valor));

//filter() é um método que retorna um novo array com
//elementos que atende a um determinado critério

const numeros3 = numeros.filter(valor => valor > 18)
numeros3.forEach(valor => console.log(valor));

//reduce() produz um único valor
console.log(
    numeros.reduce((total, valor) => total + valor)
);

//A propriedade lenght retorna um número correspondente à quantidade 
//de elementos de um array
console.log(numeros.length);
numeros.length = 5;
console.log(numeros);

//O método push() acrescenta um valor no fim do array
numeros.push(25);
console.log(numeros);

//o método pop() remove um elemento no fim do array
numeros.pop();
console.log(numeros)

//console.log (numeros);

