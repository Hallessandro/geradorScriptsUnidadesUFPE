function Unidade(siapecad, siapecadPai, codUnidade,nome, sigla, siapecadGestora) {
    this.siapecad = siapecad;
    this.siapecadPai = siapecadPai;
    this.codUnidade = codUnidade ? codUnidade : null;
    this.nome = nome;
    this.nomeCapa = nome;
    this.nomeAscii = nome;
    this.sigla = sigla;
    this.siapecadGestora = siapecadGestora;
}; 