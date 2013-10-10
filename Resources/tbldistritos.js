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
	var tableview = Ti.UI.createTableView({
		search : search,
		filterAttribute : 'title',
		borderRadius : 5,
		backgroundColor : '#FFEFBF'

	});
	var novoDistrito = Titanium.UI.createButton({
		systemButton : Ti.UI.iPhone.SystemButton.CONTACT_ADD,
	});
	var deletar = Titanium.UI.createButton({
		title : 'Excluir',
	});
	novoDistrito.addEventListener('click', function(e) {
		var gravarDistrito = Titanium.UI.createWindow({
			url : 'form_distrito.js',
		});
		Ti.UI.currentTab.open(gravarDistrito, {
			animated : true

		});
	});

	currentWin.rightNavButton = novoDistrito;
	currentWin.leftNavButton = deletar;

} else {

	var tableview = Ti.UI.createTableView({
		search : search,
		filterAttribute : 'title',
		//borderRadius : 5,
		backgroundColor : '#FFEFBF',
		bottom : 50

	});
	var novoDistrito = Titanium.UI.createButton({
		title : 'Novo Distrito',
		bottom : 0,
		right : 0,
		height : 40,
		width : '100%'
	});

	novoDistrito.addEventListener('click', function(e) {
		var gravarDistrito = Titanium.UI.createWindow({
			url : 'form_distrito.js',
			backgroundColor : '#FFEFBF',
			modal : true
		});
		gravarDistrito.open();
	});

	var deletar = Titanium.UI.createButton({
		title : 'Excluir',
		bottom : 0,
		left : 0,
		height : 40,
		width : 80
	});
	currentWin.add(novoDistrito);
	//currentWin.add(deletar);

};

//criando o botão de de novo distrito e seus eventos

//Abrindo formulario para cadastrar novo distrito

//criando botão deletar distrito

//modificando evento de click do botão deletar.
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
		e.source.title = "OK";
	} else {
		tableview.editable = true;
		//reactivate swipe-Delete button!
		tableview.editing = false;
		e.source.title = "Editar";
	}

});

//adicionando botões na barra de navegação

//criando função para criar array para ler o banco e lista os distritos
function setData() {
	var rows = db.execute('SELECT * FROM distrito  GROUP BY nome ');
	var dataArray = [];

	while (rows.isValidRow()) {
		var vnome = rows.fieldByName('nome');
		var vid = rows.fieldByName('id');
		dataArray.push({
			title : vnome,
			hasChild : true,
			id : vid,
			path : 'detalhedistrito.js',
			color : '#245553',
			font : {
				fontSize : 16,
			}

		});
		rows.next();
		tableview.setData(dataArray);
	};

};

// criando table view e seus eventos

//evento para abrir o formulario de detalhes quando se clica em distrito
tableview.addEventListener('click', function(e) {
	if (e.rowData.path) {

		if (os == 'iphone') {
			var win = Ti.UI.createWindow({
				url : e.rowData.path,
				id : e.rowData.id
			});
			var idDist = e.rowData.id;
			win.idDist = idDist;

			Ti.UI.currentTab.open(win);

		} else {
			var win = Ti.UI.createWindow({
				url : e.rowData.path,
				id : e.rowData.id,
				modal : true,

			});
			var idDist = e.rowData.id;
			win.idDist = idDist;
			win.open();
		};
	}

});
tableview.addEventListener('longclick', function(e) {

	if (os == 'android') {
		Ti.API.info(e.rowData.id);
		var delid = e.rowData.id;
		var dialog = Ti.UI.createOptionDialog({
			cancel : 2,
			options : ['Excluir', 'Cancelar'],
			title : 'Excluir registros?'
		});
		dialog.show();

		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				var rows = db.execute('DELETE FROM distrito WHERE id= "' + delid + '"');

			} else {

			};

		});
	} else {

	};

});

//evento para deletar do banco o distrito
tableview.addEventListener('delete', function(e) {
	var rows = db.execute('DELETE FROM distrito WHERE id= "' + e.row.id + '"');
});

//relendo o banco quando é feito alguma modificação no formulario
currentWin.addEventListener('focus', function() {
	setData();
});

//adicioanando componentes a tela
currentWin.add(tableview);
setData();

