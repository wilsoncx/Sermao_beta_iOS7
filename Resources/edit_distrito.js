Ti.include("mask.js");
var os = Ti.Platform.osname;

//criando a tela
var currentWin = Ti.UI.currentWindow;
//variavel que vem da lista de distrito com o id do distrito
var idDist = Ti.UI.currentWindow.idDist;
//função que atualizar os dados
function insertRows(dbData) {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var theData = db.execute('update distrito set nome="' + nome.value + '", pastor="' + pastor.value + '", fone ="' + fone.value + '"WHERE id ="' + idDist + '"');
	theData;
	alert("Distrito Gravado com Sucesso!");
};

//adicionando texte field
var nome = Ti.UI.createTextField({
	color : '#245553',
	font : {
		fontSize : 16
	},
	top : 20,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Nome',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(nome);
var pastor = Ti.UI.createTextField({
	color : '#245553',
	font : {
		fontSize : 16
	},
	top : 80,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Pastor',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(pastor);
var fone = Ti.UI.createTextField({
	color : '#245553',
	font : {
		fontSize : 16
	},
	top : 140,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Fone',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(fone);
//adicioando a mascara no telefone
fone.addEventListener("change", function() {
	Mask.mask(fone, Mask.phone);
});

if (os == 'iphone') {

	flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE

	});
	// criando botões
	var gravar = Titanium.UI.createButton({
		title : 'Gravar',
	});
	var limpar = Titanium.UI.createButton({
		title : 'Limpar',
	});
	//criando a toolbar
	var toolbar = Titanium.UI.iOS.createToolbar({
		items : [gravar, flexSpace, flexSpace, flexSpace, limpar],
		bottom : 0,
		borderTop : true,
		borderBottom : false
	});
	currentWin.add(toolbar);

} else {
	// criando botões
	var gravar = Titanium.UI.createButton({
		title : 'Gravar',
		bottom : 0,
		left : 10,
		height : 40,
		width : 80
	});
	var limpar = Titanium.UI.createButton({
		title : 'Limpar',
		bottom : 0,
		right : 10,
		height : 40,
		width : 80
	});

	currentWin.add(gravar);
	currentWin.add(limpar);

};

//variavel para lista os ditritos e pegar o id
var db1 = Ti.Database.install('bd_sgs', 'bd_sgs');
var rs = db1.execute('SELECT * FROM distrito WHERE id ="' + idDist + '"');
nome.value = rs.fieldByName('nome');
pastor.value = rs.fieldByName('pastor');
fone.value = rs.fieldByName('fone');
db1.close();

gravar.addEventListener('click', function(e) {

	if (nome.value != '' && pastor.value != '' && fone.value != '') {
		var dbData = {
			nome : nome.value,
			pastor : pastor.value,
			fone : fone.value
		};
		insertRows(dbData);
	} else {
		alert("Preencha todos os campos");
	};
});


limpar.addEventListener('click', function(e) {
	nome.value = '';
	pastor.value = '';
	fone.value = '';
});

