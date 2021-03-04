const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = 1000;


function resetCoords() {
  Crop.x1 = null;
  Crop.y1 = null;
  Crop.x2 = null;
  Crop.y2 = null;
}
function getProp(el, style) {
    return parseInt(window.getComputedStyle(el).getPropertyValue(style),10);
}


  function showApply() {
      	document.getElementById("confirm-crop").classList.add("show-confirm-crop");
    	};
        
  
  var Crop = {
  	applyBar: function(arg) {
  		if(arg === "show") {
  		canvas.addEventListener("touchend",showApply) 
  		}
  		else {
  			canvas.removeEventListener("touchend",showApply);
  		}
  		
  	},
  	disable: function() {
  	
  		if(document.getElementById("canvas-area-crop") !== null) {
  	  	document.getElementById("canvas-area-crop").remove();
  		}
  		
  		const tools = document.querySelectorAll(".tools");
      const tools_settings = document.querySelectorAll(".selected-tool-settings");
      document.getElementById("confirm-crop").classList.remove("show-confirm-crop");
      canvas.removeEventListener("touchend",showApply);
    	
  	},
    add: function(style,el) {
    	 
        var style = arguments[0];
        Crop.x1 = null;
        Crop.y1 = null;
        Crop.x2 = null;
        Crop.y2 = null;
        let touchX,
            touchY,
            canvasArea,
            cropArea,
            cssWidth = getProp(el,"width"),
            cssHeight = getProp(el,"height"),
            startX,
            startY,
            movingEnabled = false,
            dx,
            dy,
            wRatio = el.width/cssWidth,
            hRatio = el.height/cssHeight,
            rect = el.getBoundingClientRect(),
            cRect = document.getElementById("canvas-div").getBoundingClientRect()
      
            
    canvasArea = document.createElement("div");
    canvasArea.classList.add("canvas-area");
    //document.body.appendChild(canvasArea);
    document.getElementById("canvas-div").appendChild(canvasArea);
    canvasArea.setAttribute("id","canvas-area-crop");
    canvasArea.style.width = getProp(canvas,"width")+"px";
    canvasArea.style.height = getProp(canvas,"height")+"px";
 
            
       function updateCoords() {
  Crop.x1 = cropArea.offsetLeft*wRatio;
  Crop.y1 = cropArea.offsetTop*hRatio;
  Crop.x2 = (cropArea.offsetLeft+getProp(cropArea,"width"))*wRatio;
  Crop.y2 = (cropArea.offsetTop+getProp(cropArea,"height"))*hRatio;
  Crop.width = getProp(cropArea,"width")*wRatio;
  Crop.height = getProp(cropArea,"height")*hRatio;
}
        function createCrop() {
    cropArea = document.createElement("div");
    cropArea.classList.add("crop-area");
    canvasArea.appendChild(cropArea);
    cropArea.style.top = startY/(hRatio)+"px";
    cropArea.style.left = startX/(wRatio)+"px";
  }
        el.addEventListener("touchstart",touchstart);
        el.addEventListener("touchmove", touchmove);
        el.addEventListener("touchend", touchend);
       
        function touchPos(e) {
          touchX = (e.touches[0].clientX - rect.left)*wRatio;
          touchY = (e.touches[0].clientY - rect.top - (cRect.top-25))*hRatio;
        }
      
        function touchstart(e) {
          touchPos(e);
          startX = touchX;
          startY = touchY;
          
          if(cropArea && !movingEnabled) {
            cropArea.remove();
          }

          if(Crop.x1 === null) {
            createCrop();
          }
          else {
            if(touchX >= Crop.x1 && touchY >= Crop.y1 && touchX <= Crop.x2 && touchY <= Crop.y2) {
              
              movingEnabled = true;
  
              let cropRect = cropArea.getBoundingClientRect();
              dx = Math.abs((cropRect.left - rect.left)*wRatio - touchX);
              dy = Math.abs((cropRect.top - rect.top -(cRect.top-25))*hRatio - touchY);
              moveArea(e);
            }
            else {
              cropArea.remove();
              createCrop();
              movingEnabled = false;
            }
          }
      
       
        }
        
        function touchmove(e) {
          touchPos(e);
          e.preventDefault();
          if(movingEnabled === false) {
            if(touchX < canvas.width && touchY < canvas.height && touchX > 0 && touchY > 0) {
           
             if(touchX - startX >= 0 && touchY - startY >= 0) {
                if(style === "free-size") {
                cropArea.style.width = (touchX - startX)/(wRatio) + "px";
                cropArea.style.height = (touchY - startY)/(hRatio) + "px";
                }
                 if(style === "square") {
                  cropArea.style.width = (touchX - startX)/(wRatio) + "px";
                  cropArea.style.height = (touchX - startX)/(wRatio) + "px";
                }
               }
              }
             else {
              	if(touchX >= canvas.width && touchY < canvas.height) {
              	cropArea.style.width = canvas.width + "px";
                cropArea.style.height = (touchY - startY)/(hRatio) + "px";
              	}
                if(touchY >= canvas.height && touchX < canvas.width) {
                cropArea.style.width = (touchX - startX)/(wRatio) + "px";
                cropArea.style.height = canvas.height + "px";
                }
              }
              }
             /*  if(touchX - startX <= 0) {
                cropArea.style.width = 0+"px";
                cropArea.style.height = (touchY - startY)/hRatio + "px";
              }
              if(touchY - startY <= 0) {
                cropArea.style.height = 0+"px";
                cropArea.style.width = (touchX - startX)/wRatio + "px";
              }*/
              
            
           
          
          else {
            movingEnabled = true;
            moveArea(e);
          }
          updateCoords();
        }
        
        function touchend() {
          updateCoords();
          movingEnabled = true;
        }
        
        function moveArea(e) {
          touchPos(e);
          
          let movedX = touchX - dx;
          let movedY = touchY - dy;
          let width = getProp(cropArea, "width")*wRatio;
          let height = getProp(cropArea, "height")*hRatio;
          
          const cropRect = cropArea.getBoundingClientRect();
      
          if(movedX+width <= canvas.width && movedX >= 0 && movedY+height <= canvas.height && movedY >= 0) {
            cropArea.style.left = movedX / wRatio + "px";
            cropArea.style.top = movedY / hRatio + "px";
          }
          
          if(movedX +dx>= canvas.width) {
            cropArea.style.left = (canvas.width-width)/wRatio+"px"
          }
          if(movedX+dx <= 0) {
            cropArea.style.left = 0+"px"
          }
          
          if(touchY >= canvas.height) {
            cropArea.style.top = (canvas.height-height)/hRatio+"px"
          }
          if(touchY <= 0) {
            cropArea.style.top = 0+"px"
          }
          //allow crop area "slide" when touching border
          if(movedX+width >= canvas.width || movedX <= 0) {
            if(movedY >= 0 && movedY+height <= canvas.height) {
              cropArea.style.top = movedY / hRatio + "px";
            }
          }
          if(movedY+height >= canvas.height || movedY <= 0) {
            if(movedX+width <= canvas.width && movedX >= 0) {
              cropArea.style.left = movedX / wRatio + "px";
            }
          }
        } 
        
    }
  }
  

  
  
  
  export {Crop, getProp};
  




  
  
   