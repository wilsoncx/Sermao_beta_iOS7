Ti.include("mask.js");

//criando a tela
var currentWin = Ti.UI.currentWindow;
//variavel que vem da lista de distrito com o id do distrito
var idSermao = Ti.UI.currentWindow.idSermao;
//função que atualizar os dados
function insertRows(dbData) {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var theData = db.execute('update sermao set titulo="' + titulo.value + '", tema="' + tema.value + '", detalhes ="' + detalhes.value + '"WHERE id ="' + idSermao + '"');
	theData;
	alert("Sermão Gravado com Sucesso!");

};

//adicionando texte field
var titulo = Ti.UI.createTextField({
	color : '#245553',
	font : {
		fontSize : 16,
		fontFamily : 'Marker felt'
	},
	top : 20,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Nome',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(titulo);
var tema = Ti.UI.createTextField({
	color : '#245553',
	font : {
		fontSize : 16,
		fontFamily : 'Marker felt'
	},
	top : 80,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Pastor',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(tema);
var detalhes = Ti.UI.createTextArea({
	color : '#245553',
	font : {
		fontSize : 16,
		fontFamily : 'Marker felt'
	},
	top : 140,
	textAlign:'left',
	width : 300,
	height : 100,
	hintText : 'Detalhes',
	editable : true,
	borderRadius : 5,
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED

});
currentWin.add(detalhes);

//variavel para lista os ditritos e pegar o id
var db1 = Ti.Database.install('bd_sgs', 'bd_sgs');
var rs = db1.execute('SELECT * FROM sermao WHERE id ="' + idSermao + '"');
titulo.value = rs.fieldByName('titulo');
tema.value = rs.fieldByName('tema');
detalhes.value = rs.fieldByName('detalhes');
db1.close();

// criando botões
var gravar = Titanium.UI.createButton({
	title : 'Gravar',
});
gravar.addEventListener('click', function(e) {

	if (titulo.value != '' && tema.value != '' && detalhes.value != '') {
		var dbData = {
			titulo : titulo.value,
			tema : tema.value,
			detalhes : detalhes.value
		};
		insertRows(dbData);
		titulo.value = '';
		tema.value = '';
		detalhes.value = '';
	} else {
		alert("Preencha todos os campos");
	};
});

var limpar = Titanium.UI.createButton({
	title : 'Limpar',
});
limpar.addEventListener('click', function(e) {
	titulo.value = '';
	tema.value = '';
	detalhes.value = '';
});

flexSpace = Titanium.UI.createButton({
	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

//criando a toolbar
var toolbar = Titanium.UI.iOS.createToolbar({
	items : [gravar, flexSpace, flexSpace, flexSpace, limpar],
	bottom : 0,
	borderTop : true,
	borderBottom : false
});
currentWin.add(toolbar);
