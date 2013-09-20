// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
var idSermao = Ti.UI.currentWindow.idSermao;
//busca
var search = Titanium.UI.createSearchBar({
	barColor : '#245553',
	showCancel : true,
	height : 43,
	top : 0,
});
//var busca = search.value;

//currentWin.add(search);


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
//currentWin.leftNavButton = send;
// set the data from the database to the array
function setData() {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rows = db.execute('SELECT pregacao.id, pregacao.igreja, igreja.nome FROM  pregacao INNER JOIN igreja ON pregacao.igreja = igreja.id WHERE pregacao.sermao ="' + idSermao + '" ORDER BY igreja.nome');
	
	
	//var rows = db.execute('SELECT * FROM  pregacao WHERE sermao ="' + idSermao + '"');
	var dataArray = [];

	while (rows.isValidRow()) {
		var vnome = rows.fieldByName('nome');
		var vid = rows.fieldByName('id');
		dataArray.push({
			title : vnome,
			//hasChild : true,
			id : vid,
			path : 'detalhedistrito.js'
		});
		rows.next();
		tableview.setData(dataArray);
	};

};

// create table view
var tableview = Ti.UI.createTableView({
	search : search,
	filterAttribute : 'title',
	borderRadius :5
});

currentWin.addEventListener('focus', function() {
	setData();
});


//deletar
tableview.addEventListener('delete', function(e) {
	var db = Ti.Database.open('bd_sgs', 'bd_sgs');
	var rows = db.execute('DELETE FROM pregacao WHERE id= "' + e.row.id + '"');

	//var rows = db.execute('DELETE FROM distrito WHERE nome="' + nomeDist +'"');

});

// add the tableView to the current window
currentWin.add(tableview);
// call the setData function to attach the database results to the array
setData();

