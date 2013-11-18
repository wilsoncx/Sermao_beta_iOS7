//*********************************
//*tela principal do sistema aonde*
//*aparece a lista de pregações   *
//*agendadas com horario e igreja *
//*********************************
Ti.include("bd.js");
var currentWin = Ti.UI.currentWindow;
var st = 'a';
var os = Titanium.Platform.osname;
Ti.API.info(os);
function setData() {
	var db = Ti.Database.open('bd_sgs.db');
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
		if (os == 'android') {
		var labelTitleSermao = Ti.UI.createLabel({
			top : '5dp',
			left : '10dp',
			font : {
				fontSize : 30,
			},
			color : '#1A87FB',
			text : 'Sermão ',
		});
		var label = Ti.UI.createLabel({
			top : '5dp',
			left : '63dp',
			font : {
				fontSize : 30,
			},
			color : '#245553',
			text : '| ' + vsermao,
		});

		var labelTitleIgreja = Ti.UI.createLabel({
			top : '25dp',
			left : '10dp',

			font : {
				fontSize : 30,
			},
			color : '#1A87FB',
			text : 'Igreja ',
		});
		var label1 = Ti.UI.createLabel({
			top : '25dp',
			font : {
				fontSize : 30,
			},
			left : '63dp',
			color : '#245553',
			text : '| ' + vigreja,
		});
		var labelTitleData = Ti.UI.createLabel({
			top : '45dp',
			left : '10dp',
			font : {
				fontSize : 30,
			},
			color : '#1A87FB',
			text : 'Data ',
		});

		var label2 = Ti.UI.createLabel({
			color : '#245553',
			font : {
				fontSize : 30,
			},
			top : '45dp',
			left : '63dp',
			text : '| ' + vdata,
			id : vid,
		});
		}
		else
		{
			var labelTitleSermao = Ti.UI.createLabel({
			top : 5,
			left : 10,
			color : '#1A87FB',
			text : 'Sermão ',
				font : {
				fontSize : 16,
			}

		});
		var label = Ti.UI.createLabel({
			top : 5,
			left : 70,
			color : '#245553',
			text : '| ' + vsermao,
			font : {
				fontSize : 16,
			}
		});

		var labelTitleIgreja = Ti.UI.createLabel({
			top : 25,
			left : 10,
			color : '#1A87FB',
			text : 'Igreja ',
			font : {
				fontSize : 16,
			}
		});
		var label1 = Ti.UI.createLabel({
			top : 25,
			left : 70,
			color : '#245553',
			text : '| ' + vigreja,
			font : {
				fontSize : 16,
			}
		});
		var labelTitleData = Ti.UI.createLabel({
			top : 45,
			left : 10,
			color : '#1A87FB',
			text : 'Data ',
			font : {
				fontSize : 16,
			}
		});

		var label2 = Ti.UI.createLabel({
			color : '#245553',
			top : 45,
			left : 70,
			text : '| ' + vdata,
			id : vid,
			font : {
				fontSize : 16
			}
		});
		};
		
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
		row.addEventListener('longclick', function(e) {

			if (os == 'android') {
				var delid = e.rowData.id;
				var dialog = Ti.UI.createOptionDialog({
					cancel : 2,
					options : ['Conclui', 'Excluir', 'Cancelar'],
					title : 'Editar registros?'
				});
				dialog.show();

				dialog.addEventListener('click', function(e) {
					if (e.index == 1) {
						var rows = db.execute('DELETE FROM agendasermao WHERE id= "' + delid + '"');
						setData();
					} else if (e.index == 0) {
						db.execute('UPDATE agendasermao SET status = "i" WHERE id = "' + delid + '"');
						setData();

					} else {

					};
					

				});
			} else {

			};

		});

		dataArray.push(row);
		rows.next();
		table.setData(dataArray);
	};

};

//Create a Button.

if (os == 'iphone') {

	var table = Titanium.UI.createTableView({
		backgroundColor : '#FFEFBF'
	});

	var btnNovo = Titanium.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.CONTACT_ADD,
		font : {
			fontSize : 40
		}

	});

	var btnconcluido = Titanium.UI.createButton({
		title : 'Concluidos',

	});
	currentWin.leftNavButton = btnconcluido;
	currentWin.rightNavButton = btnNovo;
} else {

	var table = Titanium.UI.createTableView({
		backgroundColor : '#FFEFBF',
		bottom : '50dp'
	});

	var btnNovo = Titanium.UI.createButton({
		title : 'Novo',
		bottom : 0,
		right : 0,
		height : '40dp',
		width : '150dp'
	});

	var btnconcluido = Titanium.UI.createButton({
		title : 'Concluidos',
		bottom : 0,
		left : 0,
		height : '40dp',
		width : '150dp'

	});

	currentWin.add(btnNovo);
	currentWin.add(btnconcluido);
};

table.addEventListener('click', function(e) {
	var rowid = e.row.id;
	var db1 = Ti.Database.open('bd_sgs.db');
	//e.row.row = e.row.id;
	db1.execute('UPDATE agendasermao SET status = "i" WHERE id = "' + rowid + '"');
	table.deleteRow(e.row.row);
	Ti.API.info(e.row.row);

});

currentWin.addEventListener('focus', function() {
	setData();
});

// Listen for click events.
btnNovo.addEventListener('click', function() { fontFamily:'Marker felt';
	if (os == 'iphone') {
		var addIgreja = Titanium.UI.createWindow({
			url : 'add_igreja_agenda.js'
		});
		addIgreja.idSermao = false;
		addIgreja.ig = false;
		addIgreja.se = false;
		Ti.UI.currentTab.open(addIgreja, {
			animated : true
		});

	} else {
		var addIgreja = Titanium.UI.createWindow({
			url : 'add_igreja_agenda.js',
			backgroundColor : '#FFEFBF',
			modal : true,
			bottom : 55

		});
		addIgreja.idSermao = false;
		addIgreja.ig = false;
		addIgreja.se = false;
		addIgreja.open();
	};

});

// Create a Button.

// Listen for click events.
btnconcluido.addEventListener('click', function(e) {
	//db.close();
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
	var rows = db.execute('DELETE FROM agendasermao WHERE id= "' + e.row.id + '"');
});

currentWin.add(table);
setData();

