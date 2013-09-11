// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
//busca
var search = Titanium.UI.createSearchBar({
	barColor : '#000',
	showCancel : true,
	height : 43,
	top : 0,
});
var busca = search.value;

//currentWin.add(search);

var send = Titanium.UI.createButton({
	title : 'Novo',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});
send.addEventListener('click', function(e) {

	var gravarDistrito = Titanium.UI.createWindow({
		title : 'Cadastrar Distritos',
		url : 'form_distrito.js'
	});
	Ti.UI.currentTab.open(gravarDistrito, {
		animated : true
	});

});

var deletar = Titanium.UI.createButton({
	title : 'Editar',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});
deletar.addEventListener('click', function(e) {
	if (e.source.title == "Editar") {
		tableview.editable = false;
		//deactivate swipe-Delete button
		tableview.editing = true;
		//Edit:on
		tableview.editing = false;
		//Edit:off
		tableview.editing = true;
		//Edit:on again!
		e.source.title = "Done";
	} else {
		tableview.editable = true;
		//reactivate swipe-Delete button!
		tableview.editing = false;
		e.source.title = "Editar";
	}

});

currentWin.rightNavButton = deletar;
currentWin.leftNavButton = send;
// set the data from the database to the array
function setData() {
	var db = Ti.Database.install('bdscs', 'bdscs');
	var rows = db.execute('SELECT * FROM distrito  GROUP BY nome ');
	var dataArray = [];
	
	while (rows.isValidRow()) {
		var vnome = rows.fieldByName('nome');
		var vid = rows.fieldByName('id');
		dataArray.push({
			title : vnome,
			hasChild : true,
			id : vid,
			path : 'detalhedistrito.js'
		});
		rows.next();
		tableview.setData(dataArray);
	};

};

// create table view
var tableview = Ti.UI.createTableView({
	//height : '90%',
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	search : search,
	filterAttribute : 'filter'

});

currentWin.addEventListener('focus', function() {
	setData();
});

tableview.addEventListener('click', function(e) {
	if (e.rowData.path) {
		var win = Ti.UI.createWindow({
			url : e.rowData.path,
			title : e.rowData.title
		});
		var nomeDist = e.rowData.title;
		win.nomeDist = nomeDist;
		Ti.UI.currentTab.open(win);
	}

});

//deletar
tableview.addEventListener('delete', function(e) {

	//var nomeDist = e.rowData.id;
	//Ti.API.info(nomeDist);

	var db = Ti.Database.open('bdscs', 'bdscs');
	var rows = db.execute('DELETE FROM distrito WHERE id= "' + e.row.id + '"');

	//var rows = db.execute('DELETE FROM distrito WHERE nome="' + nomeDist +'"');

});

// add the tableView to the current window
currentWin.add(tableview);
// call the setData function to attach the database results to the array
setData();

