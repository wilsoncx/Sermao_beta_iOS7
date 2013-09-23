Ti.include("mask.js");

// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
var iSermao = Ti.UI.currentWindow.idSermao;

//var idDist = Ti.UI.currentWindow.idDist;
function insertRows(dbData) {

	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var theData = db.execute('INSERT INTO agendasermao (igreja, sermao, data, status) VALUES("' + igreja.value + '","' + idSermao + '","' + data.value.toLocaleDateString() + '","' + status + '")');
	theData;
	alert("Registro inserido");

};

// Create a Button.
var btnAddIgre = Ti.UI.createButton({
//style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
	title : '+',
	height : 40,
	width : 40,
	top : 10,
	right : 10
});

// Listen for click events.
btnAddIgre.addEventListener('click', function() {

});

// Create a Button.
var btnAddSerm = Ti.UI.createButton({
	style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	title : '+',
	height : 40,
	width : 40,
	top : 60,
	right : 10
});

// Listen for click events.
btnAddSerm.addEventListener('click', function() {
	alert('\'btnAddIgre\' was clicked!');
});

// Add to the parent view.
//currentWin.add(btnAddIgre);

var igreja = Ti.UI.createTextField({
	rightButton : btnAddIgre,
	color : '#245553',
	top : 10,
	left : 10,
	width : 300,
	height : 40,
	font : {
		fontSize : 16,
		fontFamily : 'Marker felt'
	},
	hintText : 'Igreja',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(igreja);

var sermao = Ti.UI.createTextField({
	rightButton : btnAddSerm,
	color : '#245553',
	font : {
		fontSize : 16,
		fontFamily : 'Marker felt'
	},
	top : 60,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Sermão',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

var dateValue = new Date();
dateValue.setFullYear(2013);
dateValue.setMonth(8);
dateValue.setDate(24);

var data = Ti.UI.createPicker({
	type : Titanium.UI.PICKER_TYPE_DATE,
	value : dateValue,
	top : 120
});
data.setLocale(Titanium.Platform.locale);
data.selectionIndicator = true;
currentWin.add(data);

data.addEventListener('change', function(e) {
	Ti.API.info(e.value.toLocaleDateString());
	// Ti.API.info(getValue());

});

// Create a Label.
var switchLabel = Ti.UI.createLabel({
	text : 'Não Concluido',
	color : '#245553',
	font : {
		fontSize : 16,
		fontFamily : 'Marker felt'
	},
	height : 18,
	width : 210,
	bottom : 60,
	right : 20,
	textAlign : 'center'
});

// Add to the parent view.
currentWin.add(switchLabel);

var basicSwitch = Ti.UI.createSwitch({
	value : false, // mandatory property for iOS
	bottom : 60,
	right : 10,
	color : '#245553',
	borderColor : '#245553',
	borderRadius : 15

});
currentWin.add(basicSwitch);
var status = 'a';

basicSwitch.addEventListener('change', function(e) {

	if (basicSwitch.value == true) {
		status = 'i';
		switchLabel.text = 'Concluido';
	}
	if (basicSwitch.value == false) {
		status = 'a';
		switchLabel.text = 'Não Concluido';
	}
});

// print initial value
Ti.API.info('Switch value: ' + basicSwitch.value);
var gravar = Titanium.UI.createButton({
	title : 'Gravar'
});

gravar.addEventListener('click', function(e) {

	if (igreja.value != '') {
		var dbData = {
			igreja : igreja.value,
			sermao : sermao.value,
			data : data.value.toLocaleDateString(),

		};
		insertRows(dbData);
	} else {
		alert("Preencha todos os campos");
	};
});

var limpar = Titanium.UI.createButton({
	title : 'Limpar'
});
limpar.addEventListener('click', function(e) { igreja:''; sermao:'';
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
currentWin.addEventListener('focus', function(e) {
	if (iSermao == false) {
		currentWin.add(sermao);
		iSermao = sermao.value;

	} else {
	};

});
currentWin.add(toolbar);
