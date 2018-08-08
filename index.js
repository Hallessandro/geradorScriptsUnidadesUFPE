var csv = require('csvtojson'); 
var fs = require('fs');
var { Client } = require('pg');
var geradorInsert = require("./geradorInsert");
var geradorUpdate = require("./geradorUpdate");

function criarArquivoResultado(){
    fs.writeFile(__dirname + "resultado.sql","--Scripts gerados",function(err){
        if(err)
          console.error(err);
    });
}

function addConteudoArquivo(conteudo){
    fs.appendFile(__dirname + "resultado.sql", conteudo,function(err){
        if(err)
          console.error(err);
    });
}

function obterHierarquia(codigo_unidade){
    const client = new Client({
        user: 'comum_user',
        host: 'ufpe',
        database: 'preprod_sistemas_comum',
        password: 'comum_user',
        port: 15432,
    });
    client.connect();
    client.query('SELECT HIERARQUIA FROM COMUM.UNIDADE WHERE CODIGO_UNIDADE =' + codigo_unidade)
    .then(res=> {
        client.end();
        let resultado = res.rows[0].hierarquia;
        teste(resultado);
    })
    .catch(err => {
        cliente.end();
        console.error(err);
    });
}

function gerarUpdateHierarquia(res){
    console.log("TESTE" + res);
}

function processarArquivo(){
    csv()
        .fromFile(__dirname + "/dados.csv")
        .then( (data) => {
            criarArquivoResultado();
            for (let cont in data) {
                let organizacional = data[cont].organizacional === 'SIM' ? true : false;
                let orcamentaria = data[cont].orcamentaria === 'SIM' ? true : false;
                let patrimonial = data[cont].patrimonial === 'SIM' ? true : false;
                let licitacoes = data[cont].licitacoes === 'SIM' ? true : false; 
                let licitacoesEng = data[cont].licitacoesEng === 'SIM' ? true : false;
                let academica = data[cont].academica === 'SIM' ? true : false;
                let metas = data[cont].metas === 'SIM' ? true : false;
                let protocoloCentral = data[cont].protocoloCentral === 'SIM' ? true : false;
                if(data[cont].acao === 'INCLUIR'){
                    addConteudoArquivo(geradorInsert.geraInsert(data[cont].siapecad, data[cont].siapecadPai,
                         data[cont].codUnidade, data[cont].nome, data[cont].sigla, data[cont].siapecadGestora,
                         organizacional, orcamentaria, patrimonial, licitacoes, licitacoesEng, academica, metas, protocoloCentral
                        ));
                }else if(data[cont].acao === 'ALTERAR'){
                    addConteudoArquivo(geradorUpdate.geraUpdate(data[cont].siapecad, data[cont].nome, data[cont].sigla));
                }
            }
    });
}

processarArquivo();
