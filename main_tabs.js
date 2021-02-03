 import { Snackbar } from "./modules/snackbar.js";
 import { Tune } from "./modules/tune.js";
 import { Crop } from "./modules/crop.js";
 import { 
 	Dialog
 } from "./modules/ui.js";

 
 function getProp(el, style) {
    return parseInt(window.getComputedStyle(el).getPropertyValue(style),10);
}
 
 const sections = document.querySelectorAll(".sections");
 var sections_btn = document.getElementsByClassName("nav-btn");
  
 function openTab(x) {

  if(sections[x].classList.contains("show-section")) {
    sections[x].classList.remove("show-section");
    sections_btn[x].classList.remove("active-btn");
  }
  else {
    for(let i = 0; i < sections.length; i++) {
      sections[i].classList.remove("show-section");
      sections_btn[i].classList.remove("active-btn");
    }
    sections[x].classList.add("show-section");
    sections_btn[x].classList.add("active-btn");
  }
  

const tool_settings = document.querySelectorAll(".selected-tool-settings");
  	const tools = document.querySelectorAll(".tools");
    for(let i = 0; i < tool_settings.length; i++) {
    	tool_settings[i].classList.remove("open-selected-tool-settings");
    	if(tools[i].classList.contains("active-tool-btn") && sections[1].classList.contains("show-section")) {
       	if(i !== 0) {
       	tools_settings[i].style.transition = "transform 0.3s"
    		tools_settings[i].classList.add("open-selected-tool-settings");
       	}
    	}
    	
    }

}



const styles_btn = document.querySelector("#styles-btn");
styles_btn.addEventListener("click", function() {
    openTab(0);
});
const tools_btn = document.querySelector("#tools-btn");
tools_btn.addEventListener("click", function() {
    openTab(1);
});
const download_btn = document.querySelector("#download-btn");
download_btn.addEventListener("click", function() {
    openTab(2);
});


const open_btn = document.querySelector("#open-btn");
open_btn.addEventListener("click", function() {
  document.querySelector("input[type=file]").click();
});
const settings_btn = document.getElementById("settings-btn");
const settings_section = document.querySelector(".settings-section");
settings_btn.addEventListener("click", function() {
  settings_section.classList.toggle("show-settings");
  settings_btn.classList.toggle("active-top-nav");
});


const tools = document.querySelectorAll(".tools");
const tools_settings = document.querySelectorAll(".selected-tool-settings"); 

for(let i = 0; i < tools.length; i++) {
  tools[i].onclick = function() {
    openToolSettings(i);
  }
}



var h = 0;
var a = 0;
var b = 0
const canvasDiv = document.getElementById("canvas-div");

var push = {
	reset: function() {
		canvasDiv.style.transform = "translateY(0px)";
	},
	move: function() {
		a = 0;
		h = 0;
	  canvasDiv.style.transition = "0.3s"
		for(let o = 0; o < sections.length; o++) {
	  	if(sections[o].classList.contains("show-section")) {
	  		a = getProp(sections[o],"height");
	  	}
		}
	 	for(let i = 0; i < tools_settings.length; i++) {
		  if(tools_settings[i].classList.contains("open-selected-tool-settings") && i !== 0) {
		   	h = getProp(tools_settings[i],"height");
		   	a += h;
		  }
	 	}
		 
   
	   a = (a/2) *(-1)
		 if(getProp(canvasDiv,"height") < 51+51+h+getProp(canvas,"height") && h !== 0) {
		   canvasDiv.style.transform = `translateY(${a}px) scale(0.9)`;
	   }
		 else {
		   canvasDiv.style.transform = `translateY(${ a }px) scale(1)`;
		 }
	  
	}
}
const m = document.querySelectorAll("button");
for(let i = 0; i < m.length; i++) {
  m[i].addEventListener("click", () => {
		push.move()
	})
}
	




	

function openToolSettings(index) {
    disableToolsFunctions();
	if(parseInt(window.getComputedStyle(document.getElementById("canvas")).getPropertyValue("width"),10) > 0) {
  if(tools_settings[index].classList.contains("open-selected-tool-settings")) {
    tools_settings[index].classList.remove("open-selected-tool-settings");
    tools[index].classList.remove("active-tool-btn");
  }
  else {
    for(let i = 0; i < tools_settings.length; i++) {
    	disableToolsFunctions()
      tools_settings[i].classList.remove("open-selected-tool-settings");
      tools[i].classList.remove("active-tool-btn");
    }
    tools_settings[index].classList.add("open-selected-tool-settings");
   if(index !== 0) {
   }
    tools[index].classList.add("active-tool-btn");
    if(index === 0) {
    	  
   	Crop.disable();
    Crop.add("free-size",canvas);
    tools[0].classList.add("active-tool-btn");
    canvas.addEventListener("touchend",function() {
    	if(tools[0].classList.contains("active-tool-btn")) {
      	document.getElementById("confirm-crop").classList.add("show-confirm-crop");
    	}
   	});
    }
    
	}
	}
	else {
		Snackbar.show({
    text: "No photo added!",
    duration: 1000,
    icon: "<i class='material-icons'>error_outline</i"
  });
	}
}




function disableToolsFunctions() {
  Crop.disable();
	Tune.disable();
  document.getElementById("canvas").style.transition = "0.2s"
}

const download_toggle_btns = document.querySelectorAll("#download-btn-toggle .button-toggle-btn");
const file_extension = document.querySelector(".fancy-input a");

for(let i = 0; i < download_toggle_btns.length; i++) {
	download_toggle_btns[i].addEventListener("click",function(){
		file_extension.innerHTML = download_toggle_btns[i].innerText;
	});
}

const tune_buttons = document.querySelectorAll(".tune-buttons");
const tune_slider = document.querySelectorAll(".tune-slider-container");


for(let i = 0; i < tune_buttons.length; i++) {
  tune_buttons[i].addEventListener("click",function(){
  	if(!tune_buttons[i].classList.contains("toggled-btn")) {
  	
	  Tune.disable();
	  tune_buttons[i].classList.add("toggled-btn");
	  tune_slider[i].classList.add("show-tune-slider");
	  Tune.add(i);
  	}
  	else {
     Tune.disable();
    }
  });
}

const newImageButton = document.getElementById("open-btn");
const newImageDialog = new Dialog("#open-image");
newImageDialog.create({
	width: "300px",
	height: "310px",
	bgColor: "var(--secondary-color)",
	textColor: "var(--text-color)"
});
newImageButton.addEventListener("click", function() {
newImageDialog.show()
});
document.getElementById("file-dialog-cancel").addEventListener("click",function(){
	newImageDialog.hide();
});



