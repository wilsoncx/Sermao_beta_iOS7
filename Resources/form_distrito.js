//include para modificação de mascaras
Ti.include("mask.js");
// Criando a tela inicial
var currentWin = Ti.UI.currentWindow;
//Função para inserir os dados no banco
function insertRows(dbData) {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var theData = db.execute('INSERT INTO distrito (nome, pastor, fone) VALUES("' + nome.value + '","' + pastor.value + '","' + fone.value + '")');
	theData;
	alert("Distrito Gravado com Sucesso!");
	db.close();
};

//adicionando os text field
var nome = Ti.UI.createTextField({
	color : '#336699',
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
	color : '#336699',
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
	color : '#336699',
	top : 140,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Fone',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
//chamando as mascara para o campo telefone
fone.addEventListener("change", function() {
	Mask.mask(fone, Mask.phone);
});
currentWin.add(fone);

// criando os botões
var gravar = Titanium.UI.createButton({
	title : 'Gravar',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});
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

var limpar = Titanium.UI.createButton({
	title : 'Limpar',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});
limpar.addEventListener('click', function(e) {
	nome.value = '';
	pastor.value = '';
	fone.value = '';
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
