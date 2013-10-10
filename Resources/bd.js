var db = Ti.Database.open('bd_sgs.db');
var db1 = Ti.Database.open('bd_sgs.db');
var db2 = Ti.Database.open('bd_sgs.db');

var tbAgenda = ('CREATE TABLE IF NOT EXISTS agendasermao (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, igreja INTEGER REFERENCES igreja (id), sermao INTEGER REFERENCES sermao (id), data DATE, status VARCHAR);');
var tbIgreja = ('CREATE TABLE IF NOT EXISTS igreja ( id INTEGER PRIMARY KEY AUTOINCREMENT , nome VARCHAR ( 40 ) NOT NULL , distrito INTERGER ( 40 ) REFERENCES distrito ( id ) , endereco VARCHAR ( 50 ) , contato VARCHAR ( 40 ) , fone NUMERIC ( 12 ) , FOREIGN KEY ( distrito ) REFERENCES distrito ( id ) );');
var tbSermao = ('CREATE TABLE IF NOT EXISTS sermao ( id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE , titulo VARCHAR ( 30 ) NOT NULL , tema VARCHAR ( 30 ) , detalhes VARCHAR ( 70 ) );');
var tbDistrito = ('CREATE TABLE IF NOT EXISTS distrito ( id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE , nome VARCHAR ( 40 ) NOT NULL , pastor VARCHAR ( 40 ) , fone NUMERIC ( 12 ) );');

