const { Pool, Client } = require('pg')

const client = new Client({
    user: 'comum_user',
    host: 'ufpe',
    database: 'preprod_sistemas_comum',
    password: 'comum_user',
    port: 15432,
  })
  client.connect()
 

module.exports.getHierarquia = function(codigo_unidade){
    client.query('SELECT HIERARQUIA FROM COMUM.UNIDADE WHERE CODIGO_UNIDADE =' + codigo_unidade)
        .then(res=> {
            let resultado = res.rows[0].hierarquia;
            client.end();
            console.log(resultado);
            return resultado;
        })
        .catch(err => console.error(err));
}
  