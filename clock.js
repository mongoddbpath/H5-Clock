var dom = document.getElementById('clock');
var ctx =dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;


function drawBackground(){
	ctx.save();
	ctx.translate(r,r);		//调动原点
	ctx.beginPath();		//起始
	ctx.lineWidth = 10;		//填充的度
	ctx.arc(0,0,r-5,0,2*Math.PI,false);		//对齐
	ctx.stroke();

	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = '18px Arial';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	hourNumbers.forEach(function(number,i){
		var rad = 2 * Math.PI/12 * i;	//每个数字的角度为π	
		var x = Math.cos(rad) * (r - 30);
		var y = Math.sin(rad) * (r - 30);	//找到x,y坐标
		ctx.fillText(number,x,y);	//填充数字,画数字
	});

	for(var i =0;i < 60;i++){
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos(rad) * (r - 18);
		var y = Math.sin(rad) * (r - 18);
		ctx.beginPath();
		if(i%5 == 0){
			ctx.fillStyle = '#000';		//改变颜色
			ctx.arc(x,y,2,0,2 *Math.PI,false);
		}else{
			ctx.fillStyle = '#ccc';
			ctx.arc(x,y,2,0,2 *Math.PI,false);
		}

		ctx.fill();
	}				//画60个点


}

function drawHour(hour,minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 12 * hour;
	var mrad  = 2 * Math.PI / 12 / 60 * minute;
	ctx.rotate(rad + mrad);			//获取角度然后倾斜
	ctx.lineWidth = 5;			//宽度
	ctx.lineCap = 'round';		//定义线条是圆的
	ctx.moveTo(0,10);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();
}

function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad);	
	ctx.lineWidth = 3;			//前面画布环境没消除，所以旋转
	ctx.lineCap = 'round';		//定义线条是圆的
	ctx.moveTo(0,10);
	ctx.lineTo(0,-r + 30);
	ctx.stroke();
	ctx.restore();

}

function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle='#c14543';
	var rad = 2 * Math.PI / 60 * second;
	ctx.rotate(rad);	
	ctx.moveTo(-2,20);
	ctx.lineTo(2,20);
	ctx.lineTo(1,-r + 18);
	ctx.lineTo(-1,-r +18);
	ctx.fill();
	ctx.restore();
}

function drawDot(){
	ctx.beginPath();
	ctx.fillStyle='';
	ctx.arc(0,0,3,0,2 *Math.PI,false);
	ctx.fill();
}

//静态的时分秒Ok了



function draw(){
	ctx.clearRect(0,0,width,height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}


draw();
setInterval(draw,1000);
//普通时钟就此Ok