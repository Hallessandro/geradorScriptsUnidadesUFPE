module.exports.geraUpdateHierarquia = function (codUnidade, siapecadPai){
    let update = `
--${codUnidade}
UPDATE comum.UNIDADE SET 
	HIERARQUIA = CAST((SELECT HIERARQUIA FROM comum.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecadPai})||(SELECT ID_UNIDADE FROM comum.UNIDADE WHERE CODIGO_UNIDADE = ${codUnidade})||'.' AS varchar(50)), 
	HIERARQUIA_ORGANIZACIONAL = CAST((SELECT HIERARQUIA FROM comum.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecadPai})||(SELECT ID_UNIDADE FROM comum.UNIDADE WHERE CODIGO_UNIDADE = ${codUnidade})||'.' AS varchar(50)) WHERE CODIGO_UNIDADE = ${codUnidade}; 
    `;
    return update;
};