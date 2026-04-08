function callback(){
   const minhaFunc = (num1, num2, operacao)=> {
        return operacao(num1,num2);
   }

   console.log (minhaFunc(num1 = 2, num2 = 3, operacao  = (a,b) => {return a*b}));
}

callback();