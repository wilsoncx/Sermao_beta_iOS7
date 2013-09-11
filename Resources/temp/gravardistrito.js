// create var for the currentWindow
	var currentWin = Ti.UI.currentWindow;
	function insertRows(dbData) {
	
	var db = Ti.Database.install('teste','teste');
	var theData = db.execute('INSERT INTO igreja (nome, distrito) VALUES("'+nome.value+'","'+my_combo.value+'")');
	theData;
	alert("Rows Inserted");

	};

	
	
	var nome = Ti.UI.createTextField({
		color:'#336699',
		top:10,
		left:10,
		width:300,
		height:40,
		hintText:'Nome',
		keyboardType:Ti.UI.KEYBOARD_DEFAULT,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	currentWin.add(nome);
	var name = Ti.UI.createTextField({
	
	});
	
//criando um combolist com piker

 	
var tr = Titanium.UI.create2DMatrix();
tr = tr.rotate(90);

var drop_button =  Titanium.UI.createButton({
		style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		transform:tr
});



var my_combo = Titanium.UI.createTextField({
	hintText:"write your name or select one",
	height:40,
	width:300,
	top:60,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	rightButton:drop_button,
	rightButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS
});



var picker_view = Titanium.UI.createView({
	height:251,
	bottom:-251
});

var cancel =  Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});

var done =  Titanium.UI.createButton({
	title:'Done',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});

var spacer =  Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});


var toolbar =  Titanium.UI.createToolbar({
	top:0,
	items:[cancel,spacer,done]
});

var picker = Titanium.UI.createPicker({
		top:43
});
picker.selectionIndicator=true;


var db = Ti.Database.install('teste','teste');
var rows = db.execute('SELECT nome FROM distrito');
var dataArray = [];
var column1 = Ti.UI.createPickerColumn();
var x = 0;
while (rows.isValidRow())
{
    var row = Ti.UI.createPickerRow({
            left : 110,
            title : '' + rows.fieldByName('nome') + '',
});
column1.addRow(row);
        dataArray[x++] = row;
        rows.next();

};
var picker_data = column1;

picker.add(picker_data);

picker_view.add(toolbar);
picker_view.add(picker);



var slide_in =  Titanium.UI.createAnimation({bottom:0});
var slide_out =  Titanium.UI.createAnimation({bottom:-251});



my_combo.addEventListener('focus', function() {
	picker_view.animate(slide_out);
});

drop_button.addEventListener('click',function() {
	picker_view.animate(slide_in);
	my_combo.blur();
});

cancel.addEventListener('click',function() {
	picker_view.animate(slide_out);
});

done.addEventListener('click',function() {
	my_combo.value =  picker.getSelectedRow(0).title;
	picker_view.animate(slide_out);
});





 
picker_view.add(toolbar);
picker_view.add(picker);
currentWin.add(picker_view);
currentWin.add(my_combo);
//add above date and id to event listener of row click and get these parameters in event listener block to fetch //data as above, and show in picker


	
	var btn = Ti.UI.createButton({
		title:'Insert Record',
		top:310,
		width:130,
		height:35,
		borderRadius:1,
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}
	});
	currentWin.add(btn);
	btn.addEventListener('click',function(e) {	
		
		if (nome.value != '' && my_combo.value !=  '') {
			var dbData = {
				nome: nome.value,
				distrito: my_combo.value
			};
			insertRows(dbData);
		} else {
			alert("Preencha todos os campos");
		};
	});
