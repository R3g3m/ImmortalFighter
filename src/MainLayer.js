var audioEngine = cc.AudioEngine.getInstance();

var MainLayer = cc.LayerColor.extend({
	_player1: null,
	_player2: null,
	_player1_hp: null,
	_player2_hp: null,
	_label1: null,
	_label2: null,

    ctor:function() {
        this._super();
        cc.associateWithNative( this, cc.LayerColor );
    },

    init: function() {
    	/*
		if( 'touches' in sys.capabilities ) {
			this.setTouchEnabled(true);
		}
		if( 'mouse' in sys.capabilities ) {
		    this.setMouseEnabled(true);
		}*/
        if ( 'keyboard' in sys.capabilities ) {
        	this.setKeyboardEnabled(true);
        }
        var texture1 = cc.TextureCache.getInstance().addImage(sh_ryu);	
        this._player1 = new Player("res/1.png", texture1, 50, 70, 0);
 
        var texture2 = cc.TextureCache.getInstance().addImage(sh_ken);       	
        this._player2 = new Player("res/2.png", texture2, 350, 70, 1);

        this._player1_hp = cc.Sprite.create(s_hp);
        this._player2_hp = cc.Sprite.create(s_hp);
        var hpcover1 = cc.Sprite.create(s_hp_black);
		var hpcover2 = cc.Sprite.create(s_hp_black);
		
        this._player1_hp.setPosition(50, 270);
        this._player2_hp.setPosition(350, 270);

        this._label1 = cc.LabelTTF.create('Player1',  'Times New Roman', 26,  cc.TEXT_ALIGNMENT_LEFT);
        this._label1.setPosition(50, 290);
        this._label2 = cc.LabelTTF.create('Player2',  'Times New Roman', 26,  cc.TEXT_ALIGNMENT_RIGHT) 
        this._label2.setPosition(350, 290);

        var winSize = cc.Director.getInstance().getWinSize();
        var background = cc.Sprite.create(s_background);
        
        background.setAnchorPoint(cc.PointMake(0, 0));
     
        this.addChild(background);
        this.addChild(this._player1);
        this.addChild(this._player2);
        this.addChild(this._player1_hp);
       	this.addChild(this._player2_hp);

       	this.addChild(this._label1);
       	this.addChild(this._label2);

        this.scheduleUpdate();
        this._player2.reverse();
    },

    onEnter:function () {
        this._super();
    },

    gameLogic: function (dt) {

    },
 
	onMouseUp:function (event) {
	    var location = event.getLocation();
	    this.locationTapped(location);
	},

	// переписать управление через установку state Playera
	// тут смешан контроллер и модель
	// от дубляжа кода тоже надо избавиться
	onKeyDown: function (event) {
		switch(event) {
			//controls for 1 player
			case cc.KEY.a: 
				if(!this._player1._isMoveForward) {
					this._player1._isMoveBack = true;
				}
				
		    	break;
		    case cc.KEY.d: 
		    	if(!this._player1._isMoveBack) {
		    		this._player1._isMoveForward = true; 
		    	}
		    	  
				break;
		    case cc.KEY.w: 
		    	break;
		    case cc.KEY.s: 
		    	this._player1._isDucking = true;
		    	break;
		    case cc.KEY.space:
		    	this._player1._isBlocking = true;
		    	break;
		    case cc.KEY.y:
		    	this._player1._hits.lpunch = true;
		    	break;
		    case cc.KEY.u:
		    	this._player1._hits.hpunch = true;
		    	break;
		    case cc.KEY.h:
		    	this._player1._hits.lkick = true;
		    	break;
		    case cc.KEY.j:
		    	this._player1._hits.hkick = true;
		    	break;


		    //controls for 2 player
			case cc.KEY.left: 
				if(!this._player2._isMoveBack) {
					this._player2._isMoveForward = true;
				}
		    	break;
		    case cc.KEY.right: 
		    	if(!this._player2._isMoveForward) {
		    		this._player2._isMoveBack = true; 
		    	}   
				break;
		    case cc.KEY.up: 
				
		    	break;
		    case cc.KEY.down: 
		    	this._player2._isDucking = true;
		    	break;    
		    case cc.KEY.shift:
		    	this._player2._isBlocking = true;
		    	break;
		    case cc.KEY.i:
		    	this._player2._hits.lpunch = true;
		    	break;
		    case cc.KEY.o:
		    	this._player2._hits.hpunch = true;
		    	break;
		    case cc.KEY.k:
		    	this._player2._hits.lkick = true;
		    	break;
		    case cc.KEY.l:
		    	this._player2._hits.hkick = true;
		    	break;
        }	
	},

	onKeyUp: function (event) {
		switch(event) {
			case cc.KEY.a: 
				this._player1._isMoveBack = false;
		    	break;
		    case cc.KEY.d: 
		    	this._player1._isMoveForward = false;
		    	break;        
		    case cc.KEY.w: 

		    	break;
		    case cc.KEY.s: 
		    	this._player1._isDucking = false;
		    	break;
		    case cc.KEY.space:
		    	this._player1._isBlocking = false;
		    	break;
		    case cc.KEY.left: 
				this._player2._isMoveForward = false;
		    	break;
		    case cc.KEY.right: 
		    	this._player2._isMoveBack = false;
		    	break;        
		    case cc.KEY.up: 

		    	break;
		    case cc.KEY.down: 
				this._player2._isDucking = false;
		    	break;
		   	case cc.KEY.shift:
		    	this._player2._isBlocking = false;
		    	break;
		}	

	},

	countHits: function (dt) {
		var pl1hit = this._player1.checkHits();
		var pl2hit = this._player2.checkHits();
		if(pl1hit && !pl2hit) {
			var hit_x;
			var hited;
			switch (pl1hit) {
				case 'hpunch':
					hit_x = this._player1.x + 75;
					hited = this._player2.x;
					if(hited<=hit_x && !this._player2._isBlocking)
					{
						this._player2.hp -= 10;
					}
					break;
				case 'lpunch':
					hit_x = this._player1.x + 60;
					hited = this._player2.x;
					if(hited<=hit_x && !this._player2._isBlocking)
					{
						this._player2.hp -= 5;
					}
					break;
				case 'hkick':
					hit_x = this._player1.x + 75;
					hited = this._player2.x;
					if(hited<=hit_x && !this._player2._isBlocking)
					{
						this._player2.hp -= 15;
					}
					break;
				case 'lkick':
					hit_x = this._player1.x + 75;
					hited = this._player2.x;
					if(hited<=hit_x && !this._player2._isBlocking)
					{
						this._player2.hp -= 12;
					}
					break;
			}
		} else if (!pl1hit && pl2hit) {
			var hit_x;
			var hited;
			switch (pl2hit) {
				case 'hpunch':
					hit_x = this._player2.x - 75;
					hited = this._player1.x;
					if(hited<=hit_x && !this._player2._isBlocking)
					{
						this._player1.hp -= 10;
					}
					break;
				case 'lpunch':
					hit_x = this._player2.x - 60;
					hited = this._player1.x;
					if(hited<=hit_x && !this._player2._isBlocking)
					{
						this._player1.hp -= 5;
					}
					break;
				case 'hkick':
					hit_x = this._player2.x - 75;
					hited = this._player1.x;
					if(hited<=hit_x && !this._player2._isBlocking)
					{
						this._player1.hp -= 15;
					}
					break;
				case 'lkick':
					hit_x = this._player1.x - 75;
					hited = this._player2.x;
					if(hited<=hit_x && !this._player2._isBlocking)
					{
						this._player1.hp -= 12;
					}
					break;
				}
		}
	},

	// TODO: сделать отдельный класс для hp
	// и для интерфейса тоже
	hpupdate: function(dt) {
		
	},

	update: function (dt) {
	   this._player1.update(dt);
	   this._player2.update(dt);
	   this.countHits(dt);
	   this.hpupdate(dt);
	},
	
});

MainLayer.create = function () {
    var sg = new MainLayer();
    if (sg && sg.init(cc.c4b(255, 255, 255, 255))) {
        return sg;
    }
    return null;
};
 
MainLayer.scene = function () {
    var scene = cc.Scene.create();
    var layer = new MainLayer();
    layer.init();
    scene.addChild(layer);
    return scene;
};