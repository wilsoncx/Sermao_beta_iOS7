// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#336699');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var tela_principal = Titanium.UI.createWindow({  
    title:'Lista de pregação',
    url: 'tela_principal.js'
});


var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tela Principal',
    window: tela_principal
});


var tblDistrito = Ti.UI.createWindow({
	title: 'Lista de Distritos',
	url: 'tbldistritos.js'
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
var tab3 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Sermões',
    window:sermoes
});



tabGroup.addTab(tab1);
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  
// open tab group
tabGroup.open();
