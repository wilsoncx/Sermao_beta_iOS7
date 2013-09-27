// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
var idSermao = Ti.UI.currentWindow.idSermao;
//busca
var search = Titanium.UI.createSearchBar({
	backgroundColor : '#FFEFBF',
	barColor : '#245553',
	showCancel : true,
	height : 43,
	top : 0,
});

var deletar = Titanium.UI.createButton({
	title : 'Excluir'
});
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

currentWin.rightNavButton = deletar;
//currentWin.leftNavButton = send;
// set the data from the database to the array
function setData() {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rows = db.execute('SELECT agendasermao.id, agendasermao.igreja, igreja.nome FROM  agendasermao INNER JOIN igreja ON agendasermao.igreja = igreja.id WHERE agendasermao.sermao ="' + idSermao + '" and status = "i"  ORDER BY igreja.nome');
	var dataArray = [];

	while (rows.isValidRow()) {
		var vnome = rows.fieldByName('nome');
		var vid = rows.fieldByName('id');
		dataArray.push({
			title : vnome,
			//hasChild : true,
			id : vid,
			path : 'detalhedistrito.js',
			color : '#245553',
			font : {
				fontSize : 16,
			}
		});
		rows.next();
		tableview.setData(dataArray);
	};
};

// create table view
var tableview = Ti.UI.createTableView({
	search : search,
	filterAttribute : 'title',
	borderRadius : 5,
	backgroundColor : '#FFEFBF'
});

currentWin.addEventListener('focus', function() {
	setData();
});

//deletar
tableview.addEventListener('delete', function(e) {
	var db = Ti.Database.open('bd_sgs', 'bd_sgs');
	var rows = db.execute('DELETE FROM agendasermao WHERE id= "' + e.row.id + '"');
});

// add the tableView to the current window
currentWin.add(tableview);
// call the setData function to attach the database results to the array
setData();

