module.exports.geraUpdateHierarquia = function (codUnidade, siapecadPai, siapecad){
    let update = `
--${codUnidade ? codUnidade : siapecad}
UPDATE comum.UNIDADE SET 
	HIERARQUIA = CAST((SELECT HIERARQUIA FROM comum.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecadPai})||(SELECT ID_UNIDADE FROM comum.UNIDADE ${codUnidade ? 'WHERE CODIGO_UNIDADE =' + codUnidade : 'WHERE CODIGO_SIAPECAD =' + siapecad})||'.' AS varchar(50)), 
	HIERARQUIA_ORGANIZACIONAL = CAST((SELECT HIERARQUIA FROM comum.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecadPai})||(SELECT ID_UNIDADE FROM comum.UNIDADE ${codUnidade ? 'WHERE CODIGO_UNIDADE =' + codUnidade : 'WHERE CODIGO_SIAPECAD =' + siapecad})||'.' AS varchar(50)) ${codUnidade ? 'WHERE CODIGO_UNIDADE =' + codUnidade : 'WHERE CODIGO_SIAPECAD =' + siapecad}; 
    `;
    return update;
};