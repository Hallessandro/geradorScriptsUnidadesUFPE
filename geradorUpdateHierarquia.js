module.exports.geraUpdateHierarquia = function (siapecad, nome, sigla){
    let update = `
--${nome}
UPDATE comum.unidade SET hierarquia='.605.615.1169.',hierarquia_organizacional='.605.615.1169.' WHERE id_unidade=(SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecad});
    `;
    return update;
};