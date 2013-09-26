//*********************************
//*tela principal do sistema aonde*
//*aparece a lista de pregações   *
//*agendadas com horario e igreja *
//*********************************

var currentWin = Ti.UI.currentWindow;
var st = 'a';
function setData() {

	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rows = db.execute('SELECT agendasermao.id, agendasermao.igreja, agendasermao.sermao, agendasermao.data, igreja.nome, sermao.titulo FROM  agendasermao INNER JOIN igreja ON agendasermao.igreja = igreja.id INNER JOIN sermao ON agendasermao.sermao = sermao.id WHERE status = "' + st + '"  ORDER BY agendasermao.data DESC');
	var dataArray = [];

	while (rows.isValidRow()) {
		var vsermao = rows.fieldByName('titulo');
		var vid = rows.fieldByName('id');
		var vigreja = rows.fieldByName('nome');
		var vdata = rows.fieldByName('data');
		var row = Ti.UI.createTableViewRow({
			borderRadius : 15,
			bottom : 10,
			id : vid
		});
		var labelTitleSermao = Ti.UI.createLabel({
			top : 5,
			left : 10,
			color : '#1A87FB',
			font : {
				fontSize : 12
			},
			text : 'Sermão ',
		});
		var label = Ti.UI.createLabel({
			top : 5,
			left : 60,
			color : '#245553',
			font : {
				fontSize : 16
			},
			text : '| ' + vsermao,
		});

		var labelTitleIgreja = Ti.UI.createLabel({
			top : 25,
			left : 10,
			color : '#1A87FB',
			font : {
				fontSize : 12
			},
			text : 'Igreja ',
		});
		var label1 = Ti.UI.createLabel({
			top : 25,
			left : 60,
			color : '#245553',
			font : {
				fontSize : 12
			},
			text : '| ' + vigreja,
		});
		var labelTitleData = Ti.UI.createLabel({
			top : 45,
			left : 10,
			color : '#1A87FB',
			font : {
				fontSize : 12
			},
			text : 'Data ',
		});

		var label2 = Ti.UI.createLabel({
			color : '#245553',
			font : {
				fontSize : 12,
			},
			top : 45,
			left : 60,
			text : '| ' + vdata,
			id : vid,
		});
		row.add(labelTitleData);
		row.add(labelTitleIgreja);
		row.add(labelTitleSermao);
		row.add(label);
		row.add(label1);
		row.add(label2);
		row.addEventListener('swipe', function(e) {
			if (e.direction == 'right') {
				table.editing = true;
				//Edit:on
				table.editing = false;
				//Edit:off
				table.editing = true;
				//Edit:on again!
				currentWin.rightNavButton = btnDone;
			} 
			

		});

		dataArray.push(row);
		rows.next();
		table.setData(dataArray);

	};

};

var table = Titanium.UI.createTableView({
	backgroundColor : '#FFEFBF'
});

table.addEventListener('dblclick', function(e) {
	var rowid = e.row.id;
	var db1 = Ti.Database.install('bd_sgs', 'bd_sgs');
	db1.execute('UPDATE agendasermao SET status = "i" WHERE id = "' + rowid + '"');
	table.deleteRow(e.row.row);
	db1.close();

});

currentWin.addEventListener('focus', function() {

	setData();

});

// Create a Button.
var btnNovo = Titanium.UI.createButton({
	systemButton : Ti.UI.iPhone.SystemButton.CONTACT_ADD,
	font : {
		fontSize : 40
	}

});

// Listen for click events.
btnNovo.addEventListener('click', function() { fontFamily:'Marker felt';
	var addIgreja = Titanium.UI.createWindow({
		url : 'add_igreja_agenda.js'
	});
	addIgreja.idSermao = false;
	addIgreja.ig = false;
	addIgreja.se = false;
	Ti.UI.currentTab.open(addIgreja, {
		animated : true
	});

});

// Create a Button.
var btnconcluido = Titanium.UI.createButton({
	title : 'Concluidos',

});

// Listen for click events.
btnconcluido.addEventListener('click', function(e) {
	var listConc = Titanium.UI.createWindow({
		url : 'agenda_lista_concluido.js'

	});
	Ti.UI.currentTab.open(listConc, {
		animated : true
	});
});

//deletar registro
var btnDone = Titanium.UI.createButton({
	title : 'OK',
	font : {
		fontSize : 40
	}

});

// Listen for click events.
btnDone.addEventListener('click', function(e) {
	table.editing = false;
	currentWin.rightNavButton = btnNovo;

});

table.addEventListener('delete', function(e) {
	var db = Ti.Database.open('bd_sgs', 'bd_sgs');
	var rows = db.execute('DELETE FROM agendasermao WHERE id= "' + e.row.id + '"');
});

currentWin.leftNavButton = btnconcluido;
currentWin.rightNavButton = btnNovo;
currentWin.add(table);
setData();

