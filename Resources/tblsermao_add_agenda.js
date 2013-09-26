// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;

//Ti.App.Properties.setString('vigreja', 'igreja');
//busca
var search = Titanium.UI.createSearchBar({
	barColor : '#000',
	showCancel : true,
	height : 43,
	top : 0
});

//currentWin.rightNavButton = deletar;
//currentWin.leftNavButton = send;
// set the data from the database to the array
function setData() {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rows = db.execute('SELECT * FROM sermao  GROUP BY titulo ');
	var dataArray = [];

	while (rows.isValidRow()) {
		var vnome = rows.fieldByName('titulo');
		var vid = rows.fieldByName('id');
		dataArray.push({
			title : vnome,
			hasCheck : false,
			id : vid,
			color : '#245553',
			font : {
				fontSize : 16
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
	borderRadius : 0,
	backgroundColor : '#FFEFBF'
});

tableview.addEventListener('click', function(e) {
	Ti.App.Properties.setString('visermao', e.rowData.title);
	Ti.App.Properties.setString('vidsermao', e.rowData.id);
	Ti.API.info('The value of the givenName property is: ' + Ti.App.Properties.getString('visermao'));
	currentWin.close();

});

// add the tableView to the current window
currentWin.add(tableview);
// call the setData function to attach the database results to the array
setData();

