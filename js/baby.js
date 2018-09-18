var babyObj =function(){
	this.x;
	this.y;
	this.angle;
	this.babyTailTimer = 0;
	this.babyTailCount = 0;
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;
	this.babyBodyTimer = 0;
	this.babyBodyCount =0;
}
babyObj.prototype.init = function(){
	this.x = canWidth * .5;
	this.y = canHeight * .5;
	this.angle =0;
}

babyObj.prototype.draw = function(){
	
	this.x = lerpDistance(mx, this.x, 0.98);
	this.y = lerpDistance(my, this.y, 0.98);

	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;

	this.angle = lerpAngle(beta, this.angle, 0.9);

	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer >50){
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval)
	{
		this.babyEyeCount = (this.babyEyeCount + 1) %2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if(this.babyEyeCount ==0){
			this.babyEyeInterval = Math.random() * 1500 +2000;
		}else{
			this.babyEyeInterval=200;
		}
	}

	this.babyBodyTimer+= deltaTime;
	if(this.babyBodyTimer> 300){
		this.babyBodyCount = (this.babyBodyCount + 1);
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			data.gameOver = true;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(babyBody[this.babyBodyCount],  -babyBody[this.babyBodyCount].width* .5, -babyBody[this.babyBodyCount].height *.5);
	ctx1.drawImage(babyEye[this.babyEyeCount], -babyEye[this.babyEyeCount].width* .5, -babyEye[this.babyEyeCount].height *.5);
	ctx1.drawImage(babyTail[this.babyTailCount],  -babyTail[this.babyTailCount].width* .5+30, -babyTail[this.babyTailCount].height *.5);
	ctx1.restore();
}