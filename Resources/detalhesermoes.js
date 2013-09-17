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

		});
		var tbRow1 = Ti.UI.createTableViewRow({

		});

		var tbRow2 = Ti.UI.createTableViewRow({

		});

		tbRow.add(Ti.UI.createLabel({

			text : rows.fieldByName('titulo'),
			left : 10,
			height : 40,

		}));

		tbRow1.add(Ti.UI.createLabel({
			text : rows.fieldByName('tema'),
			left : 10,
			height : 40
		}));

		tbRow2.add(Ti.UI.createLabel({
			text : rows.fieldByName('detalhes'),
			height : 50,
			//width:250,
			bottom : 150,
			left : 10,
			textAlign : 'left'
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
	scrollable : 'false'
});

var send = Titanium.UI.createButton({
	title : 'Editar',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,
});
send.addEventListener('click', function(e) {

	var gravarDistrito = Titanium.UI.createWindow({
		title : 'Cadastrar Sermões',
		url : 'edit_sermao.js'
	});
	gravarDistrito.idSermao = idSermao;
	Ti.UI.currentTab.open(gravarDistrito, {
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
	title : 'adicionar Igreja',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,

});

add_igreja.addEventListener('click', function(e) {

	var addIgreja = Titanium.UI.createWindow({
		title : 'Adicionar Igrejas',
		url : 'add_igrejas.js',
		//win.idSermao = idSermao;
	});

	addIgreja.idSermao = idSermao;
	Ti.UI.currentTab.open(addIgreja, {
		animated : true
	});

});

var ver_igreja = Titanium.UI.createButton({
	title : 'Listar Igreja',
	style : Titanium.UI.iPhone.SystemButtonStyle.DONE,

});

ver_igreja.addEventListener('click', function(e) {

	var verIgreja = Titanium.UI.createWindow({
		title : 'Listar Igrejas',
		url : 'tbligrejas_pregacoes.js',
		//win.idSermao = idSermao;
	});

	verIgreja.idSermao = idSermao;
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


currentWin.rightNavButton = send;
setData();
currentWin.add(table);

