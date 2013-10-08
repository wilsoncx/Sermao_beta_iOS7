//criando a tela
var currentWin = Ti.UI.currentWindow;
var os = Ti.Platform.osname;
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
				fontSize : 16
			}

		}));

		tbRow1.add(Ti.UI.createLabel({
			text : rows.fieldByName('tema'),
			left : 10,
			height : 40,
			color : '#245553',
			font : {
				fontSize : 16
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
				fontSize : 16
			}
		}));

		dataArray.push(tbRow, tbRow1, tbRow2);
		rows.next();
		table.setData(dataArray);

	}

	return dataArray;

};
if (os == 'iphone') {
	var table = Ti.UI.createTableView({
		style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
		bottom : '12%',
		top : '1%',
		borderRadius : 5,
		scrollable : 'false',
		backgroundColor : '#FFEFBF'
	});

	flexSpace = Titanium.UI.createButton({
		systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

	var add_igreja = Titanium.UI.createButton({
		title : 'Adicionar Igreja'
	});
	var ver_igreja = Titanium.UI.createButton({
		title : 'Listar Igreja'

	});

	var toolbar = Titanium.UI.iOS.createToolbar({
		items : [add_igreja, flexSpace, flexSpace, flexSpace, ver_igreja],
		bottom : 0,
		borderTop : true,
		borderBottom : false
	});

	var editSermao = Titanium.UI.createButton({
		title : 'Editar'

	});

	editSermao.addEventListener('click', function(e) {

		var editSermoes = Titanium.UI.createWindow({
			url : 'edit_sermao.js'
		});
		editSermoes.idSermao = idSermao;
		Ti.UI.currentTab.open(editSermoes, {
			animated : true
		});

	});
	//criando botoes de adicionar e ver igrejas

	add_igreja.addEventListener('click', function(e) {

		var addIgreja = Titanium.UI.createWindow({
			url : 'add_igreja_agenda.js'
		});

		addIgreja.idSermao = idSermao;
		Ti.UI.currentTab.open(addIgreja, {
			animated : true
		});

	});

	ver_igreja.addEventListener('click', function(e) {

		var verIgreja = Titanium.UI.createWindow({
			url : 'tbligrejas_pregacoes.js'
		});

		verIgreja.idSermao = idSermao;
		Ti.UI.currentTab.open(verIgreja, {
			animated : true
		});

	});

	currentWin.add(toolbar);
	currentWin.rightNavButton = editSermao;

} else {
	var table = Ti.UI.createTableView({
		bottom : '12%',
		top : 40,
		scrollable : 'false',
		backgroundColor : '#FFEFBF'
	});

	var editSermao = Titanium.UI.createButton({
		title : 'Editar',
		top : 2,
		left : 0,
		height : 40,
		width : 80

	});
	editSermao.addEventListener('click', function(e) {

		var editSermoes = Titanium.UI.createWindow({
			url : 'edit_sermao.js',
			backgroundColor : '#FFEFBF',
			modal : true
		});
		editSermoes.idSermao = idSermao;
		editSermoes.open();

	});
	//criando botoes de adicionar e ver igrejas
	var add_igreja = Titanium.UI.createButton({
		title : 'Adicionar Igreja',
		bottom : 0,
		right : 0,
		height : 40,
		width : '50%'
	});
	var ver_igreja = Titanium.UI.createButton({
		title : 'Listar Igreja',
		bottom : 0,
		left : 0,
		height : 40,
		width : '50%'

	});

	add_igreja.addEventListener('click', function(e) {

		var addIgreja = Titanium.UI.createWindow({
			url : 'add_igreja_agenda.js',
			backgroundColor : '#FFEFBF',
			modal : true

		});

		addIgreja.idSermao = idSermao;
		addIgreja.open();

	});

	ver_igreja.addEventListener('click', function(e) {

		var verIgreja = Titanium.UI.createWindow({
			url : 'tbligrejas_pregacoes.js',
			backgroundColor : '#FFEFBF',
			modal : true
		});

		verIgreja.idSermao = idSermao;
		verIgreja.open();
	});

	currentWin.add(add_igreja);
	currentWin.add(ver_igreja);
	currentWin.add(editSermao);
};

//fim

currentWin.addEventListener('focus', function() {
	setData();
});

setData();
currentWin.add(table);

