(function () {
    var d = document;
    var c = {
 
        menuType:'canvas',
        COCOS2D_DEBUG:2,
        box2d:false,
        chipmunk:false,
        showFPS:true,
        frameRate:60,
        loadExtension:true,
        tag:'gameCanvas', 
 
        engineDir:'./HTML5/cocos2d/',
        appFiles:[
            './src/resource.js',
            './src/animations.js',
            './src/MainLayer.js',
            './src/player.js',
            './src/main.js'
            
        ]
    };
 
    window.addEventListener('DOMContentLoaded', function () {
        var s = d.createElement('script');
 
        if (c.SingleEngineFile && !c.engineDir) {
            s.src = c.SingleEngineFile;
        }
        else if (c.engineDir && !c.SingleEngineFile) {
            s.src = c.engineDir + 'platform/jsloader.js';
        }
        else {
            alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
        }        
 
        document.ccConfig = c;
        s.id = 'cocos2d-html5';
        d.body.appendChild(s);
    });
})();