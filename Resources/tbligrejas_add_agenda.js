// create var for the currentWindow
var Win = Ti.UI.currentWindow;
Ti.include("bd.js");

//Ti.App.Properties.setString('vigreja', 'igreja');
//busca
var search = Titanium.UI.createSearchBar({
	barColor : '#000',
	showCancel : true,
	height : 43,
	top: 0
});

//currentWin.rightNavButton = deletar;
//currentWin.leftNavButton = send;
// set the data from the database to the array
function setData() {
	var rows = db.execute('SELECT * FROM igreja  GROUP BY nome ');
	var dataArray = [];

	while (rows.isValidRow()) {
		var vnome = rows.fieldByName('nome');
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
Win.addEventListener('blur', function(e){
Win.close();	
	
});

// create table view
var tableview = Ti.UI.createTableView({
	search : search,
	filterAttribute : 'title',
	borderRadius : 5,
	backgroundColor : '#FFEFBF'
});

tableview.addEventListener('click', function(e) {
	Ti.App.Properties.setString('vigreja', e.rowData.title);
	Ti.App.Properties.setString('vidigreja', e.rowData.id);
	Ti.API.info('The value of the givenName property is: ' + Ti.App.Properties.getString('vigreja'));
	Win.close();

});

// add the tableView to the current window
Win.add(tableview);
//currentWin.add(closeBtn);
// call the setData function to attach the database results to the array
setData();

