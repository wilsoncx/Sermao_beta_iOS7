//conexao com o banco de dados
var db = Titanium.Database.open('sgs');

//criando tabela DISTRITO
db.execute('CREATE TABLE IF NOT EXISTS carros ( id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, placa VARCHAR(10), marca VARCHAR(20), modelo VARCHAR(30) )');

