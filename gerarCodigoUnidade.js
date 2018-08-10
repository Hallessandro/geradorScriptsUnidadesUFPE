const readline = require('readline');
var csv = require('csvtojson'); 
var fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Unidade(nome, codUnidade) {
    this.nome = nome;
    this.codUnidade = codUnidade;
}; 

function criarArquivoResultado(){
    fs.writeFile(__dirname + "codUnidades.csv","nome, codigo\n",function(err){
        if(err)
          console.error(err);
    });
}

function addConteudoArquivo(conteudo){
    fs.appendFile(__dirname + "codUnidades.csv", conteudo,function(err){
        if(err)
          console.error(err);
    });
}

function processarArquivo(codigoBase){
    let listaUnidades = [];
    csv()
        .fromFile(__dirname + "/dados.csv")
        .then( (data) => {
            criarArquivoResultado();
            for (let cont in data) {
                if(data[cont].acao === 'INCLUIR'){
                    listaUnidades.push(data[cont].nome); 
                }
            }
            geradorCodigo(listaUnidades, codigoBase);
    });
}

function geradorCodigo(listaUnidades, codigoBase){
    let resultado = [];
    let codigoGerado = parseInt(codigoBase);
    for (let u in listaUnidades){        
        codigoGerado += 1;
        addConteudoArquivo(`${listaUnidades[u]}, ${codigoGerado}\n`);
    }
}

rl.question('Informe o código base: ', (res) => {
    processarArquivo(res);
    rl.close();
});