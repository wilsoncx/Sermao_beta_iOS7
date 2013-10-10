Ti.include("mask.js");
var os = Ti.Platform.osname;
Ti.include("bd.js");


// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
var idIgreja = Ti.UI.currentWindow.idIgreja;
function setData() {
	var rows = db.execute('SELECT * FROM igreja WHERE  id ="' + idIgreja + '"ORDER by nome asc');
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
		var tbRow3 = Ti.UI.createTableViewRow({
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
			text : rows.fieldByName('endereco'),
			left : 10,
			height : 40,
			color : '#245553',
			font : {
				fontSize : 16
			},

		}));

		tbRow2.add(Ti.UI.createLabel({
			text : rows.fieldByName('contato'),
			left : 10,
			height : 40,
			color : '#245553',
			font : {
				fontSize : 16
			}

		}));

		tbRow3.add(Ti.UI.createLabel({
			text : rows.fieldByName('fone'),
			left : 10,
			height : 40,
			color : '#245553',
			font : {
				fontSize : 16
			}

		}));

		dataArray.push(tbRow, tbRow1, tbRow2, tbRow3);
		rows.next();
		table.setData(dataArray);

	}

	return dataArray;

};

currentWin.addEventListener('focus', function() {
	setData();

});

var createCustomView = function(title) {
	var view = Ti.UI.createView({
		backgroundColor : '#808080',
		height : 40
	});
	var text = Ti.UI.createLabel({
		text : title,
		left : 20,
		color : '#fff'
	});
	view.add(text);
	return view;
};

if (os == 'iphone') {
	var table = Ti.UI.createTableView({
		style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
		bottom : '1%',
		top : '1%',
		borderRadius : 5,
		scrollable : 'false',
		backgroundColor : '#FFEFBF'
	});
	var btnEditarIgreja = Titanium.UI.createButton({
		title : 'Editar'

	});
	btnEditarIgreja.addEventListener('click', function(e) {

		var editIgreja = Titanium.UI.createWindow({
			url : 'edit_igreja.js'
		});
		editIgreja.idIgreja = idIgreja;
		Ti.UI.currentTab.open(editIgreja, {
			animated : true
		});

	});

	currentWin.rightNavButton = btnEditarIgreja;

} else {

	var table = Ti.UI.createTableView({
		bottom : '40%',
		top : '1%',
		borderRadius : 5,
		scrollable : 'false',
		backgroundColor : '#FFEFBF'
	});
	var btnEditarIgreja = Titanium.UI.createButton({
		title : 'Editar',
		bottom : '30%',
		left : '5%',
		height : 40,
		width : '90%'
	});
	btnEditarIgreja.addEventListener('click', function(e) {

		var editIgreja = Titanium.UI.createWindow({
			url : 'edit_igreja.js',
			backgroundColor : '#FFEFBF',
			modal : true
		});
		editIgreja.idIgreja = idIgreja;
		editIgreja.open();

	});
	currentWin.add(btnEditarIgreja);

};

setData();
currentWin.add(table);
