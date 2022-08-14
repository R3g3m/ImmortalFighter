var Player = cc.Sprite.extend({
	texture: null,
	_forever: null,
	_curentAction: null,
	_isAnimated: false,
	_timer: null,
	_isMoveBack: false,
	_isMoveForward: false,
	_isBlocking: false, 
	_isDucking: false,
	_walkSpeed: 100,
	_animations: {},
	_hits: {},
	x: 0,
	y: 0,
	hp: 100,
	dir: 0,

	ctor: function (filename, tex, x, y, dir) {
		this._super();
		this.initWithFile(filename);
		this.texture = tex;
		this.x = x;
		this.y = y;
		this.setPosition(x, y);
		this.dir = dir;
		this._timer = new cc.Timer();
		this._timer.initWithTarget(this, "selector");
		this._animations = new Object();
		this._hits = new Object();
		this._hits.lpunch = false;
		this._hits.hpunch = false;
		this._hits.lkick = false;
		this._hits.hkick = false;
		
		//this.addAnimation('stay', stayRect, 0.2);
		/*
		this.addAnimation('walkback', walkBackRect, 0.2);
		this.addAnimation('walkforward', walkForwardRect, 0.2);
		this.addAnimation('duck', duckingRect, 0.1);
		this.addAnimation('jump', jumpingRect, 0.1);
		this.addAnimation('jumpforward', jumpforwardRect, 0.1);
		this.addAnimation('hpunch', highPunchRect, 0.13);
		this.addAnimation('lpunch', lowPunchRect, 0.1);
		this.addAnimation('hkick', highKickRect, 0.15);
		this.addAnimation('lkick', lowKickRect, 0.1);
		this.addAnimation('hdownpunch', hdownPunchRect, 0.14);
		this.addAnimation('ldownpunch', ldownPunchRect, 0.12); 
		this.addAnimation('hdownkick', hdownPunchRect, 0.14);
		this.addAnimation('ldownkick', hdownPunchRect, 0.12);

		this.addAnimation('block', blockingRect, 0.1);
		this.addAnimation('blockdown', blockingdownRect, 0.1)
		
		if(dir == 0) {
			this.addAnimation('hit', hitRect, 0.1);
			this.addAnimation('facehit', facehitRect, 0.1);
			this.addAnimation('victory', victoryRect, 0.1);
		}
		else {
			this.addAnimation('hit', hitRectK, 0.1);
			this.addAnimation('facehit', facehitRectK, 0.1);
			this.addAnimation('victory', victoryRectK, 0.1);
		}
		
		this._forever =  new cc.RepeatForever.create(this._animations['stay']);
		this._forever.setOriginalTarget(this);
		this._forever.setTag(1);
		this._curentAction = new cc.Action();
		this.runAnimation('stay', 0);
		*/
	},

	addAnimation: function(name, framesRect, delay, loop) {
		var animFrames = [];

        var anim = new cc.Animation();
        for(var j in framesRect) {
            var spriteFrame = cc.SpriteFrame.createWithTexture(this.texture, framesRect[j]);
            animFrames.push(spriteFrame);
            
        }

		anim.initWithAnimationFrames(framesRect, delay, loop)
        //var animation =  cc.Animation.create(animFrames, delay);
        //var animation = cc.Animation.create(animFrames, delay);
		//var animate =  cc.Animate.create(animation); 

       	this._animations[name] = anim; 
       	this._animations[name].setTarget(this);     
      
	},

	runAnimation: function (name) {		
		if(name == 'stay') 
		{
			if(this.numberOfRunningActions() == 0)
			{
				this._curentAction = this.runAction(this._forever);
			}
		}
		else
		{
			if(this.numberOfRunningActions() == 0)
			{
				this._curentAction = this.runAction(this._animations[name]);
			}
			else
			{
				this.getActionManager().removeAction(this._forever);
				this._curentAction = this.runAction(this._animations[name]);
			}
		}
	},

	stopAnimation: function (name) {
		this.stopAction(this._animations[name]);
		this._isAnimated = false;
	},

	// переписать это используя State Machine
    animationLogic: function (dt) {
    	if(this._isMoveBack) {	
    		if(!this._isAnimated)
			{
    			this.runAnimation('walkback', 1);	
    			this._isAnimated = true;
    		}
    				
    	}
    	if(this._isMoveForward)
		{
    		if(!this._isAnimated)
			{
    			this.runAnimation('walkforward', 1);	
    			this._isAnimated = true;
    		}		
    	}
		if(!this._isMoveForward && !this._isMoveBack)
		{
    		var f = false;
    		if( ( f = (!this._animations['walkforward'].isDone()) ) ||
				!this._animations['walkback'].isDone()) 
			{
				this._isAnimated = false;
				if(f)
				{
					this.stopAction(this._animations['walkforward']);
				}
				else 
				{
					this.stopAction(this._animations['walkfback']);
				}
    			this.runAnimation('stay', 0);
    		}
    			
    		if(this._isAnimated) 
			{
    			this.getActionManager().removeAction(this._curentAction);
    			this._isAnimated = false;
    		} 
    		this.runAnimation('stay', 0);
    	}   

    	if(this._isDucking)
		{
    		this.getActionManager().removeAction(this._forever);
    		this.runAnimation('duck');

    		if(this._animations['duck'].isDone()) 
			{
    			this.stopAction(this._animations['duck']);
    		}
    	}

		var curhit;
		if(( curhit = this.checkHits()) != false) {
			if(!this._isAnimated) {
				switch(curhit) {
					case 'hpunch':
						this.getActionManager().removeAction(this._forever);
						if(this._isDucking) {
							this.runAnimation('hdownpunch');
						}else {
							this.runAnimation('hpunch');
						}
						this._isAnimated = true;
						this._hits.hpunch = false;
						break;
					case 'lpunch':
						this.getActionManager().removeAction(this._forever);
						if(this._isDucking) {
							this.runAnimation('ldownpunch');
						}else {
							this.runAnimation('lpunch');
						}
						this._isAnimated = true;
						this._hits.lpunch = false;
						break;
					case 'hkick':
						this.getActionManager().removeAction(this._forever);
						if(this._isDucking) {
							this.runAnimation('hdownkick');
						}else {
							this.runAnimation('hkick');
						}
						this._isAnimated = true;
						this._hits.hkick = false;
						break;
					case 'lkick':
						this.getActionManager().removeAction(this._forever);
						if(this._isDucking) {
							this.runAnimation('ldownkick');
						}else {
							this.runAnimation('lkick'); 
						}
						this._isAnimated = true;
						this._hits.lkick = false;
						break;
				}
			}		
		}

	if(this._isBlocking) {
	    this.getActionManager().removeAction(this._forever);
	    //if(this._isDucking)
    	//	this.runAnimation('blockdown');
    	//else
    		this.runAnimation('block');

    	if(this._animations['block'].isDone()) {
	    	this.stopAction(this._animations['block']);
    	}		
      	if(this._animations['blockdown'].isDone()) {
	    	this.stopAction(this._animations['blockdown']);
    	}	  	
	}

    },

	update: function (dt) {
		this.x = this.getPositionX();
		this.y = this.getPositionY();
		

		for(var i in this._animations) {
			if(this._animations[i].isDone()) {
				this._isAnimated = false;
			} 		
		}
		//this.animationLogic(dt);
 		if( (this._isMoveBack && this.dir == 0) || (this._isMoveForward && this.dir == 1) )  {
            this.x -= this._walkSpeed*dt;
        } else if ( (this._isMoveForward && this.dir == 0) || (this._isMoveBack && this.dir == 1) ) {
            this.x += this._walkSpeed*dt;
        }
        else {
        }
        this.setPosition(this.x, this.y);   

        //this._timer.update(dt);  
	},

	reverse: function() {
		this.setScaleX(-1);
	},

	checkHits: function () {
		for(var i in this._hits) {
			if(this._hits[i] == true)
				return i;
		}
		return false;
	}
});