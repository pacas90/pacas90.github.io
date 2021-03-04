 import { Snackbar } from "./modules/snackbar.js";
 import { Tune } from "./modules/tune.js";
 import { Crop } from "./modules/crop.js";
 import Rotate from "./modules/rotate.js";
 import Dropdown from "./modules/dropdown-menu.js";
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
       	tools_settings[i].style.transition = "transform 0.3s"
    		tools_settings[i].classList.add("open-selected-tool-settings");
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
	  canvasDiv.style.transition = "transform 0.3s"
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

var showClasses = [
  "no-gui", //crop
  "open-selected-tool-settings", //tune
  "paint-tool-settings-show", //paint
  "no-gui-unactive", //rotate
  "open-selected-tool-settings",
  "open-selected-tool-settings",
  "open-selected-tool-settings",
  "open-selected-tool-settings"
];
function enableToolFunction(index) {
	switch(index) {
		case 0:
		  Crop.disable();
			Crop.add("free-size",canvas);
		  Crop.applyBar("show");
			break;
		case 3:
			Rotate.clockwise({
    		deg: 90
    	});
    	tools_settings[3].className = "selected-tool-settings"
			break;
		default: 
		  break;
	}
}

function disableToolsFunctions() {
	Crop.disable(); //disabling crop
  Crop.applyBar("hide");
	Tune.disable(); //disabling tune
}
function hasClass(el,cssClass) {
	if(el.classList.contains(cssClass)) {
		return true;
	}
	else {
		return false;
	}
}
	
function openToolSettings(index) {
	//disable functions first
	disableToolsFunctions();
	//check if image is drawn
	if(getProp(canvas,"width") > 0) { 
  	if(hasClass(tools_settings[index],showClasses[index])) {
	  	//remove active button class and hide section
      tools[index].classList.remove("active-tool-btn");
	  	tools_settings[index].classList.remove(showClasses[index]);
    	disableToolsFunctions();
  	}
  	else {
  	  //hide all sections and remove active classes
	  	for(let i = 0; i < tools_settings.length; i++) {
		  	if(hasClass(tools_settings[i],showClasses[i])) {
			   	tools_settings[i].classList.remove(showClasses[i]);
			    tools[i].classList.remove("active-tool-btn");
		  	}
	  	}
		
	  	//add classes only to clicked
     if(showClasses[index] !== "no-gui-unactive") {
      	tools[index].classList.add("active-tool-btn");
     }
	   tools_settings[index].classList.add(showClasses[index]);
	   enableToolFunction(index);
	  }
	}
	//if image isnt drawn then show snackbar
	else {
		Snackbar.show({
			text: "No photo added!",
      duration: 1000,
      icon: "<i class='material-icons'>error_outline</i>"
		});
	}
}
	
	

const download_toggle_btns = document.querySelectorAll("#download-btn-toggle .button-toggle-btn");
const file_extension = document.querySelector("#file-name-container");

for(let i = 0; i < download_toggle_btns.length; i++) {
	download_toggle_btns[i].addEventListener("click",function(){
		file_extension.children[2].innerHTML = download_toggle_btns[i].innerText;
	});
}
const tune_buttons = document.querySelectorAll(".tune-buttons");
const tune_slider = document.querySelectorAll(".tune-slider-container");
for(let i = 0; i < tune_buttons.length; i++) {
  tune_buttons[i].addEventListener("click",function(){
  	if(!tune_buttons[i].classList.contains("tune-toggled-btn")) {
  	
	  Tune.disable();
	  tune_buttons[i].classList.add("tune-toggled-btn");
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


const whatsNewDialog = new Dialog("#whats-new-dialog");
whatsNewDialog.create({
  width: "300px",
	height: "310px",
	bgColor: "var(--secondary-color)",
	textColor: "var(--text-color)"
});
document.getElementById("whats-new-settings").addEventListener("click",function() {
	whatsNewDialog.show();
});

const accentColorDialog = new Dialog("#accent-color-dialog");
accentColorDialog.create({
	width: "270px",
	height: "300px",
	bgColor: "var(--secondary-color)",
	textColor: "var(--text-color)"
});
document.getElementById("accent-color-settings").addEventListener("click",function() {
	accentColorDialog.show();
});

