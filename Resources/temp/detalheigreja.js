	// create var for the currentWindow
	var currentWin = Ti.UI.currentWindow;
	var db = Ti.Database.install('sgs2','sgs2');
	//var nome = Ti.UI.currentWindow.nome;
	var rows = db.execute('SELECT * FROM distrito ');
	
	function setData() {
	var db = Ti.Database.install('sgs2', 'sgs2');
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
	var tableview = Ti.UI.createTableView({
	
	});
	
	
	currentWin.add(tableview);
setData();