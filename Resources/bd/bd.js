//conexao com o banco de dados
var db = Titanium.Database.open('sgs');
db.execute('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, todo TEXT)');
//criando tabela DISTRITO
db.execute('CREATE TABLE IF NOT EXISTS distrito ( id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, nome VARCHAR( 40 )  NOT NULL, pastor VARCHAR( 40 ),fone NUMERIC( 12 ) )');

//criando tabela igreja
db.execute('CREATE TABLE IF NOT EXISTS igreja ( id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, nome  VARCHAR( 40 )   NOT NULL, distrito INTERGER( 40 )  REFERENCES distrito ( id ),endereco VARCHAR( 50 ),contato  VARCHAR( 40 ),fone     NUMERIC( 12 ), FOREIGN KEY ( distrito ) REFERENCES distrito ( id ) )');

//criando tabela sermao
db.execute('CREATE TABLE IF NOT EXISTS sermao( id INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, titulo   VARCHAR( 30 )  NOT NULL, tema     VARCHAR( 30 ), detalhes VARCHAR( 70 ) )');

//criando tabela pregacão
db.execute('CREATE TABLE IF NOT EXISTS pregacao ( id INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, igreja VARCHAR( 40 )  NOT NULL, sermao VARCHAR( 30 )  NOT NULL, FOREIGN KEY ( sermao ) REFERENCES sermao ( id ), FOREIGN KEY ( igreja ) REFERENCES igreja ( id ) )');


