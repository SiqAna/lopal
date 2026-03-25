async function lyvia(){
    let lyvia = "()()()()()(0u0)";
    let lyviaanda = "( )( )( )( )( )(0u0)";
    let espaco = " ";

    function sleep(ms){
        return new Promise( resolve => setTimeout(resolve, ms));
    }

    for(let i = 0; i < 30; i++){
        console.log(lyviaanda)
        lyviaanda = espaco + lyviaanda
        espaco = espaco + " "
        await sleep (250)
        console.clear()
        console.log(lyvia)
        lyvia = espaco + lyvia 
        espaco = espaco + " "
        await sleep (250)
        console.clear()
    }
}