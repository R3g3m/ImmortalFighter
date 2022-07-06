var MainMenu = cc.Layer.extend({

	init: function () {
		this._super();

		var menuNewGame = new cc.MenuItemFont.create("New Game",this,this.onNewGame);
        var menuNetwork = new cc.MenuItemFont.create("Network Game",this,this.onNetworkGame);
        var menuExit = new cc.MenuItemFont.create("Exit",this,this.onExit);

        menuNewGame.setPosition(new cc.Point(size.width/2,size.height/2+50));
        menuNetwork.setPosition(new cc.Point(size.width/2,size.height/2));
        menuExit.setPosition(new cc.Point(size.width/2,size.height/2-50));

        var menu = cc.Menu.create(menuNewGame, menuNetwork, menuExit);
        menu.setPosition(new cc.Point(0, 0));
        this.addChild(menu);
	},

	onNewGame: function () {

	},

	onNetworkGame: function () {

	},

	onExit: function () {

	},

	update: function (dt) {

	}

});

MainMenu.create = function () {
    var sg = new MainMenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

MainMenu.scene = function () {
    var scene = cc.Scene.create();
    var layer = MainMenu.create();
    scene.addChild(layer);
    return scene;
};