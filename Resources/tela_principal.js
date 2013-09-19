// Create an array of explicitly defined custom TableViewRows
var currentWin = Ti.UI.currentWindow;

// Create a Button.
var btnConcluido = Titanium.UI.createButton({
	title : 'Concluido',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});

// Listen for click events.
btnConcluido.addEventListener('click', function() {

	setData1();

});

function setData1() {
	var st = 'i';
	var db1 = Ti.Database.install('bd_sgs', 'bd_sgs');
var rows1 = db1.execute('SELECT agendasermao.id, agendasermao.igreja, agendasermao.sermao, agendasermao.data, igreja.nome, sermao.titulo FROM  agendasermao INNER JOIN igreja ON agendasermao.igreja = igreja.id INNER JOIN sermao ON agendasermao.sermao = sermao.id WHERE status = "'+ st +'"  ORDER BY agendasermao.data ');
		var dataArray1 = [];

	while (rows1.isValidRow()) {
		var vsermao = rows.fieldByName('titulo');
		var vid = rows.fieldByName('id');
		var vigreja = rows.fieldByName('nome');
		var vdata = rows.fieldByName('data');
		var row = Ti.UI.createTableViewRow({
		backgroundColor : '#ECECEC',
		borderRadius : 15,
		//top:10,
		bottom : 10,
		id:vid
	});
	var label = Ti.UI.createLabel({
		top : 5,
		left : 10,
		font : {
			fontSize : 16,
			fontColor : '#336699',
			fontStyle : 'bold'
		},
		text : vsermao,
	});

	var label1 = Ti.UI.createLabel({
		top : 25,
		left : 10,
		font : {
			fontSize : 14
		},
		text : vigreja,
	});

	var label2 = Ti.UI.createLabel({
		font : {
			fontSize : 12,
			fontColor : '#336699'
		},
		top : 25,
		right : 60,
		text :vdata,
		id: vid,
	});

	var button = Ti.UI.createButton({
		right : 10,
		height : 30,
		width : 40,
		title : 'OK',
		borderColor : '#336699',
		borderRadius : 5

	});
	row.add(label);
	row.add(label1);
	row.add(label2);
	//row.add(button);
		
		dataArray.push(
			row
			
			);
		rows.next();
		table.setData1(dataArray1);
	};

};

//fuctio
function setData() {
	var st = 'a';
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
var rows = db.execute('SELECT agendasermao.id, agendasermao.igreja, agendasermao.sermao, agendasermao.data, igreja.nome, sermao.titulo FROM  agendasermao INNER JOIN igreja ON agendasermao.igreja = igreja.id INNER JOIN sermao ON agendasermao.sermao = sermao.id WHERE status = "'+ st +'"  ORDER BY agendasermao.data ');
		var dataArray = [];

	while (rows.isValidRow()) {
		var vsermao = rows.fieldByName('titulo');
		var vid = rows.fieldByName('id');
		var vigreja = rows.fieldByName('nome');
		var vdata = rows.fieldByName('data');
		var row = Ti.UI.createTableViewRow({
		backgroundColor : '#ECECEC',
		borderRadius : 15,
		//top:10,
		bottom : 10,
		id:vid
	});
	var label = Ti.UI.createLabel({
		top : 5,
		left : 10,
		font : {
			fontSize : 16,
			fontColor : '#336699',
			fontStyle : 'bold'
		},
		text : vsermao,
	});

	var label1 = Ti.UI.createLabel({
		top : 25,
		left : 10,
		font : {
			fontSize : 14
		},
		text : vigreja,
	});

	var label2 = Ti.UI.createLabel({
		font : {
			fontSize : 12,
			fontColor : '#336699'
		},
		top : 25,
		right : 60,
		text :vdata,
		id: vid,
	});

	var button = Ti.UI.createButton({
		right : 10,
		height : 30,
		width : 40,
		title : 'OK',
		borderColor : '#336699',
		borderRadius : 5

	});
	row.add(label);
	row.add(label1);
	row.add(label2);
	//row.add(button);
		
		dataArray.push(
			row
			
			);
		rows.next();
		table.setData(dataArray);
	};

};




// now assign that array to the table's data property to add those objects as rows
var table = Titanium.UI.createTableView({

});
table.addEventListener('click', function(e) {
//	alert();
table.deleteRow(e.row.row);
});

currentWin.addEventListener('focus', function() {
	
	setData();
	
});


// Create a Button.
var btnNovo = Titanium.UI.createButton({
	title : 'Novo',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});

// Listen for click events.
btnNovo.addEventListener('click', function() {
	var addIgreja = Titanium.UI.createWindow({
		title : 'Add Igrejas',
		url : 'add_igreja_agenda.js'
	});
	//gravarDistrito.idDist = idDist;
	Ti.UI.currentTab.open(addIgreja, {
		animated : true
	});
});



// Create a Button.
var btnNconcluido = Titanium.UI.createButton({
	title : 'Não Concluidos',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});

// Listen for click events.
btnNconcluido.addEventListener('click', function() {
	currentWin.rightNavButton = btnConcluido;
});
// Add to the parent view.
//parentView.add(aButton);
currentWin.leftNavButton = btnNovo;
currentWin.rightNavButton = btnConcluido;



currentWin.add(table);
setData();


