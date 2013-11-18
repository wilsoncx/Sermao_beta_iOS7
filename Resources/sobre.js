var os = Ti.Platform.osname;
if (os == 'android') {
	var tam=30;
}
else{
	var tam=16;
};
var currentWin = Ti.UI.currentWindow;


// Create a Label.
var lbSobre = Ti.UI.createLabel({
	text : 'Sistema desenvolvido para auxiliar os pastores na pregação da evangelho, auxiliando-os a organizar os seus sermões, faça seu comentários e ajude a melhorar o aplicativo através do Email: wilsoncx@gmail.com',
	color : '#336699',
	font : {fontSize:tam},
	top : '10%', 
	left : '5%',
	textAlign : 'left'
});


var lbcoperight = Ti.UI.createLabel({
	text : 'Desenvolvido por: José Wilson',
	color : '#336699',
	font : {fontSize:tam},
	top : '50%', 
	left : '5%',
	textAlign : 'left'
});

// Add to the parent view.
currentWin.add(lbSobre);
currentWin.add(lbcoperight);

