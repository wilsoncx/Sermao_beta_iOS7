/////////////////////////////////////
//arquivo que controla a inserção  //
//de novas pregações na agenda e  //
//de igrejas em sermões já        //
//cadastrados  					 //
//							     //
//////////////////////////////////

Ti.include("mask.js");
var currentWin = Ti.UI.currentWindow;
var iSermao = Ti.UI.currentWindow.idSermao;
var ig = Ti.UI.currentWindow.ig;
var se = Ti.UI.currentWindow.se;
var vidigre;
var vidser;
var os = Titanium.Platform.osname;

function insertRows(dbData) {

	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var theData = db.execute('INSERT INTO agendasermao (igreja, sermao, data, status) VALUES("' + vidigre + '","' + iSermao + '","' + data.value.toLocaleDateString() + '","' + status + '")');
	theData;
	alert("Registro inserido ");

};
var btnAddIgre = Ti.UI.createButton({
	title : '+',
	height : 40,
	width : 40,
	top : 10,
	right : 10
});

var btnAddSerm = Ti.UI.createButton({
	style : Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
	title : '+',
	height : 40,
	width : 40,
	top : 60,
	right : 10
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

var basicSwitch = Ti.UI.createSwitch({
	value : false,
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
if (os == 'iphone') {
	var switchLabel = Ti.UI.createLabel({
		text : 'Não Concluido',
		color : '#245553',
		font : {
			fontSize : 16
		},
		height : 18,
		width : 210,
		bottom : 60,
		right : 20,
		textAlign : 'center'
	});

	currentWin.add(switchLabel);

	var txtsermao = Ti.UI.createTextField({
		rightButton : btnAddSerm,
		color : '#245553',
		font : {
			fontSize : 16
		},
		top : 60,
		left : 10,
		width : 300,
		height : 40,
		hintText : 'Sermão',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	var igreja = Ti.UI.createTextField({
		rightButton : btnAddIgre,
		color : '#245553',
		top : 10,
		left : 10,
		width : 300,
		height : 40,
		font : {
			fontSize : 16
		},
		hintText : 'Igreja',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED

	});
	btnAddSerm.addEventListener('click', function() {
		var addSermoes = Titanium.UI.createWindow({
			url : 'tblsermao_add_agenda.js',
		});

		se = true;
		Ti.UI.currentTab.open(addSermoes, {
			animated : true
		});
	});

	btnAddIgre.addEventListener('click', function() {
		var addIgreja = Titanium.UI.createWindow({
			url : 'tbligrejas_add_agenda.js',
		});
		ig = true;
		Ti.UI.currentTab.open(addIgreja, {
			animated : true
		});
	});
	var limpar = Titanium.UI.createButton({
		title : 'Limpar'
	});
	var gravar = Titanium.UI.createButton({
		title : 'Gravar'
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
	var switchLabel = Ti.UI.createLabel({
		text : 'Não Concluido',
		color : '#245553',
		font : {
			fontSize : 16
		},
		height : 18,
		width : 210,
		bottom : 80,
		right : 60,
		textAlign : 'center'
	});

	currentWin.add(switchLabel);

	var txtsermao = Ti.UI.createTextField({
		color : '#245553',
		font : {
			fontSize : 16
		},
		top : 60,
		left : 10,
		width : 255,
		height : 40,
		hintText : 'Sermão',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});

	var igreja = Ti.UI.createTextField({
		color : '#245553',
		top : 10,
		left : 10,
		width : 255,
		height : 40,
		font : {
			fontSize : 16
		},
		hintText : 'Igreja',
		keyboardType : Ti.UI.KEYBOARD_DEFAULT,
		borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED

	});
	btnAddSerm.addEventListener('click', function() {
		var addSermoes = Titanium.UI.createWindow({
			url : 'tblsermao_add_agenda.js',
			backgroundColor : '#FFEFBF',
			modal : true
		});

		se = true;
		addSermoes.open();
	});
	btnAddIgre.addEventListener('click', function() {
		var addIgreja = Titanium.UI.createWindow({
			url : 'tbligrejas_add_agenda.js',
			backgroundColor : '#FFEFBF',
			modal : true
		});
		ig = true;
		addIgreja.open();
	});

	currentWin.add(btnAddIgre);
	var limpar = Titanium.UI.createButton({
		title : 'Limpar',
		bottom : 0,
		left : 10,
		height : 40,
		width : 80
	});
	var gravar = Titanium.UI.createButton({
		title : 'Gravar',
		bottom : 0,
		right : 0,
		height : 40,
		width : 80
	});

	currentWin.add(limpar);
	currentWin.add(gravar);

};

gravar.addEventListener('click', function(e) {
	var db2 = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rs = db2.execute('SELECT COUNT(igreja) as quantidade FROM agendasermao WHERE igreja= "' + vidigre + '" and sermao = "' + iSermao + '"');
	if (rs.fieldByName('quantidade') == 0) {
		if (igreja.value != '') {
			var dbData = {
				igreja : igreja.value,
				txtsermao : txtsermao.value,
				data : data.value.toLocaleDateString(),

			};
			db2.close();
			insertRows(dbData);
		} else {
			alert("Preencha todos os campos");
		};
	} else {
		alert("Este sermão já foi utilizado nesta igreja");
	}
});

limpar.addEventListener('click', function(e) { igreja:''; sermao:'';
});

currentWin.addEventListener('focus', function(e) {
	if (iSermao == false) {
		currentWin.add(txtsermao);
		if (os == 'android') {
			currentWin.add(btnAddSerm);
		};
	} else {

	};
	if (ig == 0) {

	} else {
		igreja.value = Ti.App.Properties.getString('vigreja');
		vidigre = Ti.App.Properties.getString('vidigreja');
	};

	if (se == false) {

	} else {
		txtsermao.value = Ti.App.Properties.getString('visermao');
		iSermao = Ti.App.Properties.getString('vidsermao');
	};

});

currentWin.add(igreja);

