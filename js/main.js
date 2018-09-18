var can1, can2, ctx1, ctx2;
var lastTime, deltaTime;
var canWidth, canHeight;
var bgPic = new Image();
var ane, fruit, mom, baby;
var mx,my;
var babyTail = [];
var babyEye = [];
var babyBody = [];
var bigTail = [];
var bigEye =[];
var bigBodyOra = [];
var bigBodyBlue = [];
var data;
var halo;
var dust;
var dustPic = [];

var wave;
document.body.onload = game;
function game(){
	console.log("onload");
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext('2d');
	can2 = document.getElementById("canvas2");
	ctx2 = can2.getContext('2d');
	ctx1.font = "20px Verdana";
	ctx1.textAlign = "center";
	ctx1.fillStyle = "white";
	can1.addEventListener('mousemove', onMouseMove, false);
	bgPic.src = "./src/background.jpg";
	canWidth = can1.width;
	canHeight = can1.height;
	ane = new aneObj();
	ane.init();
	fruit = new fruitObj();
	fruit.init();
	mom = new momObj();
	mom.init();
	baby = new babyObj();
	baby.init();
	mx = canWidth *.5;
	my = canHeight *.5;

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i = 0; i<8; i++){
		babyTail[i] = new Image();
		babyTail[i].src="./src/babyTail" + i + ".png";
	}
	for(var i=0; i<2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";
	}
	for(var i=0; i<20; i++){
		babyBody[i] = new Image();
		babyBody[i].src="./src/babyFade" + i + ".png";
	}

	for (var i=0; i<8; i++){
		bigTail[i] = new Image();
		bigTail[i].src = "./src/bigTail" + i + ".png";
	}
	for(var i=0; i<2; i++){
		bigEye[i] = new Image();
		bigEye[i].src = "./src/bigEye" + i + ".png";
	}
	for(var i=0; i<8; i++){
		bigBodyOra[i] = new Image();
		bigBodyBlue[i] = new Image();
		bigBodyOra[i].src = "./src/bigSwim" + i + ".png";
		bigBodyBlue[i].src = "./src/bigSwimBlue"+ i + ".png";
	}

	data = new dataObj();

	for(var i=0; i<7; i++){
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" +i+ ".png";
	}

	dust = new dustObj();
	dust.init();

}
function gameloop(){
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime>40) deltaTime=40;
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0,0,canWidth,canHeight);
	momFruitCollision();
	momBabyCollision();
	mom.draw();
	baby.draw();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX || e.layerX)
		{

			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
}