//criando a tela
Ti.include("bd.js");
var currentWin = Ti.UI.currentWindow;
var os = Ti.Platform.osname;

//criando a barra da busca
var search = Titanium.UI.createSearchBar({
	barColor : '#245553',
	showCancel : true,
	height : 43,
	top : 0
});
var busca = search.value;

if (os == 'iphone') {
	// criando table view e seus eventos
	var tableview = Ti.UI.createTableView({
		search : search,
		filterAttribute : 'title',
		backgroundColor : '#FFEFBF'

	});
	
	tableview.addEventListener('click', function(e) {
	if (e.rowData.path) {
		var win = Ti.UI.createWindow({
			url : e.rowData.path,
			id : e.rowData.id
		});
		var idSermao = e.rowData.id;
		win.idSermao = idSermao;
		Ti.UI.currentTab.open(win);

	}

});
	//criando o botão de de novo distrito e seus eventos
	var novo = Titanium.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.CONTACT_ADD
	});

	//Abrindo formulario para cadastrar novo distrito
	novo.addEventListener('click', function(e) {
		var addSermao = Titanium.UI.createWindow({
			url : 'form_sermao.js'
		});
		Ti.UI.currentTab.open(addSermao, {
			animated : true
		});

	});

	//criando botão deletar distrito
	var deletar = Titanium.UI.createButton({
		title : 'Excluir'
	});
	//adicionando botões na barra de navegação
	currentWin.rightNavButton = novo;
	currentWin.leftNavButton = deletar;

} else {
	// criando table view e seus eventos
	var tableview = Ti.UI.createTableView({
		search : search,
		filterAttribute : 'title',
		backgroundColor : '#FFEFBF',
		bottom : 50

	});
	
	tableview.addEventListener('click', function(e) {
	if (e.rowData.path) {
		var win = Ti.UI.createWindow({
			url : e.rowData.path,
			id : e.rowData.id,
			backgroundColor : '#FFEFBF',
			modal : true
		
		});
		var idSermao = e.rowData.id;
		win.idSermao = idSermao;
		win.open();
	}

});
	//criando o botão de de novo distrito e seus eventos
	var novo = Titanium.UI.createButton({
		title : 'Novo Sermão',
		bottom : '3dp',
		right : '3dp',
		left: '3dp',
		height : '40dp',
		width : '315dp'
	});

	//Abrindo formulario para cadastrar novo distrito
	novo.addEventListener('click', function(e) {
		var addSermao = Titanium.UI.createWindow({
			url : 'form_sermao.js',
			backgroundColor : '#FFEFBF',
			modal : true
		});
		addSermao.open();

	});

	//criando botão deletar distrito
	var deletar = Titanium.UI.createButton({
		title : 'Excluir',
		bottom : 0,
		left : 0,
		height : 40,
		width : 80
	});
	currentWin.add(novo);
	//currentWin.add(deletar);

};

//modificando evento de click do botão deletar.
deletar.addEventListener('click', function(e) {
	if (e.source.title == "Excluir") {
		tableview.editable = false;
		//deactivate swipe-Delete button
		tableview.editing = true;
		//Edit:on
		tableview.editing = false;
		//Edit:off
		tableview.editing = true;
		//Edit:on again!
		e.source.title = "OK";
	} else {
		tableview.editable = true;
		//reactivate swipe-Delete button!
		tableview.editing = false;
		e.source.title = "Excluir";
	}

});

//criando função para criar array para ler o banco e lista os distritos
function setData() {
	var rows = db.execute('SELECT * FROM sermao  order by titulo ');
	var dataArray = [];

	while (rows.isValidRow()) {
		var vtitulo = rows.fieldByName('titulo');
		var vid = rows.fieldByName('id');
		dataArray.push({
			hasChild : true,
			title : vtitulo,
			id : vid,
			path : 'detalhesermoes.js',
			color : '#245553',
			font : {
				fontSize : 16,
			}
		});
		rows.next();
		tableview.setData(dataArray);
	};

};

//evento para abrir o formulario de detalhes quando se clica em distrito


//evento para deletar do banco o distrito
tableview.addEventListener('delete', function(e) {
	var rows = db.execute('DELETE FROM sermao WHERE id= "' + e.row.id + '"');
});
tableview.addEventListener('longclick', function(e) {

	if (os == 'android') {
		var delid = e.rowData.id;
		var dialog = Ti.UI.createOptionDialog({
			cancel : 2,
			options : ['Excluir', 'Cancelar'],
			title : 'Excluir registros?'
		});
		dialog.show();

		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				var rows = db.execute('DELETE FROM sermao  WHERE id= "' + delid + '"');
				setData();

			} else {

			};

		});
	} else {

	};

});
//relendo o banco quando é feito alguma modificação no formulario
currentWin.addEventListener('focus', function() {
	setData();
});

//adicioanando componentes a tela
currentWin.add(tableview);
setData();

