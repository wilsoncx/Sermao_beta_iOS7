Ti.include("mask.js");

// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
var idDist = Ti.UI.currentWindow.idDist;
function insertRows(dbData) {

	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var theData = db.execute('INSERT INTO igreja (nome, distrito, endereco, contato, fone) VALUES("' + nome.value + '","' + idDist + '","' + endereco.value + '","' + contato.value + '","' + fone.value + '")');
	theData;
	alert("Registro inserido com sucesso!");

};

var nome = Ti.UI.createTextField({
	color : '#336699',
	font : {
		fontSize : 16
	},
	top : 10,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Nome',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(nome);

var endereco = Ti.UI.createTextField({
	color : '#336699',
	font : {
		fontSize : 16
	},
	top : 60,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Endereço',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(endereco);

var contato = Ti.UI.createTextField({
	color : '#336699',
	font : {
		fontSize : 16
	},
	top : 110,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Contato',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(contato);

var fone = Ti.UI.createTextField({
	color : '#336699',
	font : {
		fontSize : 16
	},
	top : 160,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'fone',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
fone.addEventListener("change", function() {
	Mask.mask(fone, Mask.phone);
});
currentWin.add(fone);

var gravar = Titanium.UI.createButton({
	title : 'Salvar'

});

gravar.addEventListener('click', function(e) {

	if (nome.value != '') {
		var dbData = {
			nome : nome.value,
			endereco : endereco.value,
			contato : contato.value,
			fone : fone.value,

		};
		insertRows(dbData);
	} else {
		alert("Preencha todos os campos");
	};
});

var limpar = Titanium.UI.createButton({
	title : 'Limpar'
});
limpar.addEventListener('click', function(e) { nome:''; enderco:''; contato:''; fone:'';
});

flexSpace = Titanium.UI.createButton({
	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var toolbar = Titanium.UI.iOS.createToolbar({
	items : [gravar, flexSpace, flexSpace, flexSpace, limpar],
	bottom : 0,
	borderTop : true,
	borderBottom : false
});
currentWin.add(toolbar);
