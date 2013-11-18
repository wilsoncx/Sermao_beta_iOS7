Ti.include("mask.js");
Ti.include("bd.js");

// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
var idDist = Ti.UI.currentWindow.idDist;
var os = Titanium.Platform.osname;

function insertRows(dbData) {
	var theData = db.execute('INSERT INTO igreja (nome, distrito, endereco, contato, fone) VALUES("' + nome.value + '","' + idDist + '","' + endereco.value + '","' + contato.value + '","' + fone.value + '")');
	theData;
	alert("Registro inserido com sucesso!");

};

var nome = Ti.UI.createTextField({
	color : '#336699',
	top : '5%',
	left : '5%',
	width : '90%',
	hintText : 'Nome',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(nome);

var endereco = Ti.UI.createTextField({
	color : '#336699',
	top : '18%',
	left : '5%',
	width : '90%',
	hintText : 'Endereço',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(endereco);

var contato = Ti.UI.createTextField({
	color : '#336699',
	top : '30%',
	left : '5%',
	width : '90%',
	hintText : 'Contato',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(contato);

var fone = Ti.UI.createTextField({
	color : '#336699',
	top : '43%',
	left : '5%',
	width : '90%',
	hintText : 'Fone',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
fone.addEventListener('blur', function() {
	Mask.mask(fone, Mask.phone);
});
currentWin.add(fone);

if (os == 'iphone') {
	var gravar = Titanium.UI.createButton({
		title : 'Salvar'

	});
	var limpar = Titanium.UI.createButton({
		title : 'Limpar'
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

} else {
	var gravar = Titanium.UI.createButton({
		title : 'Salvar',
		bottom : '120dp',
		left : '17dp',
		height : '40dp',
		width : '100dp'
	});
	var limpar = Titanium.UI.createButton({
		title : 'Limpar',
		bottom : '120dp',
		right : '17dp',
		height : '40dp',
		width : '100dp'
	});
	currentWin.add(gravar);
	currentWin.add(limpar);
};

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

limpar.addEventListener('click', function(e) { nome:''; enderco:''; contato:''; fone:'';
});

