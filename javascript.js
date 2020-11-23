const tab1_button = document.getElementsByClassName("tab")[0];
const tab2_button = document.getElementsByClassName("tab")[1];
const autoTab_content = document.getElementById("auto-content");
const customTab_content = document.getElementById("custom-content");
tab2_button.style.left = "50%";
tab1_button.style.left = "0px";
window.onload = function() {
  tab1_button.click();
  
}
tab1_button.onclick = function() {
  if(getComputedStyle(autoTab_content).getPropertyValue("display") == "none") {
  tab1_button.style.backgroundColor = "rgba(242, 204, 143,0.5)";
  tab2_button.style.backgroundColor = "rgba(242, 204, 143,0.2)";
  autoTab_content.style.display = "block";
  customTab_content.style.display = "none";
   }
}
 tab2_button.onclick = function() {
   if(getComputedStyle(customTab_content).getPropertyValue("display") == "none") {
     tab2_button.style.backgroundColor = "rgba(116, 198, 157,0.5)";
     tab1_button.style.backgroundColor = "rgba(116, 198, 157,0.2)";
     customTab_content.style.display = "block"
     autoTab_content.style.display = "none";
     drawingModes[0].click();
   }
 }

function exportCanvasAsPNG(canvas, fileName) {

    
    //canvas = this.canvas;
    var MIME_TYPE = "image/png";

    var imgURL = canvas.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}
   


function random(max, min) {
 return Math.floor(Math.random() * (max - min)) + min;
}










var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");
ctx.lineWidth = 0;
var btn = document.getElementById("gen");
canvas.width = 100;
canvas.height = 100;

document.getElementById("change-image-size").onclick = function() {
  canvas.height = document.getElementById("image-size1").value;
  canvas.width = document.getElementById("image-size2").value;
}
 var exportBtn = document.getElementById("export");
 var fileNameInput = document.getElementById("file-name");
exportBtn.onclick = function() {
  exportCanvasAsPNG(canvas2, fileNameInput.value);
}

var darkThemeBtn = document.getElementById("dark-theme-btn");
darkThemeBtn.onclick = function() {
  if(darkThemeBtn.innerText = "Dark theme") {//check if dark mode is on
  darkThemeBtn.innerText = "Light theme";
  document.documentElement.style.setProperty("--text-color","white");
  document.documentElement.style.setProperty("--bg-color","#121212");
  document.documentElement.style.setProperty("--settings-bg", "#222222");
  document.documentElement.style.setProperty("--border-color", "#232323");
  document.documentElement.style.setProperty("--input-color", "#353535");
  document.documentElement.style.setProperty("--input-text", "#ffffff");
  document.documentElement.style.setProperty("--input-border", "#aaaaaa")
   }
   else if(darkThemeBtn.innerText = "Light theme") {
  darkThemeBtn.innerText = "Dark theme";
  document.documentElement.style.setProperty("--text-color","black");
  document.documentElement.style.setProperty("--bg-color","white");
  document.documentElement.style.setProperty("--settings-bg", "#eeeeee");
  document.documentElement.style.setProperty("--border-color", "gray");
  document.documentElement.style.setProperty("--input-color", "white");
  document.documentElement.style.setProperty("--input-text", "black");
  document.documentElement.style.setProperty("--input-border", "gray")
   
   }
}
var advancedSettingsHidden = document.getElementsByClassName("advanced-settings-hidden")[0];
var advancedSettings = document.getElementById("advanced-settings");
  advancedSettings.onclick = function() {
    advancedSettingsHidden.classList.toggle("show");
   if(advancedSettingsHidden.classList == "advanced-settings-hidden show") {
     advancedSettings.innerText = "Hide advanced settings";
     advancedSettings.style.borderBottom = "0px";
   }
   else {
     advancedSettings.innerText = "Show advanced settings";
     advancedSettings.style.borderBottom = "1px solid gray";
   }
  }
  var colorsInput = document.getElementById("add-colors-input");
  var colorsBtn = document.getElementById("add-colors-btn");
  var colorsList = document.getElementById("colors-list");
  var colors = ["lightgreen", "salmon", "yellow"];
  var cubeQuantity = 3000;
  var cubeSize = 5;
  var cubeGenRange = 20;
  document.getElementById("set-cube-quantity").onclick = function() {
   cubeQuantity = document.getElementById("cube-quantity").value;
  }
  document.getElementById("set-size").onclick = function() {
   cubeSize = document.getElementById("cube-size").value;
   cubeGenRange = canvas.width / cubeSize;
  }
  document.getElementById("remove-colors").onclick = function() {
   for(var i = 0; i < colors.length; i++) {
    colors.splice(i)
  }
  colorsList.innerHTML = "<span class='highlight'>Colors:</span>";
  }
  colorsBtn.onclick = function() {
  colors.push(colorsInput.value);
  if(colorsInput.value != "") {
  colorsList.innerHTML += "<br>" + colorsInput.value + ",";
  colorsInput.value = "";
  }
  }
btn.onclick = function() {
  if(colors == "") {
    alert("No colors added!")
  }
  else {

    if(document.getElementById("delete-cubes-after-gen").checked) {
   //do nothing
    }
    else {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    }
   
  for(var t = 0; t < cubeQuantity; t+=0.5) {
  var x = 0.5;
  var y = 0.5;
  ctx.fillStyle = colors[random(0,colors.length)];
  ctx.strokeStyle = ctx.fillStyle;
  x = (random(0, cubeGenRange) * cubeSize);
  y = (random(0, cubeGenRange) * cubeSize);
  ctx.fillRect(x,y,cubeSize,cubeSize);
    }
   }
}
//
//
//
//
//canvas2 
//
//
//
//
//
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = 64;
canvas2.height = 64;

document.getElementById("random-gray-shade").oninput = function() {
  if(document.getElementById("random-gray-shade").checked) {
    document.getElementById("random-color").checked = false;
  }
}
document.getElementById("random-color").oninput = function() {
  if(document.getElementById("random-color").checked) {
    document.getElementById("random-gray-shade").checked = false;
  }
}
  

canvas2.onclick = function(event) {
var x = Math.floor(event.offsetX / 4) * 4;
var y = Math.floor(event.offsetY / 4) * 4;
if(currentDrawingMode === "Draw mode") {
if(document.getElementById("random-color").checked) {
    ctx2.fillStyle = "#" + randomColor();
 }
 else if(document.getElementById("random-gray-shade").checked) {
   ctx2.fillStyle = randomGrayShade();
 }
 else if(ctx2ColorInput.value === "") {
   ctx2.fillStyle = "black";
 }
 else if(ctx2ColorInput != "") {
   ctx2.fillStyle = ctx2ColorInput.value;
 }
 
ctx2.fillRect(x,y,4,4);
} else if(currentDrawingMode === "Erase mode") {
  ctx2.clearRect(x,y,16,16);
}
 else if(currentDrawingMode === "Fill mode") {
   if(document.getElementById("random-color").checked) {
   ctx2.fillStyle = "#"+randomColor();
 }
 else if(document.getElementById("random-gray-shade").checked) {
   ctx2.fillStyle = randomGrayShade();
 }
 else if(ctx2ColorInput.value === "") {
   ctx2.fillStyle = "black";
 }
 else if(ctx2ColorInput != "") {
   ctx2.fillStyle = ctx2ColorInput.value;
 }
   ctx2.fillRect(0,0,64,64);
 }


}
const ctx2ColorInput = document.getElementById("canvas2-colorinput");
const ctx2ColorBtn = document.getElementById("canvas2-colorbtn");
ctx2ColorBtn.onclick = function() {
  ctx2.fillStyle = ctx2ColorInput.value;
}
document.getElementById("canvas2-save").onclick = function() {
  exportCanvasAsPNG(canvas2, document.getElementById('canvas2-file-name').value);
}
document.getElementById("clear-canvas").onclick = function() {
  ctx2.clearRect(0,0,64,64);
}
var currentDrawingMode;
var drawingModes = document.getElementsByClassName("drawing-modes");
function drawingMode(event) {
  for(var i = 0; i < 3; i++) {
    drawingModes[i].classList = "drawing-modes";
    event.currentTarget.classList += " selected";
    currentDrawingMode = event.currentTarget.innerText;
    }
}

function randomColor() {
const hex = "ABCDEF0123456789";
let color = "";
for(let i = 0; i < 6; i++) {
  color += hex.charAt(random(0,hex.length));
  }
return color;
}
function randomGrayShade() {
const rgb = "0123456789";
let color = "";
for(let i = 0; i < 2; i++) {
  color += rgb.charAt(random(0,rgb.length));
  }
return "rgb("+color+","+color+","+color+")";
}
