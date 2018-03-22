const {app,BrowserWindow,Menu,MenuItem}=require('electron');
const path=require('path');
const url=require('url');

const menu=new Menu();
var win=null;

menu.append(new MenuItem({
	label:'Advanced',
	submenu: [
		{
			label: 'DevTools',
			accelerator: 'F12',
			click: () => {win.webContents.openDevTools();}
		}
	]
}));

menu.append(new MenuItem({
	label:'Hello world',
	click: () => {console.log("Hello world!")}
}));

function createWindow(){
	win=new BrowserWindow({width: 800,height: 600});
	Menu.setApplicationMenu(menu);
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));
}

app.on('ready',createWindow);

app.on('window-all-closed',()=>{
	if(process.platform!="darwin"){
		app.quit();
	}
});

app.on('activate',()=>{
	if(win==null){
		createWindow();
	}
});
