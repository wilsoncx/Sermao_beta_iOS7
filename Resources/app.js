// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#FFEFBF');
// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var tela_principal = Titanium.UI.createWindow({  
   // title:'Agenda',
    url: 'tela_principal.js'
});
var titleLabel = Titanium.UI.createLabel({
    color:'#245553',
    height:18,
    width:210,
    top:10,
    text:'Agenda de Pregações',
    textAlign:'center',
    font : {fontSize : 16},
    shadowColor:'#eee',shadowOffset:{x:0,y:1}
});



var tab1 = Titanium.UI.createTab({  
    icon:'agenda.png',
    title:'Tela Principal',
    window: tela_principal
});


var tblDistrito = Ti.UI.createWindow({
	title: 'Lista de Distritos',
	url: 'tbldistritos.js'
});

var titdistrito = Titanium.UI.createLabel({
    color:'#245553',
    height:18,
    width:210,
    top:10,
    text:'Distritos',
    textAlign:'center',
    font : {fontSize : 16},
    shadowColor:'#eee',shadowOffset:{x:0,y:1}
});

var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Distritos',
    window:tblDistrito
});


var sermoes = Titanium.UI.createWindow({  
    title:'Lista de Sermões',
    url: 'tblsermoes.js'
});
var titlesermoes = Titanium.UI.createLabel({
    color:'#245553',
    height:18,
    width:210,
    top:10,
    text:'Sermões',
    textAlign:'center',
    font : {fontSize : 16},
    shadowColor:'#eee',shadowOffset:{x:0,y:1}
});

var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Sermões',
    window:sermoes
});


tela_principal.setTitleControl(titleLabel);
sermoes.setTitleControl(titlesermoes);
tblDistrito.setTitleControl(titdistrito);
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  
// open tab group
tabGroup.open();
