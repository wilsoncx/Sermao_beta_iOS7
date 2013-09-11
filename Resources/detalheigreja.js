Ti.include("mask.js");
// create var for the currentWindow
var currentWin = Ti.UI.currentWindow;
var idIgreja = Ti.UI.currentWindow.idIgreja;

//buscaet the data from the database to the array

function setData() {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rows = db.execute('SELECT * FROM igreja WHERE  id ="' + idIgreja + '"ORDER by nome asc');
	var dataArray = [];
    
	while (rows.isValidRow()) {
		var tbRow = Ti.UI.createTableViewRow({

		});
		var tbRow1 = Ti.UI.createTableViewRow({

		});

		var tbRow2 = Ti.UI.createTableViewRow({

		});

		var tbRow3 = Ti.UI.createTableViewRow({

		});

		tbRow.add(Ti.UI.createLabel({

			text : rows.fieldByName('nome'),
			left : 10,
			height : 40,

		}));

		tbRow1.add(Ti.UI.createLabel({
			text : rows.fieldByName('endereco'),
			left : 10,
			height : 40
			
		}));

		tbRow2.add(Ti.UI.createLabel({
			text : rows.fieldByName('contato'),
			left : 10,
			height : 40

		}));

		tbRow3.add(Ti.UI.createLabel({
			text : rows.fieldByName('fone'),
			left : 10,
			height : 40,
			

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
var table = Ti.UI.createTableView({
	style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
	bottom : '1%',
	top : '1%',
	borderRadius : 5,
	scrollable : 'false'
});

var editar = Titanium.UI.createButton({
	title : 'Editar',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});
editar.addEventListener('click', function(e) {

	var gravarDistrito = Titanium.UI.createWindow({
		title : 'Editar Igreja',
		url : 'edit_igreja.js'
	});
	gravarDistrito.idIgreja = idIgreja;
	Ti.UI.currentTab.open(gravarDistrito, {
		animated : true
	});

});

//currentWin.rightNavButton = send;
setData();
currentWin.add(table);
currentWin.rightNavButton = editar;
//currentWin.add(table);

