//*********************************
//*tela principal do sistema aonde*
//*aparece a lista de pregações   *
//*agendadas com horario e igreja *
//*********************************

// Create an array of explicitly defined custom TableViewRows
Ti.include("bd.js");
var currentWin = Ti.UI.currentWindow;
var os = Titanium.Platform.osname;
var st = 'i';
Ti.API.info(st);
function setData() {

	var rows = db.execute('SELECT agendasermao.id, agendasermao.igreja, agendasermao.sermao, agendasermao.data, igreja.nome, sermao.titulo FROM  agendasermao INNER JOIN igreja ON agendasermao.igreja = igreja.id INNER JOIN sermao ON agendasermao.sermao = sermao.id WHERE status = "' + st + '"  ORDER BY agendasermao.data DESC');
	var dataArray = [];
	while (rows.isValidRow()) {
		var vsermao = rows.fieldByName('titulo');
		var vid = rows.fieldByName('id');
		var vigreja = rows.fieldByName('nome');
		var vdata = rows.fieldByName('data');
		var row = Ti.UI.createTableViewRow({

			borderRadius : 15,

			//top:10,
			bottom : 10,
			id : vid
		});
		var labelTitleSermao = Ti.UI.createLabel({
			//backgroundLeftCap :'1px',
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
			//backgroundLeftCap :'1px',
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
				//fontFamily : 'Marker felt',
			},
			top : 45,
			left : 60,
			text : '| ' + vdata,
			id : vid,
		});

		var button = Ti.UI.createButton({
			right : 10,
			height : 30,
			width : 40,
			title : 'OK',
			borderColor : '#336699',
			borderRadius : 15

		});
		button.addEventListener('click', function(e) {

		});

		row.add(labelTitleData);
		row.add(labelTitleIgreja);
		row.add(labelTitleSermao);
		row.add(label);
		row.add(label1);
		row.add(label2);
		//row.add(button);
		row.addEventListener('swipe', function(e) {
			if (e.direction == 'right') {
				table.editing = true;

				//Edit:on
				table.editing = false;
				//Edit:off
				table.editing = true;
				//Edit:on again!
				currentWin.rightNavButton = btnDone;

			};
			row.addEventListener('longclick', function(e) {

				if (os == 'android') {
					Ti.API.info(e.rowData.id);
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
							db.execute('UPDATE agendasermao SET status = "a" WHERE id = "' + delid + '"');
							setData();

						} else {

						}
						;

					});
				} else {

				};

			});

		});

		dataArray.push(row);
		rows.next();
		table.setData(dataArray);
	};

};

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

	var btnNconcluido = Titanium.UI.createButton({
		title : 'Não Concluidos',

	});
	currentWin.leftNavButton = btnNconcluido;
	currentWin.rightNavButton = btnNovo;
} else {

	var table = Titanium.UI.createTableView({
		backgroundColor : '#FFEFBF',
		bottom : 55
	});

	var btnNovo = Titanium.UI.createButton({
		//systemButton : Ti.UI.iPhone.SystemButton.CONTACT_ADD,
		title : 'Novo',
		font : {
			fontSize : 16
		},
		bottom : 0,
		right : 0,
		height : 40,
		width : '50%'

	});

	var btnNconcluido = Titanium.UI.createButton({
		title : 'Não Concluidos',
		bottom : 0,
		left : 0,
		height : 40,
		width : '50%'

	});

	currentWin.add(btnNovo);
	currentWin.add(btnNconcluido);
};

table.addEventListener('click', function(e) {
	var rowid = e.row.id;
	var db1 = Ti.Database.open('bd_sgs.db');
	db1.execute('UPDATE agendasermao SET status = "a" WHERE id = "' + rowid + '"');
	table.deleteRow(e.rowData.row);
	Ti.API.info(e.row.id);
});

currentWin.addEventListener('focus', function() {
	//setData();

});

// Listen for click events.
btnNovo.addEventListener('click', function() {
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

// Listen for click events.
btnNconcluido.addEventListener('click', function(e) {
	if (os == 'iphone') {

		var listConc = Titanium.UI.createWindow({
			url : 'tela_principal.js'

		});
		Ti.UI.currentTab.open(listConc, {
			animated : true
		});
	} else {
		currentWin.close();

	};

});

//deletar{}

var btnDone = Titanium.UI.createButton({
	systemButton : Ti.UI.iPhone.SystemButton.DONE,
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

	//var rows = db.execute('DELETE FROM distrito WHERE nome="' + nomeDist +'"');

});

currentWin.add(table);
setData();

