// create var for the currentWindow
	var currentWin = Ti.UI.currentWindow;
	var nomeDist = Ti.UI.currentWindow.nomeDist;  
	// set the data from the database to the array
	function setData() {
			var db = Ti.Database.install('bdscs','bdscs');
			var rows = db.execute('SELECT * FROM igreja WHERE distrito ="' + nomeDist + '"');
			var dataArray = [];
	while (rows.isValidRow())
	{
	    dataArray.push({title:'' + rows.fieldByName('nome') + '', hasChild:true, path:'detalheigreja.js'});
	    rows.next();
	    tableview.setData(dataArray);
	};

	};
	// create table view
	var tableview = Ti.UI.createTableView({
	});
	tableview.addEventListener('click', function(e)
	{
		if (e.rowData.path)
		{
			var win = Ti.UI.createWindow({
				url:e.rowData.path,
				title:e.rowData.title
			});
			var nomeIgreja = e.rowData.title;
			win.nomeIgreja = nomeIgreja;
			Ti.UI.currentTab.open(win);
		}
		
	});
	// add the tableView to the current window
	currentWin.add(tableview);
	// call the setData function to attach the database results to the array
	setData();
