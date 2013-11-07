Ti.include("mask.js");
var os = Ti.Platform.osname;
Ti.include("bd.js");

//criando a tela
var currentWin = Ti.UI.currentWindow;
//variavel que vem da lista de distrito com o id do distrito
var idSermao = Ti.UI.currentWindow.idSermao;
//função que atualizar os dados
function insertRows(dbData) {
	var theData = db.execute('update sermao set titulo="' + titulo.value + '", tema="' + tema.value + '", detalhes ="' + detalhes.value + '"WHERE id ="' + idSermao + '"'); theData;
	alert("Sermão Gravado com Sucesso!");

};

//adicionando texte field
var titulo = Ti.UI.createTextField({
	color : '#336699',
	font : {fontSize : 16},
	top : '5%',
	left : '5%',
	width : '90%',
	height : 40,
	hintText : 'Titulo',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(titulo);
var tema = Ti.UI.createTextField({
	color : '#336699',
	font : {fontSize : 16},
	top : '18%',
	left : '5%',
	width : '90%',
	height : 40,
	hintText : 'Tema',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(tema);
var detalhes = Ti.UI.createTextArea({
	color : '#336699',
	font : {fontSize : 16},
	top : '33%',
	left : '5%',
	width : '90%',
	height : '40%',
	hintText : 'Detalhes',
	editable: true,
	borderRadius:5,
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(detalhes);
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
		title : 'Salvar',
		bottom : '60dp',
		left : '17dp',
		height : '40dp',
		width : '100dp'
	});
	var limpar = Titanium.UI.createButton({
		title : 'Limpar',
		bottom : '60dp',
		right : '17dp',
		height : '40dp',
		width : '100dp'
	});

	currentWin.add(gravar);
	currentWin.add(limpar);

};

//variavel para lista os ditritos e pegar o id
var rs = db1.execute('SELECT * FROM sermao WHERE id ="' + idSermao + '"');
titulo.value = rs.fieldByName('titulo');
tema.value = rs.fieldByName('tema');
detalhes.value = rs.fieldByName('detalhes');
db1.close();

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
