//criando a tela
var currentWin = Ti.UI.currentWindow;
var osname = Ti.Platform.osname;
//recebendo variavel do outro formulario
var idSermao = Ti.UI.currentWindow.idSermao;
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
	var rows = db.execute('SELECT * FROM sermao WHERE id ="' + idSermao + '"');
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

		tbRow.add(Ti.UI.createLabel({

			text : rows.fieldByName('titulo'),
			left : 10,
			height : 40,
			color : '#245553',
			font : {
				fontSize : 16,
				fontFamily : 'Marker felt'
			}

		}));

		tbRow1.add(Ti.UI.createLabel({
			text : rows.fieldByName('tema'),
			left : 10,
			height : 40,
			color : '#245553',
			font : {
				fontSize : 16,
				fontFamily : 'Marker felt'
			}

		}));

		tbRow2.add(Ti.UI.createLabel({
			text : rows.fieldByName('detalhes'),
			height : 50,
			//width:250,
			bottom : 150,
			color : '#245553',
			left : 10,
			textAlign : 'left',
			font : {
				fontSize : 16,
				fontFamily : 'Marker felt'
			}
		}));

		dataArray.push(tbRow, tbRow1, tbRow2);
		rows.next();
		table.setData(dataArray);

	}

	return dataArray;

};

var table = Ti.UI.createTableView({
	style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
	bottom : '12%',
	top : '1%',
	borderRadius : 5,
	scrollable : 'false',
	backgroundColor : '#FFEFBF'
});

var editSermao = Titanium.UI.createButton({
	title : 'Editar'

});
var titleEditSermao = Titanium.UI.createLabel({
	color : '#245553',
	height : 18,
	width : 210,
	top : 10,
	text : 'Editar Sermão',
	textAlign : 'center',
	font : {
		fontSize : 16,
		fontFamily : 'Marker felt'
	}
});
editSermao.addEventListener('click', function(e) {

	var editSermoes = Titanium.UI.createWindow({
		//title : 'Cadastrar Sermões',
		url : 'edit_sermao.js'
	});
	editSermoes.setTitleControl(titleEditSermao);
	editSermoes.idSermao = idSermao;
	Ti.UI.currentTab.open(editSermoes, {
		animated : true
	});

});

//fim

currentWin.addEventListener('focus', function() {
	setData();
	//setData1();

});

//criando botoes de adicionar e ver igrejas

flexSpace = Titanium.UI.createButton({
	systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});

var add_igreja = Titanium.UI.createButton({
	title : 'adicionar Igreja'

});

add_igreja.addEventListener('click', function(e) {

	var addIgreja = Titanium.UI.createWindow({
		title : 'Adicionar Igrejas',
		url : 'add_igreja_agenda.js',
		//win.idSermao = idSermao;
	});

	addIgreja.idSermao = idSermao;
	Ti.UI.currentTab.open(addIgreja, {
		animated : true
	});

});

var ver_igreja = Titanium.UI.createButton({
	title : 'Listar Igreja'

});

var titleIgreja = Titanium.UI.createLabel({
	color : '#245553',
	height : 18,
	width : 210,
	top : 10,
	text : 'Listar Igrejas',
	textAlign : 'center',
	font : {
		fontSize : 16,
		fontFamily : 'Marker felt'
	}
});

ver_igreja.addEventListener('click', function(e) {

	var verIgreja = Titanium.UI.createWindow({
		//title : 'Listar Igrejas',
		url : 'tbligrejas_pregacoes.js',
		//win.idSermao = idSermao;
	});

	verIgreja.idSermao = idSermao;
	verIgreja.setTitleControl(titleIgreja);
	Ti.UI.currentTab.open(verIgreja, {
		animated : true
	});

});

var toolbar = Titanium.UI.iOS.createToolbar({
	items : [add_igreja, flexSpace, flexSpace, flexSpace, ver_igreja],
	bottom : 0,
	borderTop : true,
	borderBottom : false
});
currentWin.add(toolbar);

currentWin.rightNavButton = editSermao;
setData();
currentWin.add(table);

