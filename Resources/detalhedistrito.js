//criando a tela
var currentWin = Ti.UI.currentWindow;
var osname = Ti.Platform.osname;
//recebendo variavel do outro formulario
var idDist = Ti.UI.currentWindow.idDist;
//criando a barra da busca
var search = Titanium.UI.createSearchBar({
	barColor : '#000',
	showCancel : true,
	height : 43,
	top : 0,
});

//criando a função para ler os dados na tabela distrito
function setData() {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rows = db.execute('SELECT * FROM distrito WHERE id ="' + idDist + '"');
	var dataArray = [];
	while (rows.isValidRow()) {
		var tbRow = Ti.UI.createTableViewRow({

		});
		var tbRow1 = Ti.UI.createTableViewRow({

		});

		var tbRow2 = Ti.UI.createTableViewRow({

		});

		tbRow.add(Ti.UI.createLabel({

			text :  rows.fieldByName('nome'),
			left : 10,
			height : 40,
			

		}));

		tbRow1.add(Ti.UI.createLabel({
			text : rows.fieldByName('pastor'),
			left : 10,
			height : 40
		}));

		tbRow2.add(Ti.UI.createLabel({
			text : rows.fieldByName('fone'),
			left : 10,
			height : 40
			
			

		}));

		dataArray.push(tbRow, tbRow1, tbRow2);
		rows.next();
		table.setData(dataArray);

	}
	
	return dataArray;

};

//criando a função para ler os dados na tabela de igreja
function setData1() {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rs = db.execute('SELECT * FROM igreja WHERE distrito ="' + idDist + '"ORDER by nome asc');
	var dataArray1 = [];

	while (rs.isValidRow()) {
		var vnome = rs.fieldByName('nome');
		var vid = rs.fieldByName('id');
		dataArray1.push({
			title : vnome,
			hasChild : true,
			id : vid,
			//backgroundColor: '#004C98',
			path : 'detalheigreja.js'
		});
		rs.next();
		tableview.setData(dataArray1);
	};

};

var table = Ti.UI.createTableView({
	style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
	bottom : '58%',
	top:'1%', 
	borderRadius : 5,
	scrollable : 'false'
});

var send = Titanium.UI.createButton({
	title : 'Editar',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});
send.addEventListener('click', function(e) {

	var gravarDistrito = Titanium.UI.createWindow({
		title : 'Cadastrar Distritos',
		url : 'edit_distrito.js'
	});
	gravarDistrito.idDist = idDist;
	Ti.UI.currentTab.open(gravarDistrito, {
		animated : true
	});

});

//fim

currentWin.addEventListener('focus', function() {
	setData();
	setData1();

});
//criando um custom view para o titulo da tableview igrejas
var createCustomView = function(title) {
	var view = Ti.UI.createView({
		backgroundColor: '#808080',
		height: 30
	});
	var text = Ti.UI.createLabel({
		text: title,
		left: 20,
		color: '#fff'
	});
	view.add(text);
	return view;
};

//criando a table view igrejas
var tableview = Ti.UI.createTableView({
	//style:Titanium.UI.iPhone.TableViewStyle.GROUPED
	search : search,
	filterAttribute : 'title',
	headerView: createCustomView('Lista de Igrejas'),
	top :'43%',
	bottom: '13%',
	borderRadius : 5
});

tableview.addEventListener('click', function(e) {
	if (e.rowData.path) {
		var win = Ti.UI.createWindow({
			url : e.rowData.path,
			title : e.rowData.title,
		
		});
		var idIgreja = e.rowData.id;
		win.idIgreja = idIgreja;
		Ti.UI.currentTab.open(win);
	}

});


//criando botoes
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
tableview.addEventListener('delete', function(e) {
	var db = Ti.Database.open('bd_sgs', 'bd_sgs');
	var rows = db.execute('DELETE FROM igreja WHERE id= "' + e.row.id + '"');

});

flexSpace = Titanium.UI.createButton({
    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
var novo = Titanium.UI.createButton({
	title : 'Nova Igreja',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
	
});
novo.addEventListener('click', function(e) {


	var gravarDistrito = Titanium.UI.createWindow({
		title : 'Cadastrar Igrejas',
		url : 'form_igreja.js',
	
	});
	gravarDistrito.idDist = idDist;
	Ti.UI.currentTab.open(gravarDistrito, {
		animated : true
	});

});

//criando toolbar
var toolbar = Titanium.UI.iOS.createToolbar({
    items:[deletar, flexSpace, flexSpace, flexSpace, novo],
    bottom:0,
    borderTop:true,
    borderBottom:false
}); 
currentWin.add(toolbar);

currentWin.rightNavButton = send;
setData();
setData1();
currentWin.add(tableview);
currentWin.add(table);

