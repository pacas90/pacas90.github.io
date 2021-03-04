
function getProp(el, style) {
    return parseInt(window.getComputedStyle(el).getPropertyValue(style),10);
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tune_buttons = document.querySelectorAll(".tune-buttons");
const tune_slider = document.querySelectorAll(".tune-slider-container");
const tune_slider_active = document.querySelectorAll(".tune-slider-active");
const tune_percentage = document.querySelectorAll(".tune-slider-text");
let x;
let percentage;
let filterPercentage = 100;
let ratio;
var index;
let effect; //tune selected
let effectUnit; //unit of measurement
let defaultValue;
let maxValue;
let steps; 


var Tune = {
	disable: function() {
		
  if(document.querySelector(".temp-canvas") !== null) {
    ctx.filter = document.querySelector(".temp-canvas").getContext("2d").filter;
    ctx.drawImage(canvas,0,0);
  }
  
 	for(let i = 0; i < tune_slider.length; i++) {
 		tune_slider[i].classList.remove("show-tune-slider");
 		tune_buttons[i].classList.remove("tune-toggled-btn");
 	}
 	if(document.querySelector(".temp-el") !== null) {
   	document.querySelector(".temp-el").remove();
  }
 	if(document.querySelector(".temp-canvas") !== null) {
  	document.querySelector(".temp-canvas").remove();
  }
  setTimeout(function(){
  document.getElementById("canvas").style.opacity = 1;
  },100);
	},
  
	add: function(x) {
		 
		switch(x) {
			case 0:
				effect = "saturate(";
				effectUnit = "%";
				defaultValue = 50;
				maxValue = 100;
				steps = 2;
				break;
			case 1: 
				effect = "brightness(";
				effectUnit = "%";
				defaultValue = 50;
				maxValue = 100;
				steps = 2;
				break;
			case 2: 
				effect = "hue-rotate(";
				effectUnit = "deg";
				defaultValue = 0;
				maxValue = 90;
				steps = 4;
				break;
			case 3:
				effect = "contrast(";
				effectUnit = "%";
				defaultValue = 50;
				maxValue = 100;
				steps = 2;
				break;
			case 4: 
				effect = "blur(";
				effectUnit = "px";
				defaultValue = 0;
				maxValue = 100;
				steps = 1/5;
				break;
			default:
			  console.log("no effect");
		}
		
		
		
		const tempEl = document.createElement("div");
		document.body.appendChild(tempEl);
		tempEl.classList.add("temp-el");
	  ratio = getProp(tempEl,"width")/100;
		tune(x,tempEl);
    
 	 var filterValue = ctx.filter;
 	 if(filterValue !== "none") {
     filterValue = filterValue.replace(/\D/g,'');
 	 }

   	tune_slider_active[x].style.width = defaultValue+effectUnit;
   	tune_percentage[x].innerHTML = defaultValue+effectUnit;

  
		function tune(index,el) {
		
		el.addEventListener("touchmove",touchmove);
		el.addEventListener("touchstart",touchstart);
    
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
		const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.classList.add("temp-canvas")
		document.getElementById("canvas-div").appendChild(tempCanvas);
		canvas.style.opacity = 0;
    tempCanvas.style.width = getProp(canvas,"width")+"px";
  	tempCanvas.style.height = getProp(canvas,"height")+"px";
  	
    var style = window.getComputedStyle(canvas);
    var matrix = new WebKitCSSMatrix(style.transform);
    matrix.m42;
  	tempCanvas.style.transform = `translateY(${matrix.m42}px)`;
  				  	//downscaling to prevent lag
    let imgRatio;
    let imgWidth = canvas.width;
    let imgHeight = canvas.height;
    if(imgWidth > 1000) {
    	imgRatio = 1000/imgWidth;
    	imgWidth *= imgRatio;
    	imgHeight *= imgRatio;
    }
    if(imgHeight > 1000) {
    	imgRatio = 1000/imgHeight;
    	imgWidth *= imgRatio;
    	imgHeight *= imgRatio
    }
    tempCanvas.height = imgHeight;
    tempCanvas.width = imgWidth;
    tempCtx.drawImage(canvas,0,0,canvas.width,canvas.height,0,0,tempCanvas.width,tempCanvas.height);
     

		function touchX(e) {
			x = e.touches[0].clientX - tempEl.getBoundingClientRect().left
		}
  
    function touchstart(e) {
			touchmove(e);
		}
		function touchmove(e) {
			touchX(e);
	  	percentage = Math.abs(Math.round(x/ratio));
	  	if(x < 0) {
	  		percentage = 0;
	  	}
  		if(percentage > maxValue) {
	  		percentage = maxValue;
	  	}
			tune_percentage[index].innerText = percentage+effectUnit;
			tune_slider_active[index].style.width = percentage/(maxValue/100)+"%";
    
    	filterPercentage = percentage*steps;
      tempCtx.filter = effect+filterPercentage+effectUnit+")";
      tempCtx.drawImage(canvas,0,0,canvas.width,canvas.height,0,0,tempCanvas.width,tempCanvas.height);
    
     //blur to temp canvas applies differently than main canvas
		}
	
		
	
	}

}
}


export { Tune };