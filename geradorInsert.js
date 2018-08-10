module.exports.geraInsert = function (siapecad, siapecadPai, codUnidade,nome, sigla, siapecadGestora, 
    organizacional, orcamentaria, patrimonial, licitacoes, licitacoesEng, academica, metas, protocoloCentral){
    let INSERT = `
--${nome}
INSERT INTO comum.unidade (
    id_unidade, unidade_orcamentaria, unidade_responsavel, id_responsavel,nome, codigo_unidade, sigla, tipo, compradora, compradora_engenharia, categoria, telefones,hierarquia, nome_capa, sipac, sequencia_modalidade_compra, presidente_comissao, prazo_envio_bolsa_inicio,prazo_envio_bolsa_fim, id_gestora, template_parecer_dl, data_cadastro, cnpj, id_gestora_academica,
    tipo_academica, unidade_academica, sigla_academica, id_unid_resp_org, avaliacao, id_ambiente_organizacional,id_area_atuacao, hierarquia_organizacional, tipo_funcao_remunerada, funcao_remunerada, id_tipo_organizacional,organizacional, gestora_frequencia, data_extincao, data_criacao, email, codigo_siapecad, submete_proposta_extensao,id_classificacao_unidade, 
    id_nivel_organizacional, nome_ascii, id_usuario_cadastro, id_municipio, metas, codigo_unidade_gestora_siafi, codigo_gestao_siafi, ativo, cep, endereco, uf, permite_gestao_centros_gestora_superior,protocolizadora, radical, codigo_siorg, id_tipo_turno, data_inicio_vigencia, data_fim_vigencia, visivel_apos_desativacao
)VALUES(
    nextval('comum.unidade_seq'), ${orcamentaria}, (SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecadPai}), NULL, '${nome}', ${codUnidade}, '${sigla}', 1, ${licitacoes}, ${licitacoesEng}, 1, NULL, NULL, '${nome}', ${patrimonial},
    NULL, NULL, NULL, NULL, (SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecadGestora}), NULL, now(), NULL, NULL, NULL, ${academica}, NULL,(SELECT ID_UNIDADE FROM COMUM.UNIDADE WHERE CODIGO_SIAPECAD = ${siapecadPai}), 
    false, 1, 2, NULL, 1, false, 16, true, false, NULL, NULL, NULL, ${siapecad}, NULL, 4, 1, '${nome}', NULL, 6575, ${metas}, NULL, NULL, true, '', '', 'PE', true, false, NULL, NULL, 4, NULL, NULL, false
);`;
    return INSERT;    
}

