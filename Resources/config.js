var currentWin = Ti.UI.currentWindow;
Ti.include("bd.js");
var os = Ti.Platform.osname;

// Create a Button.
var btnLimparBd = Ti.UI.createButton({
	title : 'Limpar Banco',
	height : 40,
	width : '90%',
	top : '5%',
	left : '5%'
});

// Listen for click events.
btnLimparBd.addEventListener('click', function() {

	if (os == 'android') {
		var dialog = Ti.UI.createOptionDialog({
			cancel : 1,
			options : ['Apagar dados', 'Cancelar'],
			title : 'Limpar o banco?'
		});
		dialog.show();

		dialog.addEventListener('click', function(e) {
			if (e.index == 0) {
				db.execute('DELETE FROM agendasermao');
				db.execute('DELETE FROM sermao');
				db.execute('DELETE FROM igreja');
				db.execute('DELETE FROM distrito');

			} ;

		});
	};

});

var btnBackup = Ti.UI.createButton({
	title : 'Fazer Backup',
	height : 40,
	width : '90%',
	top : '20%',
	left : '5%'
});

// Listen for click events.
btnBackup.addEventListener('click', function() {
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '../databases/'+'bd_sgs.db');

	var myAppDir = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory);
	var sdcardDir = myAppDir.getParent();
	var backupDir = Titanium.Filesystem.getFile(sdcardDir.nativePath, "sermao");
	if (backupDir.exists()) {
		Titanium.API.info('Backup dir exists.');
	} else {
		Titanium.API.info('Backup dir does not exist.');
		var i = backupDir.createDirectory();
		Titanium.API.info('createDirectory returned ' + i);
	}
	var b = Titanium.Filesystem.getFile(backupDir.nativePath, 'bd_sgs.db');
	b.write(f.read());
	var dirList = backupDir.getDirectoryListing();
	Titanium.API.info('Directory of ' + backupDir.nativePath);
	for ( i = 0; i < dirList.length; ++i) {
		Titanium.API.info('# ' + i + ' Namef: ' + dirList[i]);
		alert('Backup efetuado com sucesso!');

	}
});

var btnRestaura = Ti.UI.createButton({
	title : 'Restaurar Backup',
	height : 40,
	width : '90%',
	top : '35%',
	left : '5%'
});

// Listen for click events.
btnRestaura.addEventListener('click', function() {
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, '../databases/'+'bd_sgs.db');
	var myAppDir = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory);
	var sdcardDir = myAppDir.getParent();
	var backupDir = Titanium.Filesystem.getFile(sdcardDir.nativePath, "sermao");
	if (backupDir.exists()) {
		Titanium.API.info('Backup dir exists.');
		var b = Titanium.Filesystem.getFile(backupDir.nativePath,'bd_sgs.db');
		if (b.exists()) {
			f.write(b.read());
			alert("Banco de dados restaurado com sucesso!.");

		} else
			alert("Não é possivel encontrar o arquivo.");
	} else {
		Titanium.API.info('Backup dir does not exist.');
		alert('Backup não existe.');
	}
});

// Add to the parent view.
currentWin.add(btnLimparBd);
//currentWin.add(btnBackup);
//currentWin.add(btnRestaura);

