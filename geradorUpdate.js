module.exports.geraUpdate = function (siapecad, nome, sigla){
    let update = `
--${nome}
UPDATE comum.unidade SET codigo_siapecad=${siapecad}, nome='${nome}',  nome_ascii='${nome}',  nome_capa='${nome}', sigla='${sigla}' WHERE id_unidade=(SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecad});
    `;
    return update;
};