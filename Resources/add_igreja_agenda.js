Ti.include("mask.js");

// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
//var idDist = Ti.UI.currentWindow.idDist;
var status = 'a';
function insertRows(dbData) {

	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var theData = db.execute('INSERT INTO agendasermao (igreja, sermao, data, status) VALUES("' + igreja.value + '","' + sermao.value + '","' + data.value.toLocaleDateString() + '","'+ status +'")'); 
	theData;
	alert("Registro inserido");

};

var igreja = Ti.UI.createTextField({
	color : '#336699',
	top : 10,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Nome',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(igreja);

var sermao = Ti.UI.createTextField({
	color : '#336699',
	top : 60,
	left : 10,
	width : 300,
	height : 40,
	hintText : 'Endereço',
	keyboardType : Ti.UI.KEYBOARD_DEFAULT,
	borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
currentWin.add(sermao);

 var dateValue = new Date();
        dateValue.setFullYear(2013);
        dateValue.setMonth(8);
        dateValue.setDate(24);
 


var data = Ti.UI.createPicker({
  type:Titanium.UI.PICKER_TYPE_DATE,
	value: dateValue, 
    top:120
});
 data.setLocale(Titanium.Platform.locale); 
        data.selectionIndicator = true;
currentWin.add(data);


data.addEventListener('change',function(e){
  Ti.API.info(e.value.toLocaleDateString());
  // Ti.API.info(getValue());
  
});

var gravar = Titanium.UI.createButton({
	title : 'Gravar',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
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
	title : 'Limpar',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
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
currentWin.add(toolbar);
