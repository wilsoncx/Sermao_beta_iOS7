//include para modificação de mascaras
Ti.include("mask.js");
Ti.include("bd.js");
var os = Ti.Platform.osname;
// Criando a tela inicial
var currentWin = Ti.UI.currentWindow;
//Função para inserir os dados no banco
function insertRows(dbData) {
	var theData = db.execute('INSERT INTO distrito (nome, pastor, fone) VALUES("' + nome.value + '","' + pastor.value + '","' + fone.value + '")'); theData;
	alert("Distrito Gravado com Sucesso!");
	db.close();
};

//adicionando os text field
var nome = Ti.UI.createTextField({
	color : '#336699',
	top : '5%',
	left : '5%',
	width : '90%',
	height : 40,
	font : {
		fontSize : 16,
	},
	hintText : 'Nome',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(nome);
var pastor = Ti.UI.createTextField({
	color : '#336699',
	font : {
		fontSize : 16,
	},
	top : '20%',
	left : '5%',
	width : '90%',
	height : 40,
	hintText : 'Pastor',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(pastor);
var fone = Ti.UI.createTextField({
	color : '#336699',
	font : {
		fontSize : 16,
	},
	top : '35%',
	left : '5%',
	width : '90%',
	height : 40,
	hintText : 'Fone',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
//chamando as mascara para o campo telefone
fone.addEventListener('blur', function() {
	Mask.mask(fone, Mask.phone);
});
currentWin.add(fone);

if (os == 'iphone') {
	var gravar = Titanium.UI.createButton({
		title : 'Salvar',
	});
	var limpar = Titanium.UI.createButton({
		title : 'Limpar'
	});
	flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	//criando a toolbar
	var toolbar = Titanium.UI.iOS.createToolbar({
		items : [gravar, flexSpace, flexSpace, flexSpace, limpar],
		bottom : 0,
		font : {
			fontSize : 16,
		},
		borderTop : true,
		borderBottom : false
	});
	currentWin.add(toolbar);

} else {
	var gravar = Titanium.UI.createButton({
		title : 'Salvar',
		bottom : '150dp',
		left : '17dp',
		height : '40dp',
		width : '100dp'
	});
	var limpar = Titanium.UI.createButton({
		title : 'Limpar',
		bottom : '150dp',
		right : '17dp',
		height : '40dp',
		width : '100dp'
	});
	currentWin.add(gravar);
	currentWin.add(limpar);

};

// criando os botões

//evento para gravar os dados nas variaveis
gravar.addEventListener('click', function(e) {

	if (nome.value != '' && pastor.value != '' && fone.value != '') {
		var dbData = {
			nome : nome.value,
			pastor : pastor.value,
			fone : fone.value
		};
		insertRows(dbData);
		nome.value = '';
		pastor.value = '';
		fone.value = '';
	} else {
		alert("Preencha todos os campos");
	};
});

limpar.addEventListener('click', function(e) {
	nome.value = '';
	pastor.value = '';
	fone.value = '';
});

