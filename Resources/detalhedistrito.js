//criando a tela
Ti.include("bd.js");
var currentWin = Ti.UI.currentWindow;
var os = Ti.Platform.osname;

//recebendo variavel do outro formulario
var idDist = Ti.UI.currentWindow.idDist;
Ti.include("mask.js");

//criando a função para ler os dados na tabela distrito
function setData() {
	var rows = db.execute('SELECT * FROM distrito WHERE id ="' + idDist + '"');
	var dataArray = [];
	while (rows.isValidRow()) {
		var tbRow = Ti.UI.createTableViewRow({
			backgroundColor : '#FFE0B0'
		});
		var tbRow1 = Ti.UI.createTableViewRow({
			backgroundColor : '#FFE0B0'
		});
		var tbRow2 = Ti.UI.createTableViewRow({
			backgroundColor : '#FFE0B0'
		});

		tbRow.add(Ti.UI.createLabel({
			text : rows.fieldByName('nome'),
			left : 10,
			height : 40,
			color : '#245553',
			font : {
				fontSize : 16
			}
		}));

		tbRow1.add(Ti.UI.createLabel({
			text : rows.fieldByName('pastor'),
			left : 10,
			height : 40,
			color : '#245553',
			font : {
				fontSize : 16
			}
		}));

		tbRow2.add(Ti.UI.createLabel({
			text : rows.fieldByName('fone'),
			left : 10,
			height : 40,
			color : '#245553',
			font : {
				fontSize : 16
			}
		}));

		dataArray.push(tbRow, tbRow1, tbRow2);
		rows.next();
		table.setData(dataArray);

	}

	return dataArray;

};

//criando a função para ler os dados na tabela de igreja
function setData1() {
	var rs = db.execute('SELECT * FROM igreja WHERE distrito ="' + idDist + '"ORDER by nome asc');
	var dataArray1 = [];

	while (rs.isValidRow()) {
		var vnome = rs.fieldByName('nome');
		var vid = rs.fieldByName('id');
		dataArray1.push({
			title : vnome,
			hasChild : true,
			id : vid,
			path : 'detalheigreja.js',
			color : '#245553',
			font : {
				fontSize : 16
			}
		});
		rs.next();
		tableview.setData(dataArray1);
	};

};
//criando um custom view para o titulo da tableview igrejas
var createCustomView = function(title) {
	var view = Ti.UI.createView({
		backgroundColor : '#808080',
		height : 30,
		width : 400

	});
	var text = Ti.UI.createLabel({
		text : title,
		left : 20,
		color : '#fff',
		font : {
			fontSize : 16
		}
	});
	view.add(text);
	return view;
};


//criando a table view igrejas
var tableview = Ti.UI.createTableView({
	filterAttribute : 'title',
	headerView : createCustomView('Lista de Igrejas'),
	top : '41%',
	bottom : '10%',
	backgroundColor : '#FFEFBF'
});

if (os == 'iphone') {
	var table = Ti.UI.createTableView({
		style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
		bottom : '60%',
		top : '1%',
		borderRadius : 5,
		scrollable : 'false',
		backgroundColor : '#FFEFBF'
	});
	tableview.addEventListener('click', function(e) {
		if (e.rowData.path) {
			var win = Ti.UI.createWindow({
				url : e.rowData.path,
				//title : e.rowData.title,
			});
			var idIgreja = e.rowData.id;
			win.idIgreja = idIgreja;
			Ti.UI.currentTab.open(win);
		}

	});
	var deletar = Titanium.UI.createButton({
		title : 'Excluir',

	});
	var btnEditDist = Titanium.UI.createButton({
		title : 'Editar'
	});

	flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	var novo = Titanium.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.CONTACT_ADD

	});

	novo.addEventListener('click', function(e) {
		var addIgreja = Titanium.UI.createWindow({
			url : 'form_igreja.js'
		});
		addIgreja.idDist = idDist;
		Ti.UI.currentTab.open(addIgreja, {
			animated : true
		});
	});
	//criando toolbar
	var toolbar = Titanium.UI.iOS.createToolbar({
		items : [deletar, flexSpace, flexSpace, flexSpace, novo],
		bottom : 0,
		borderTop : true,
		borderBottom : false
	});
	currentWin.add(toolbar);
	currentWin.rightNavButton = btnEditDist;

	btnEditDist.addEventListener('click', function(e) {

		var editDist = Titanium.UI.createWindow({
			url : 'edit_distrito.js'
		});
		editDist.idDist = idDist;
		Ti.UI.currentTab.open(editDist, {
			animated : true
		});

	});

} else {
	var table = Ti.UI.createTableView({
		bottom : '60%',
		top : 40,
		scrollable : 'false',
		backgroundColor : '#FFEFBF'
	});

	tableview.addEventListener('click', function(e) {
		if (e.rowData.path) {
			var win = Ti.UI.createWindow({
				url : e.rowData.path,
				backgroundColor : '#FFEFBF',
				modal : true
			});
			var idIgreja = e.rowData.id;
			win.idIgreja = idIgreja;
			win.open();
		}

	});
	var deletar = Titanium.UI.createButton({
		title : 'Excluir',
		bottom : 0,
		left : 10,
		height : 40,
		width : 80

	});
	var btnEditDist = Titanium.UI.createButton({
		title : 'Editar Distrito',
		top : 2,
		left : 0,
		height : 40,
		width : '100%'
	});

	var novo = Titanium.UI.createButton({
		title : 'Nova Igreja',
		bottom : 0,
		right : 0,
		height : 40,
		width : '100%'   
	});

	novo.addEventListener('click', function(e) {
		var addIgreja = Titanium.UI.createWindow({
			url : 'form_igreja.js',
			backgroundColor : '#FFEFBF',
			modal : true
		});
		addIgreja.idDist = idDist;
		addIgreja.open();

	});
	currentWin.add(novo);
	//currentWin.add(deletar);
	currentWin.add(btnEditDist);

	btnEditDist.addEventListener('click', function(e) {

		var editDist = Titanium.UI.createWindow({
			url : 'edit_distrito.js',
			backgroundColor : '#FFEFBF',
			modal : true
		});
		editDist.idDist = idDist;
		editDist.open();

	});

};

//fim
currentWin.addEventListener('focus', function() {
	setData();
	setData1();

});



//criando botoes

deletar.addEventListener('click', function(e) {
	if (e.source.title == "Excluir") {
		tableview.editable = false;
		//deactivate swipe-Delete button
		tableview.editing = true;
		//Edit:on
		tableview.editing = false;
		//Edit:off
		tableview.editing = true;
		//Edit:on again!
		e.source.title = "OK";
	} else {
		tableview.editable = true;
		//reactivate swipe-Delete button!
		tableview.editing = false;
		e.source.title = "Excluir";
	}

});
tableview.addEventListener('delete', function(e) {
	var rows = db.execute('DELETE FROM igreja WHERE id= "' + e.row.id + '"');

});

tableview.addEventListener('longclick', function(e) {

	if (os == 'android') {
		Ti.API.info(e.rowData.id);
		var delid = e.rowData.id;
		var dialog = Ti.UI.createOptionDialog({
			cancel : 2,
			options : ['Excluir', 'Cancelar'],
			title : 'Excluir registros?'
		});
		dialog.show();

		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				var rows = db.execute('DELETE FROM igreja  WHERE id= "' + delid + '"');
				setData();

			} else {

			};

		});
	} else {

	};

});
setData();
setData1();
currentWin.add(tableview);
currentWin.add(table);

