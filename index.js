import { Ripple } from "./modules/ripple.js";
import { toggleFullScreen } from "./modules/functions.js";
import { zoomPic } from "./modules/zoom.js";

document.getElementById("fullscreen-toggle").addEventListener("click",function(){
	toggleFullScreen();
});

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click",  (event) => {
   Ripple.create({
     opacity: 0.3
   });
  })
);

const theme_toggle = document.querySelector("#slide-theme");
const optionalTheme = "theme-dark";
const defaultTheme = "theme-light";
	
function toggleTheme() {
	if(theme_toggle.getAttribute("data-checked") === "false") {
		document.documentElement.className = optionalTheme;
	}
	else {
		document.documentElement.className = defaultTheme;
	}
}



var theme = {
	button: document.getElementById("slide-theme"),
  behaviour: toggleTheme
}
var experimentalDesign = {
	button: document.querySelector("#experimental-design-button"),
	behaviour: function() {
	 	location.href = 'experimental-design.html'
	}
}
var experimentalFeatures = {
	button: document.getElementById("slide-zooming"),
	behaviour: function() {
		document.getElementById("canvas").style.transform = "none";
		zoomPic();
	}
}

var arr = [theme, experimentalDesign, experimentalFeatures];
for(let i = 0; i < arr.length; i++) {
	arr[i].button.addEventListener("click",function() {
		arr[i].behaviour();
	});
}



