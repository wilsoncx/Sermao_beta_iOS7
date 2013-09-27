//criando a tela
var currentWin = Ti.UI.currentWindow;

//criando a barra da busca
var search = Titanium.UI.createSearchBar({
	barColor : '#245553',
	showCancel : true,
	height : 43,
	top : 0
});
var busca = search.value;

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

//adicionando botões na barra de navegação
currentWin.rightNavButton = novo;
currentWin.leftNavButton = deletar;

//criando função para criar array para ler o banco e lista os distritos
function setData() {
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
	var rows = db.execute('SELECT * FROM sermao  order by titulo ');
	var dataArray = [];

	while (rows.isValidRow()) {
		var vtitulo = rows.fieldByName('titulo');
		var vid = rows.fieldByName('id');
		dataArray.push({
			hasChild : true,
			title: vtitulo,
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

// criando table view e seus eventos
var tableview = Ti.UI.createTableView({
	search : search,
	filterAttribute : 'title',
	borderRadius : 5,
	backgroundColor : '#FFEFBF'

});
//evento para abrir o formulario de detalhes quando se clica em distrito
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

//evento para deletar do banco o distrito
tableview.addEventListener('delete', function(e) {
	var db = Ti.Database.open('bd_sgs', 'bd_sgs');
	var rows = db.execute('DELETE FROM sermao WHERE id= "' + e.row.id + '"');
});

//relendo o banco quando é feito alguma modificação no formulario
currentWin.addEventListener('focus', function() {
	setData();
});

//adicioanando componentes a tela
currentWin.add(tableview);
setData();

