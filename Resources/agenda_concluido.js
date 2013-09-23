// Create an array of explicitly defined custom TableViewRows
var currentWin = Ti.UI.currentWindow;

function setData() {
	var st = 'i';
	var db = Ti.Database.install('bd_sgs', 'bd_sgs');
var rows = db.execute('SELECT agendasermao.id, agendasermao.igreja, agendasermao.sermao, agendasermao.data, igreja.nome, sermao.titulo FROM  agendasermao INNER JOIN igreja ON agendasermao.igreja = igreja.id INNER JOIN sermao ON agendasermao.sermao = sermao.id WHERE status = "'+ st +'"  ORDER BY agendasermao.data ');
		var dataArray = [];

	while (rows.isValidRow()) {
		var vsermao = rows.fieldByName('titulo');
		var vid = rows.fieldByName('id');
		var vigreja = rows.fieldByName('nome');
		var vdata = rows.fieldByName('data');
		var row = Ti.UI.createTableViewRow({
		//backgroundColor : '#ECECEC',
		borderRadius : 15,
		//top:10,
		bottom : 10,
		id:vid
	});
	var label = Ti.UI.createLabel({
			top : 5,
			left : 10,
			color : '#245553',
			font : {
				fontSize : 16,
				fontFamily: 'Marker felt',
				fontStyle : 'thin'
			},
			text : vsermao,
		});

		var label1 = Ti.UI.createLabel({
			top : 25,
			left : 10,
			color : '#245553',
			font : {
				fontSize : 14,
				fontFamily: 'Marker felt',
			},
			text : vigreja,
		});

		var label2 = Ti.UI.createLabel({
			color : '#245553',
			font : {
				fontSize : 12,
				fontFamily: 'Marker felt',
			},
			top : 25,
			right : 10,
			text : vdata,
			id : vid,
		});

		var button = Ti.UI.createButton({
			right : 10,
			height : 30,
			width : 40,
			title : 'OK',
			borderColor : '#336699',
			borderRadius : 5

		});
	row.add(label);
	row.add(label1);
	row.add(label2);
	//row.add(button);
		
		dataArray.push(
			row
			
			);
		rows.next();
		table.setData(dataArray);
	};

};




// now assign that array to the table's data property to add those objects as rows
var table = Titanium.UI.createTableView({
backgroundColor : '#FFEFBF'
});
table.addEventListener('click', function(e) {
var rowid = e.row.id;
	var db1 = Ti.Database.install('bd_sgs', 'bd_sgs');
	db1.execute('UPDATE agendasermao SET status = "a" WHERE id = "'+ rowid +'"');
	table.deleteRow(e.row.row);
db1.close();
});

currentWin.addEventListener('focus', function() {
	setData();
	
});


// Create a Button.
var btnNovo = Titanium.UI.createButton({
	title : 'Novo'
});

var titleaddIgreja = Titanium.UI.createLabel({
    color:'#245553',
    height:18,
    width:210,
    top:10,
    text:'Adicionar Agenda',
    textAlign:'center',
    font : {fontSize : 16,fontFamily: 'Marker felt'},
    shadowColor:'#eee',shadowOffset:{x:0,y:1}
});


// Listen for click events.
btnNovo.addEventListener('click', function() {
	fontFamily: 'Marker felt';
	var addIgreja = Titanium.UI.createWindow({
		//title : 'Add Igrejas',
		url : 'add_igreja_agenda.js',
		
	});
	addIgreja.setTitleControl(titleaddIgreja);
	//gravarDistrito.idDist = idDist;
	Ti.UI.currentTab.open(addIgreja, {
		animated : true
	});
});


// Create a Button.

var titlenconcluido = Titanium.UI.createLabel({
    color:'#245553',
    height:18,
    width:210,
    top:10,
    text:'Agenda',
    textAlign:'center',
    font : {fontSize : 16,fontFamily: 'Marker felt'},
    shadowColor:'#eee',shadowOffset:{x:0,y:1}
});

var btnNconcluido = Titanium.UI.createButton({
	title : 'Não Concluidos'
});

// Listen for click events.
btnNconcluido.addEventListener('click', function() {
	var nConcluido = Titanium.UI.createWindow({
		//title : 'agenda',
		url : 'tela_principal.js'
	});
	
	//gravarDistrito.idDist = idDist;
	Ti.UI.currentTab.open(nConcluido, {
		animated : true
	});
	nConcluido.setTitleControl(titlenconcluido);
});
// Add to the parent view.
//parentView.add(aButton);
currentWin.leftNavButton = btnNovo;
currentWin.rightNavButton = btnNconcluido;



currentWin.add(table);
setData();


