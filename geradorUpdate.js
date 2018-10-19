module.exports.geraUpdate = function (siapecad, nome, sigla, orcamentaria, licitacoes, licitacoesEng, patrimonial, 
    academica, metas, codUnidade, siapecadPai, acao, tipo, permiteGestao){
    let update = `
--${nome}
UPDATE comum.unidade SET codigo_siapecad=${siapecad}, nome='${nome}',  nome_ascii='${nome}',  nome_capa='${nome}', 
    sigla='${sigla}', unidade_orcamentaria=${orcamentaria}, compradora=${licitacoes}, compradora_engenharia=${licitacoesEng},
    sipac=${patrimonial}, unidade_academica=${academica}, tipo=${tipo}, PERMITE_GESTAO_CENTROS_GESTORA_SUPERIOR=${permiteGestao},metas=${metas}, UNIDADE_RESPONSAVEL=(SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD =${siapecadPai}),
    ID_UNID_RESP_ORG=(SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecadPai}) ${acao === 'MANTER' ? ', CODIGO_UNIDADE = ' + codUnidade : ''}
    WHERE id_unidade=(SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecad} ${codUnidade ? `OR CODIGO_UNIDADE = ${codUnidade});` : `);`}
    `;
    return update;
};

module.exports.geraUpdateInativacao = function(codigoUnidade){
    let update = `
--${codigoUnidade}
UPDATE COMUM.UNIDADE SET ATIVO = FALSE WHERE CODIGO_UNIDADE = ${codigoUnidade};
UPDATE COMUM.RESPONSAVEL_UNIDADE SET DATA_FIM = NOW() WHERE ID_UNIDADE = (SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_UNIDADE = ${codigoUnidade}) AND (DATA_FIM IS NULL OR DATA_FIM >= NOW());
    `;
    return update;
}