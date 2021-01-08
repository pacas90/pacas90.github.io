
function getProp(el, style) {
    return parseInt(window.getComputedStyle(el).getPropertyValue(style),10);
}

let x, y, x1, y1 = 0;
let startX, startY, startX1, startY1,dx,dy,dx1,dy1,distance,distance1;
let i = 1;
let scale = 1;
let zoomIntensit = 1;
let zoomValue = 1;

function zoomPic() {

const hRatio = canvas.height/getProp(canvas,"height");
const wRatio = canvas.width/getProp(canvas,"width");

canvas.addEventListener("touchstart",touchstart);
canvas.addEventListener("touchmove",touchmove);
canvas.addEventListener("touchend",touchend);

function touchstart(e) {
	pos(e)
	startX = x;
	startY = y;
	if(e.touches.length == 2) {
		startX1 = x1;
		startY1 = y1;
	//	dx1 = Math.abs(startX1 - startX);
		//dy1 = Math.abs(startY1 - startY);
	//	distance = Math.sqrt(dx1*dx1+dy1*dy1);
/*	dx1 = Math.abs(x1 - x);
	dy1 = Math.abs(y1 - y);
	distance = Math.sqrt( (x1-x)*(x1-x)+(y1-y)*(y1-y) );*/
	}
}


function touchmove(e) {
	pos(e);
	var a;
	if(e.touches.length == 2) {
	dx = Math.abs(x1 - x);
	dy = Math.abs(y1 - y);
	distance1 = Math.sqrt( (x1-x)*(x1-x)+(y1-y)*(y1-y) );
	
	scale+=0.2;
	
	
	const cHeight = getProp(canvas,"height");
	const cWidth = getProp(canvas,"width");
	canvas.style.transition = "0.1s"
	canvas.style.transform =  "scale("+scale+")";
	

 }
}
function touchend(e) {
  zoomValue = scale;
}

function pos(e) {
	x = (e.touches[0].clientX - canvas.getBoundingClientRect().left)*wRatio;
	y = (e.touches[0].clientY - canvas.getBoundingClientRect().top)*hRatio;
	if(e.touches.length == 2) {
		x1 = (e.touches[1].clientX - canvas.getBoundingClientRect().left)*wRatio;
		y1 = (e.touches[1].clientY - canvas.getBoundingClientRect().top)*hRatio;
	}
}


}
export { zoomPic };