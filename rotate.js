function getProp(el, style) {
    return parseInt(window.getComputedStyle(el).getPropertyValue(style),10);
}

let angle = 0;

var Rotate = {
	clockwise: function(arg) {
    const ctx = canvas.getContext('2d');
  	const temp = document.createElement("canvas");
  	const tempCtx = temp.getContext("2d");
  	let width = canvas.width;
  	let height = canvas.height;
  	temp.width = width;
  	temp.height = height;
   
    let cssWidth = getProp(canvas,"width");
    let cssHeight = getProp(canvas,"height");
    
  /*  canvas.style.transform = `rotate(${90}deg)`;
    canvas.ontransitionend = () => {
      
      canvas.style.transition = "0s";
      canvas.style.transform = "rotate(0deg)"*/
    /*  angle = 90;
      tempCtx.translate(width/2,height/2);
      tempCtx.rotate(angle*Math.PI/180);
     // tempCtx.translate(-(width/2),-(height/2));
      tempCtx.drawImage(canvas,-canvas.width/2,-canvas.height/2);
      
      canvas.style.width = cssHeight+"px";
      canvas.style.height = cssWidth+"px";
      ctx.drawImage(temp,0,0);
      temp.remove();*/
  //  }
   angle = 90;
   tempCtx.drawImage(canvas,0,0);
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.save();
   ctx.translate(canvas.width/2,canvas.height/2);
   ctx.rotate(angle*Math.PI/180);
   canvas.style.height = cssWidth+"px";
   canvas.style.width = cssHeight+"px";
   ctx.drawImage(temp,-temp.width/2,-temp.height/2);
   ctx.restore();
 
    
	}
}

export default Rotate;

