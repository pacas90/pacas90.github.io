import { Crop, getProp } from "./modules/crop.js";
import { Tune } from "./modules/tune.js";
import { Snackbar } from "./modules/snackbar.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 100;
canvas.height = 100;


const fileInput = document.querySelector("#file-input");
fileInput.addEventListener("change",loadImage);


function loadImage() {
	
	Tune.disable();
	Crop.disable();
	
  var file = fileInput.files[0];
  var img = new Image();
  var reader = new FileReader();
  reader.onload = function() {
    img.src = reader.result;
  }
  reader.readAsDataURL(file);
  img.onload = function() {
    drawImage(img);
  }
}

function drawImage(image) {
  canvas.width = image.width;
  canvas.height = image.height;
  var maxHeight = screen.width;
  var maxWidth = screen.width;
  var minHeight = screen.width;
  var minWidth = screen.width;
  var ratio = 0;
  var width = image.width;
  var height = image.height;
  if(height < minHeight) {
  	ratio = height/minHeight;
  	height /= ratio;
  	width /= ratio;
  }
  if(width < minWidth) {
  	ratio = width/minWidth;
  	height /= ratio;
  	width /= ratio;
  }
  if(height > maxHeight) {
    ratio = maxHeight/height;
    height *= ratio;
    width *= ratio;
  }
  if(width > maxWidth) {
    ratio = maxWidth/width;
    height *= ratio;
    width *= ratio;
  }
  canvas.style.height = height+"px";
  canvas.style.width = width+"px";
  ctx.drawImage(image,0,0);
}
  

const crop = document.getElementById("crop-image");
crop.addEventListener("click",function() {
  
  let tempCanvas = document.createElement("canvas");
  let tempCtx = tempCanvas.getContext("2d");
  
  tempCtx.clearRect(0,0,canvas.width,canvas.height);
  tempCanvas.width = Crop.width;
  tempCanvas.height = Crop.height;
  var maxHeight = screen.height;
  var maxWidth = screen.width;
  var minHeight = 250;
  var minWidth = 250;
  var ratio = 0;
  var width = Crop.width;
  var height = Crop.height;
  
 if(height > maxHeight) {
    ratio = maxHeight/height;
    height *= ratio;
    width *= ratio;
  }
  if(width > maxWidth) {
    ratio = maxWidth/width;
    height *= ratio;
    width *= ratio;
  }
  	
  tempCanvas.style.height = height+"px";
  tempCanvas.style.width = width+"px";
  
  tempCtx.drawImage(canvas,Crop.x1,Crop.y1,Crop.width,Crop.height,0,0,tempCanvas.width,tempCanvas.height);
  if(Crop.width > 2 || Crop.height > 2) {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawImage(tempCanvas);
  }
 else {
 Snackbar.show({
    text: "ERROR: Could not draw image because area you are trying to crop is too small.",
    duration: 4000,
    icon: "<i class='material-icons'>error_outline</i",
    button: "OK",
    button_function: function() {
    	Snackbar.remove();
    }
 });
}
  tempCanvas.remove();
  disableTools();
  });

const tools = document.querySelectorAll(".tools");
const tools_settings = document.querySelectorAll(".selected-tool-settings"); 

function disableTools() {
	for(let i = 0; i < tools.length; i++) {
		
		tools[i].classList.remove("active-tool-btn");
	  tools_settings[i].classList.remove("open-selected-tool-settings");
	}
	Crop.disable();
	
		const tune_buttons = document.querySelectorAll(".tune-buttons");
 	  const tune_slider = document.querySelectorAll(".tune-slider-container");
   	for(let i = 0; i < tune_slider.length; i++) {
 		  tune_slider[i].classList.remove("show-tune-slider");
 		  tune_buttons[i].classList.remove("toggled-btn");
   	}
	
}

 
