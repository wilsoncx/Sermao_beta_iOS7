//include para modificação de mascaras
Ti.include("mask.js");
// Criando a tela inicial
var currentWin = Ti.UI.currentWindow;
var os = Ti.Platform.osname;

//Função para inserir os dados no banco
function insertRows(dbData) {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var theData = db.execute('INSERT INTO sermao (titulo, tema, detalhes) VALUES("' + titulo.value + '","' + tema.value + '","' + detalhes.value + '")');
	theData;
	alert("Sermão Gravado com Sucesso!");
	db.close();
};

//adicionando os text field
var titulo = Ti.UI.createTextField({
	color : '#336699',
	font : {fontSize : 16},
	top : 20,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Titulo',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(titulo);
var tema = Ti.UI.createTextField({
	color : '#336699',
	font : {fontSize : 16},
	top : 80,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Tema',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(tema);
var detalhes = Ti.UI.createTextArea({
	color : '#336699',
	font : {fontSize : 16},
	top : 140,
	left : 10,
	width : 300,
	height : 100,
	hintText : 'Detalhes',
	editable: true,
	borderRadius:5,
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

currentWin.add(detalhes);

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
// criando os botões
//evento para gravar os dados nas variaveis
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


limpar.addEventListener('click', function(e) {
	titulo.value = '';
	tema.value = '';
	detalhes.value = '';
});

flexSpace = Titanium.UI.createButton({
	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});


