var text1 = cc.TextureCache.getInstance().addImage(sh_ryu);
var text2 = cc.TextureCache.getInstance().addImage(sh_ken); 

// очень много дубляжа, сделать один метод для установки текстуры
function makeTexture(width, height, x, y, numberOfFrames) {
    var textureRect = [];

    for(var i=0; i < numberOfFrames; i++) {
        textureRect[i] = cc.rect(x, y, width, height);
        x += width;
    }

    return textureRect;
} 

var stayRect = makeTexture(50, 100, 0, 0, 4);
var walkForwardRect = makeTexture(50, 100, 200, 0, 4);

var walkBackRect = [];
var width = 50;
var height = 100;
var x = 200;
var y = 0;
for(var i=4; i>=0; i--) {
	walkBackRect[i] = cc.rect(x, y, width, height);
    x += width;
}

var duckingRect = [];
duckingRect[0] = cc.rect(1110, 0, 45, 100);
duckingRect[1] = cc.rect(1160, 0, 45, 100);

var blockingRect = [];
blockingRect[0] = cc.rect(1210, 0, 50, 100);

var blockingdownRect = [];
blockingdownRect[0] = cc.rect(1260, 30, 50, 70);

var jumpingRect = [];
jumpingRect[0] = cc.rect(450, 0, 45, 100);
jumpingRect[1] = cc.rect(495, 0, 45, 100);
jumpingRect[2] = cc.rect(540, 0, 37, 100);
jumpingRect[3] = cc.rect(577, 0, 37, 100);
jumpingRect[4] = cc.rect(614, 0, 37, 100);
jumpingRect[5] = cc.rect(651, 0, 45, 100);
jumpingRect[6] = cc.rect(696, 0, 45, 100);

var jumpforwardRect = [];
jumpforwardRect[0] = cc.rect(745, 0, 45, 100);
jumpforwardRect[1] = cc.rect(790, 0, 45, 100);
jumpforwardRect[2] = cc.rect(835, 0, 65, 100);
jumpforwardRect[3] = cc.rect(900, 0, 37, 100);
jumpforwardRect[4] = cc.rect(940, 0, 75, 100);
jumpforwardRect[5] = cc.rect(1020, 0, 45, 100);
jumpforwardRect[6] = cc.rect(1065, 0, 45, 100);

var lowPunchRect = [];
lowPunchRect[0] = cc.rect(0, 120, 50, 100);
lowPunchRect[1] = cc.rect(50, 120, 60, 100);
lowPunchRect[2] = cc.rect(115, 120, 50, 100);

var highPunchRect = [];
highPunchRect[0] = cc.rect(165, 120, 50, 100);
highPunchRect[1] = cc.rect(215, 120, 50, 100);
highPunchRect[2] = cc.rect(270, 120, 75, 100);
highPunchRect[3] = cc.rect(350, 120, 55, 100);
highPunchRect[4] = cc.rect(410, 120, 45, 100);

var lowKickRect = [];
lowKickRect[0] = cc.rect(0, 250, 50, 100);
lowKickRect[1] = cc.rect(55, 250, 75, 100);
lowKickRect[2] = cc.rect(130, 250, 50, 100);

var highKickRect = [];
highKickRect[0] = cc.rect(190, 250, 50, 100);
highKickRect[1] = cc.rect(240, 250, 60, 100);
highKickRect[2] = cc.rect(300, 250, 75, 100);
highKickRect[3] = cc.rect(375, 250, 65, 100);
highKickRect[4] = cc.rect(440, 250, 50, 100);

var ldownPunchRect = [];
ldownPunchRect[0] = cc.rect(10, 410, 50, 70);
ldownPunchRect[1] = cc.rect(60, 410, 65, 70);
ldownPunchRect[2] = cc.rect(127, 410, 50, 70);

var hdownPunchRect = [];
hdownPunchRect[0] = cc.rect(180, 410, 50, 70);
hdownPunchRect[1] = cc.rect(230, 410, 65, 70);
hdownPunchRect[2] = cc.rect(295, 410, 50, 70);
hdownPunchRect[3] = cc.rect(345, 410, 50, 70);

var ldownKickRect = [];
ldownKickRect[0] = cc.rect(660, 410, 50, 70);
ldownKickRect[1] = cc.rect(710, 410, 75, 70);
ldownKickRect[2] = cc.rect(790, 410, 50, 70);

var hdownKickRect = [];
hdownKickRect[0] = cc.rect(845, 410, 50, 70);
hdownKickRect[1] = cc.rect(900, 410, 90, 70);
hdownKickRect[2] = cc.rect(995, 410, 50, 70);

var hitRect = [];
hitRect[0] = cc.rect(0, 740, 50, 100);
hitRect[1] = cc.rect(50, 740, 50, 100);
hitRect[2] = cc.rect(100, 740, 60, 100);
hitRect[3] = cc.rect(160, 740, 50, 100);

var facehitRect = [];
facehitRect[0] = cc.rect(210, 740, 50, 100);
facehitRect[1] = cc.rect(260, 740, 60, 100);
facehitRect[2] = cc.rect(320, 740, 60, 100);
facehitRect[3] = cc.rect(380, 740, 60, 100);

var hitRectK = [];
hitRectK[0] = cc.rect(0, 760, 50, 100);
hitRectK[1] = cc.rect(50, 760, 50, 100);
hitRectK[2] = cc.rect(100, 760, 60, 100);
hitRectK[3] = cc.rect(160, 760, 50, 100);


var facehitRectK = [];
facehitRectK[0] = cc.rect(210, 760, 50, 100);
facehitRectK[1] = cc.rect(260, 760, 60, 100);
facehitRectK[2] = cc.rect(320, 760, 60, 100);
facehitRectK[3] = cc.rect(380, 760, 60, 100);

var victoryRect = [];
victoryRect[0] = cc.rect(0, 865, 50, 100);
victoryRect[2] = cc.rect(50, 865, 50, 100);
victoryRect[3] = cc.rect(100, 855, 50, 110);

var victoryRectK = [];
victoryRectK[0] = cc.rect(0, 885, 50, 100);
victoryRectK[2] = cc.rect(50, 885, 50, 100);
victoryRectK[3] = cc.rect(100, 875, 50, 110);