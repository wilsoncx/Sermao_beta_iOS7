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

			text :  rows.fieldByName('titulo'),
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
			height:50,
    		//width:250,
    		bottom:150,
    		left:10,
    		textAlign:'left'
		}));

		dataArray.push(tbRow, tbRow1, tbRow2);
		rows.next();
		table.setData(dataArray);

	}
	
	return dataArray;

};



var table = Ti.UI.createTableView({
	style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
	bottom : '10%',
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

var bb1 = Titanium.UI.createButtonBar({
    labels:['Adicionar Igreja', 'Ver Igrejas'],
    backgroundColor:'#336699',
    top:'92%',
    style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
    height:25,
    width:300
});
bb1.addEventListener('click', function(e){
	if (e.index == 0)
{
    bb1.labels = ['Adicionar Igreja'];
    win = Titanium.UI.createWindow({
    url:'add_igrejas.js',
    title:'Adiconar igreja ao sermão',
    backgroundColor:'#fff',
    barColor:'#111'     
});
}
else
{
    bb2.labels = ['Ver Igrejas'];
    win = Titanium.UI.createWindow({
    url:'../views.js',
    title:'View 1',
    backgroundColor:'#fff',
    barColor:'#111'         
});
}
	Titanium.UI.currentTab.open(win,{animated:true});
		
});

currentWin.add(bb1);
currentWin.rightNavButton = send;
setData();
//setData1();
//currentWin.add(tableview);
currentWin.add(table);

