var geradorHierarquia = require('./geradorUpdateHierarquia'); 
var csv = require('csvtojson'); 
var fs = require('fs');
 
function criarArquivoResultado(){
    fs.writeFile(__dirname + "hierarquia.sql","--Scripts gerados",function(err){
        if(err)
          console.error(err);
    });
}

function addConteudoArquivo(conteudo){
    fs.appendFile(__dirname + "hierarquia.sql", conteudo,function(err){
        if(err)
          console.error(err);
    });
}

function processarArquivo(){
    csv()
        .fromFile(__dirname + "/dados.csv")
        .then( (data) => {
            criarArquivoResultado();
            for (let cont in data) {
                if(data[cont].acao === 'INCLUIR' || data[cont].acao === 'ALTERAR' || data[cont].acao === 'MANTER'){
                    addConteudoArquivo(geradorHierarquia.geraUpdateHierarquia(data[cont].codUnidade, data[cont].siapecadPai, data[cont].siapecad));
                }
            }
    });
}  

processarArquivo();
