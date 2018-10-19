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
            let cod_unid_vao_por_ultimo = [11260021, 11260011,11260045,112690,11260038,112678,11260029,11260035,112608,112621,11260002,112668,112662,112672,112675,112663,112673,112679,112649,112650,112677,112665,11260005,112660,112652,112676,112655,112645,112681,112661,112640,11260032,11260034,112612,112611,11260062,11260033,112610];
            let temporario = "";
            for (let cont in data) {
                if(data[cont].acao === 'INCLUIR' || data[cont].acao === 'ALTERAR' || data[cont].acao === 'MANTER'){
                    if(cod_unid_vao_por_ultimo.includes(parseInt(data[cont].codUnidade))){
                        temporario += geradorHierarquia.geraUpdateHierarquia(data[cont].codUnidade, data[cont].siapecadPai, data[cont].siapecad);
                    }else {
                        addConteudoArquivo(geradorHierarquia.geraUpdateHierarquia(data[cont].codUnidade, data[cont].siapecadPai, data[cont].siapecad));
                    }
                }
            }
            addConteudoArquivo(temporario);
    });
}  

processarArquivo();
