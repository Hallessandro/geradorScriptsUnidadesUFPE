module.exports.geraUpdate = function (siapecad, nome, sigla, orcamentaria, licitacoes, licitacoesEng, patrimonial, academica, metas, codUnidade, siapecadPai){
    let update = `
--${nome}
UPDATE comum.unidade SET codigo_siapecad=${siapecad}, nome='${nome}',  nome_ascii='${nome}',  nome_capa='${nome}', 
    sigla='${sigla}', unidade_orcamentaria=${orcamentaria}, compradora=${licitacoes}, compradora_engenharia=${licitacoesEng},
    sipac=${patrimonial}, unidade_academica=${academica}, metas=${metas}, UNIDADE_RESPONSAVEL=(SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD =${siapecadPai}),
    ID_UNID_RESP_ORG=(SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecadPai})
    WHERE id_unidade=(SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecad} ${codUnidade ? `OR CODIGO_UNIDADE = ${codUnidade});` : `);`}
    `;
    return update;
};