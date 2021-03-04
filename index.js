import { Ripple } from "./modules/ripple.js";
import { toggleFullScreen } from "./modules/functions.js";
import { zoomPic } from "./modules/zoom.js";

document.getElementById("fullscreen-toggle").addEventListener("click",function(){
	toggleFullScreen();
});

/*nstst buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click",  (event) => {
   Ripple.create({
     opacity: 0.3
   });
  })
);*/

const buttons = document.querySelectorAll("button, .settings-containers");
buttons.forEach(button => Ripple(button,event));

const theme_toggle = document.querySelector("#slide-theme");
const optionalTheme = "dark";
const defaultTheme = "light";
	
function toggleTheme() {
	if(theme_toggle.getAttribute("data-checked") === "false") {
		document.documentElement.className = optionalTheme;
		localStorage.setItem("theme","dark");
		updateAccentColorsDivs("dark");
		applyAccentColor("dark",localStorage.getItem("accent-color-index"));
	}
	else {
		document.documentElement.className = defaultTheme;
		localStorage.setItem("theme","light");
		updateAccentColorsDivs("light");
		applyAccentColor("light",localStorage.getItem("accent-color-index"));
	}
}

window.addEventListener("load",function() {
	if(localStorage.getItem("theme") !== null) {
		document.documentElement.className = localStorage.getItem("theme");
		updateAccentColorsDivs(localStorage.getItem("theme"));
		if(localStorage.getItem("theme") === "dark") {
			document.getElementById("slide-theme").click();
		}
	}
	let currentTheme = document.documentElement.className;
	if(localStorage.getItem("accent-color") !== null) {
	  applyAccentColor(currentTheme,localStorage.getItem("accent-color-index"));
	  for(let i = 0; i < colorsDiv.length; i++) {
      colorsDiv[i].innerHTML = "";
    }
  	colorsDiv[localStorage.getItem("accent-color-index")].innerHTML = "<i class='material-icons active-accent-color-icon'>done</i>";
	}
	else {
		applyAccentColor(currentTheme,0);
		colorsDiv[0].innerHTML = "<i class='material-icons active-accent-color-icon'>done</i>";
	}
});


var theme = {
	button: document.getElementById("slide-theme"),
  behaviour: toggleTheme
}
var experimentalFeatures = {
	button: document.getElementById("slide-zooming"),
	behaviour: function() {
		
	}
}

var arr = [theme, experimentalFeatures];
for(let i = 0; i < arr.length; i++) {
	arr[i].button.addEventListener("click",function() {
		arr[i].behaviour();
	});
}

const colorsDiv = document.querySelectorAll("#accent-color-dialog-colors div");

let colors = {
	light: [
  	"#f44336",
  	"#e91e63",
  	"#9c27b0",
  	"#6a1b9a",
  	"#3f50b5",
  	"#2196f3",
  	"#00bcd4",
    "#52c7b8",
    "#43a047",
    "#6c6e00",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#a98274",
    "#454545",
    "#000000"
  ],
	dark: [
    "#ef534e",
    "#ec407a",
    "#ba68c8",
    "#9575cd",
    "#7986cb",
    "#64b5f6",
    "#4dd0e1",
    "#4db6ac",
    "#81c784",
    "#aed581",
    "#dce775",
    "#fff176",
    "#ff9800",
    "#ff5722",
    "#a98274",
    "#ffffff"
  ]
}
var defaultColor = {
	light: colors['light'][0],
	dark: colors['dark'][0]
}
function updateAccentColorsDivs(theme,toggle) {
 	for(let i = 0; i < colorsDiv.length; i++) {
  	colorsDiv[i].style.backgroundColor = colors[theme][i];
  }
}

for(let i = 0; i < colorsDiv.length; i++) {
	colorsDiv[i].addEventListener("click", function() {
		for(let a = 0; a < colorsDiv.length; a++) {
			colorsDiv[a].classList.remove("active-accent-color");
			colorsDiv[a].innerHTML = "";
		}
	 	colorsDiv[i].innerHTML = "<i class='material-icons active-accent-color-icon'>done</i>";
    localStorage.setItem("accent-color-index",i);
    let accentColor = colors[localStorage.getItem("theme")][i];
    applyAccentColor(localStorage.getItem("theme"),localStorage.getItem("accent-color-index"))//accentColor);
    localStorage.setItem("accent-color",accentColor);
	});
};
function applyAccentColor(theme, index) {
	const vars = document.querySelector(`.${theme}`);
	var color = colors[theme][index];
	vars.style.setProperty("--accent-color",color);
	vars.style.setProperty("--accent-lighter-color",color+"30");
	vars.style.setProperty("--slide-toggle-effect",color+"30");
}