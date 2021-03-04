let degrees = 0;
let tempCtx;
let temp;



var Rotate = {
	clockwise: function(arg) {
   
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    temp = document.createElement("canvas");
    tempCtx = temp.getContext("2d");
    temp.width = canvas.width;
    temp.height = canvas.height;
    tempCtx.drawImage(canvas,0,0);
   
    degrees = arg.deg; 
    
    const style = window.getComputedStyle(canvas);
    var w = style.getPropertyValue("width");
    var h = style.getPropertyValue("height");
    canvas.style.transition = "transform 0.3s"
    canvas.style.transform = `rotate(${arg.deg}deg)`;
    canvas.addEventListener("transitionend",function() {
   
    canvas.style.transition = "0s";
    canvas.style.transform = "rotate(0deg)";
    canvas.style.width = h;
    canvas.style.height = w;
    
    if((degrees/30) % 2 == 1) {
      canvas.width = temp.height;
      canvas.height = temp.width;
    } 
    else {
      canvas.width = temp.width;
      canvas.height = temp.height;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
  
    ctx.save()
    if((degrees/30) % 2 == 1) {
      ctx.translate(temp.height/2,temp.width/2);
    } 
    else {
      ctx.translate(temp.width/2,temp.height/2);
    }
    ctx.rotate(degrees*Math.PI/180);
    ctx.drawImage(temp,-temp.width/2,-temp.height/2);
    ctx.restore();
 //   temp.remove();
    });

   
 
    
	}
}

export default Rotate;

