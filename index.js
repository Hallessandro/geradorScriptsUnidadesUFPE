var csv = require('csvtojson'); 
var fs = require('fs');
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

function processarArquivo(){
    csv()
        .fromFile(__dirname + "/dados.csv")
        .then( (data) => {
            criarArquivoResultado();
            let scriptsTemporarios = "";
            for (let cont in data) {
                let organizacional = data[cont].organizacional === 'SIM' ? true : false;
                let orcamentaria = data[cont].orcamentaria === 'SIM' ? true : false;
                let patrimonial = data[cont].patrimonial === 'SIM' ? true : false;
                let licitacoes = data[cont].licitacoes === 'SIM' ? true : false; 
                let licitacoesEng = data[cont].licitacoesEng === 'SIM' ? true : false;
                let academica = data[cont].academica === 'SIM' ? true : false;
                let metas = data[cont].metas === 'SIM' ? true : false;
                let protocoloCentral = data[cont].protocoloCentral === 'SIM' ? true : false;
                let tipoOrcamentaria = data[cont].tipoOrcamentaria === 'SIM' ? true : false; 
                let tipo = 1;
                let permiteGestao = data[cont].permiteGestao === "SIM" ? true : false;
                if(orcamentaria){
                    if(tipoOrcamentaria){
                        tipo = 2;
                    }
                }
                let cod_unid_vao_por_ultimo = [11260021, 11260011,11260045,112690,11260038,112678,11260029,11260035,112608,112621,11260002,112668,112662,112672,112675,112663,112673,112679,112649,112650,112677,112665,11260005,112660,112652,112676,112655,112645,112681,112661,112640,11260032,11260034,112612,112611,11260062,11260033,112610];
                if(data[cont].acao === 'INCLUIR'){
                    if(cod_unid_vao_por_ultimo.includes(parseInt(data[cont].codUnidade))){
                        scriptsTemporarios += geradorInsert.geraInsert(data[cont].siapecad, data[cont].siapecadPai,
                            data[cont].codUnidade, data[cont].nome, data[cont].sigla, data[cont].siapecadGestora,
                            organizacional, orcamentaria, patrimonial, licitacoes, licitacoesEng, academica, metas, protocoloCentral,
                            tipo, permiteGestao);
                    }else {
                        addConteudoArquivo(geradorInsert.geraInsert(data[cont].siapecad, data[cont].siapecadPai,
                             data[cont].codUnidade, data[cont].nome, data[cont].sigla, data[cont].siapecadGestora,
                             organizacional, orcamentaria, patrimonial, licitacoes, licitacoesEng, academica, metas, protocoloCentral,
                             tipo, permiteGestao
                        ));
                    }
                }else if(data[cont].acao === 'ALTERAR' || data[cont].acao === 'MANTER'){ 
                    if(cod_unid_vao_por_ultimo.includes(parseInt(data[cont].codUnidade))){
                        scriptsTemporarios += geradorUpdate.geraUpdate(data[cont].siapecad, data[cont].nome, data[cont].sigla, orcamentaria, licitacoes, licitacoesEng, patrimonial, 
                            academica, metas, data[cont].codUnidade, data[cont].siapecadPai, data[cont].acao,
                            tipo, permiteGestao    
                        );
                    }else {
                        addConteudoArquivo(geradorUpdate.geraUpdate(data[cont].siapecad, data[cont].nome, data[cont].sigla, orcamentaria, licitacoes, licitacoesEng, patrimonial, 
                            academica, metas, data[cont].codUnidade, data[cont].siapecadPai, data[cont].acao,
                            tipo, permiteGestao    
                        ));
                    }
                }else if(data[cont].acao === 'REMOVER'){
                    addConteudoArquivo(geradorUpdate.geraUpdateInativacao(data[cont].codUnidade));
                }
            }
            addConteudoArquivo(scriptsTemporarios);
    });
}

processarArquivo();
