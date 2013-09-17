// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
var idSermao = Ti.UI.currentWindow.idSermao;
//busca
var search = Titanium.UI.createSearchBar({
	barColor : '#000',
	showCancel : true,
	height : 43,
	top : 0,
});
//var busca = search.value;

//currentWin.add(search);

// set the data from the database to the array
function setData() {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rows = db.execute('SELECT * FROM igreja where  igreja.id  NOT IN (SELECT pregacao.igreja FROM igreja INNER JOIN pregacao ON igreja.id = pregacao.igreja WHERE pregacao.sermao ="' + idSermao + '") ');
	var dataArray = [];
	while (rows.isValidRow()) {
		var vnome = rows.fieldByName('nome');
		var vid = rows.fieldByName('id');
		dataArray.push({
			title : vnome,
			hasCheck : false,
			id : vid,
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
	var igreja = e.row.id;
	var db1 = Ti.Database.install('bd_sgs', 'bd_sgs');
	db1.execute('INSERT INTO pregacao (igreja, sermao) VALUES("' + igreja + '","' + idSermao + '")');
	tableview.deleteRow(e.row.row);

});

// add the tableView to the current window
currentWin.add(tableview);
// call the setData function to attach the database results to the array
setData();

