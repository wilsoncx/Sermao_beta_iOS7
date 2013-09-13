// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
var idSermao = Ti.UI.currentWindow.idSermao;
var a = [];
//busca
var search = Titanium.UI.createSearchBar({
	barColor : '#000',
	showCancel : true,
	height : 43,
	top : 0,
});
//var busca = search.value;

//currentWin.add(search);

var send = Titanium.UI.createButton({
	title : 'Add',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});
send.addEventListener('click', function(e) {

	
	
	for (var l = 0; l < a.length; l++) {
		var igreja = a[l];
		console.log(igreja);
		var db1 = Ti.Database.install('bd_sgs', 'bd_sgs');
		db1.execute('INSERT INTO pregacao (igreja, sermao) VALUES("' + igreja + '","' + idSermao + '")');
		
	}
	alert("Registro inserido");
	e.rowData.hasCheck = false;

});

currentWin.leftNavButton = send;
// set the data from the database to the array
function setData() {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rows = db.execute('SELECT * FROM igreja  GROUP BY nome ');
	
	var dataArray = [];


	while (rows.isValidRow()) {
		var vnome = rows.fieldByName('nome');
		var vid = rows.fieldByName('id');
		dataArray.push({
			title : vnome,
			hasCheck : false,
			id : vid,
			//path : 'detalhedistrito.js'
		});

		rows.next();
		tableview.setData(dataArray);
	};
	db.close();
};

// create table view
var tableview = Ti.UI.createTableView({
	search : search,
	filterAttribute : 'title',
	borderRadius : 5
});

currentWin.addEventListener('focus', function() {
	setData();

});

tableview.addEventListener('click', function(e) {

	var ar = a;
	if (e.rowData.hasCheck) {
		e.rowData.hasCheck = false;
		Ti.API.info("unchecked");
	} else {
		e.rowData.hasCheck = true;
		// Ti.API.info("checked");

		ar.push(e.row.id);
		for (var i = 0; i < ar.length; i++) {
			console.log(ar[i]);
		}
	}

	// a = ar;

});

// add the tableView to the current window
currentWin.add(tableview);
// call the setData function to attach the database results to the array
setData();

