Ti.include("mask.js");

// create var for the currentWindow
Ti.include("bd.js");
var os = Titanium.Platform.osname;

var currentWin = Ti.UI.currentWindow;
var idIgreja = Ti.UI.currentWindow.idIgreja;
function insertRows(dbData) {
	var theData = db.execute('update igreja set nome="' + nome.value + '", endereco="' + endereco.value + '", contato="' + contato.value + '", fone ="' + fone.value + '"WHERE id ="' + idIgreja + '"'); theData;
	alert("Registro atualizado");

};


var nome = Ti.UI.createTextField({
	color : '#336699',
	font : {
		fontSize : 16
	},
	top : '5%',
	left : '5%',
	width : '90%',
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
	top : '18%',
	left : '5%',
	width : '90%',
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
	top : '30%',
	left : '5%',
	width : '90%',
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
	top : '43%',
	left : '5%',
	width : '90%',
	height : 40,
	hintText : 'Fone',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
fone.addEventListener("change", function() {
	Mask.mask(fone, Mask.phone);
});
currentWin.add(fone);
var rs = db1.execute('SELECT * FROM igreja WHERE id ="' + idIgreja + '"');
nome.value = rs.fieldByName('nome');
endereco.value = rs.fieldByName('endereco');
contato.value = rs.fieldByName('contato');
fone.value = rs.fieldByName('fone');
db1.close();
// criando tabbar
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
		bottom : '35%',
		left : '5%',
		height : 40,
		width : '40%'
	});
	var limpar = Titanium.UI.createButton({
		title : 'Limpar',
		bottom : '35%',
		right : '5%',
		height : 40,
		width : '40%'
	});
	currentWin.add(gravar);
	currentWin.add(limpar);
};



gravar.addEventListener('click', function(e) {

	if (nome.value != '') {
		var dbData = {
			nome : nome.value,
			enderco : endereco.value,
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


