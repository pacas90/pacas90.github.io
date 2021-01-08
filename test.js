function snackbar(text, buttonText) {
  if(document.getElementsByClassName("container").length < 1) {
  
  const container = document.createElement("div");
  document.body.appendChild(container);
  container.setAttribute("class","container");
  container.style.cssText = "box-shadow:0 4px 6px rgba(0,0,0,0.12), 0 4px 6px rgba(0,0,0,0.24);transition:all 0.3s;transform:scale(0,0);flex-wrap:wrap;display:flex;align-items:center;width:calc(100% - 20px);background-color: #222222;color:#ffffff;position:fixed;bottom:10px;height:50px;border-radius:4px;";
 
  const pDiv = document.createElement("div");
  container.appendChild(pDiv);
  pDiv.style.cssText = "margin:5px;display:flex;align-items:center;width:70%;height:calc(100% - 10px);";
  const p = document.createElement("p");
  pDiv.appendChild(p);
  p.innerText = text;
  p.style.cssText = "margin:5px";
  const buttonDiv = document.createElement("div");
  container.appendChild(buttonDiv);
  buttonDiv.style.cssText = "display:flex;align-items:center;justify-content:center;width:25%;height:calc(100% - 10px);";

  const button = document.createElement("button");
  buttonDiv.appendChild(button);
  button.style.cssText = "color:yellow;width:70px;height:30px;";
  button.innerHTML = buttonText;
  button.setAttribute("data-type","text"); 
  function removeContainer() {
    container.style.opacity = 0;
    setTimeout(function(){container.remove()}, 500);
  }
  button.onclick = () => {ripple(event);removeContainer();}
  
  setTimeout(function(){
  container.style.transform = "scale(1,1)";
  },1);
  
  setTimeout(function(){
    removeContainer();
  },10000);
 }
}
function ripple(event) {
  const button = event.currentTarget;
  const span = document.createElement("span");
  button.appendChild(span);
  span.classList.add("ripple");
  var color = rgb_to_rgba(button);
  if(button.getAttribute("data-type") === "filled") {
    color = "rgba(255,255,255,0.7)";
    span.style.zIndex = 99;
  }
  
  const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left -20
    const y = event.clientY - rect.top -20
  
  span.style.left = x + "px";
  span.style.top = y + "px";
  span.style.backgroundColor = color;
  }
 const buttons = document.querySelectorAll("[data-type]");
 buttons.forEach(button =>{button.onclick = (event) => {
   ripple(event);
     if(event.currentTarget.getAttribute("data-show-snackbar")) {
       snackbar("h","h")
     }
     if(event.currentTarget.getAttribute("data-close-snackbar")) {
      
     }
   }});
 
/*canvas---------------------------------*/
  
  
  
 
window.onload = () => {
  move();
  drawBall();
  drawGrid();
  drawFood();
}
window.onclick = () => {
  toggleFullScreen()
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
const canvas = document.querySelector("#joystick");
const ctx = canvas.getContext("2d");
const canvas1 = document.querySelector("#ball");
const ctx1 = canvas1.getContext("2d");
const canvas2 = document.querySelector("#background");
const ctx2 = canvas2.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
canvas1.width = 1000;
canvas1.height = 1000;
canvas2.width = 1000;
canvas2.height = 1000;

canvas.addEventListener("touchstart",()=>{
  touchmove(event);
  //secondfinger(event);
});
canvas.addEventListener("touchmove", touchmove);
canvas.addEventListener("touchend", touchend);

var clickX;
var clickY;
var centerX = 200;
var centerY = 800;
var joystickX = centerX;
var joystickY = centerY;
var radius = 100; //joystick radius
var angle;
var jdx;
var jdy;
var sClickX;
var sClickY;
var rect = canvas.getBoundingClientRect();

function secondfinger(e) {
  sClickX = Math.round(e.touches[1].clientX-rect.left*(10/3));
  sClickY = Math.round(e.touches[1].clientY-rect.top*(10/3));
  console.log(sClickX,clickX)
}
function getCoords(e) {
 clickX = Math.round((e.touches[0].clientX-rect.left)*(10/3));
 clickY = Math.round((e.touches[0].clientY-rect.top)*(10/3));
}
function reset() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  joystickX = centerX;
  joystickY = centerY;
}

function touchmove(e) {
 getCoords(e);
 move();
 e.preventDefault();
}
function touchend(e) {
 reset();
 drawCircles();
}
function drawCircles() {
 ctx.clearRect(0,0,canvas.width,canvas.height);

 
//external circle
 ctx.beginPath();
 ctx.moveTo(centerX-radius,centerY);
 ctx.lineTo(centerX+radius,centerY);
 ctx.moveTo(centerX,centerY-radius);
 ctx.lineTo(centerX,centerY+radius);
 ctx.strokeStyle = "black";
 ctx.stroke();
 ctx.closePath();
 ctx.beginPath();
 ctx.arc(centerX,centerY,radius,0,2*Math.PI);
 ctx.fillStyle = "rgba(255,0,0,0.2)";
 ctx.fill();
 
//internal circle 
 ctx.beginPath();
 ctx.arc(joystickX,joystickY,radius/3,0,Math.PI*2);
 ctx.fillStyle = "rgba(0,0,0,0.5)";
 ctx.fill();
 ctx.beginPath();
 ctx.arc(joystickX,joystickY,radius/2,0,2*Math.PI);
 ctx.fillStyle = "rgba(255,0,0,0.5)";
 ctx.fill();
}
function move() {
 drawCircles();
 //check if clicking in the circle
   if(Math.pow(clickX-centerX,2)+Math.pow(clickY-centerY,2) <= Math.pow(radius,2)) {
   joystickX = clickX;
   joystickY = clickY;
  }
 //if outside circle
   else {
   joystickX = centerX + radius * Math.cos(angle);
   joystickY = centerY + radius * Math.sin(angle);
   }
}
var ballX = 500;
var ballY = 500;
var ballRadius = 20;
var speed;
var dx;
var dy;
var score = 0;

function drawBall() {
ctx1.clearRect(0,0,canvas1.width,canvas1.height);
ctx1.beginPath();
ctx1.arc(ballX,ballY,ballRadius,0,2*Math.PI);
ctx1.fillStyle = "#c2ffc3";
ctx1.strokeStyle = "#79d97b";
ctx1.lineWidth = 15;
ctx1.stroke();
ctx1.fill();
jdx = clickX - centerX;
jdy = clickY - centerY;

angle = Math.atan2(jdy,jdx)
dx = Math.cos(angle)*speed;
dy = Math.sin(angle)*speed;
speed = 6;
if(joystickX != centerX && joystickY != centerY) {
 //checking if ball is touching borders 
  if(ballX + dx > 0+ballRadius) {
    if(ballY + dy > 0+ballRadius) {
      if(ballX + dx < 1000-ballRadius) {
        if(ballY + dy< 1000-ballRadius) {
            ballX += dx;
            ballY += dy;
        }
      }
    }
  }
}
requestAnimationFrame(drawBall);
}
function drawGrid() {
ctx2.beginPath();
for(let i = 2; i <= 1000; i += 50) {
  ctx2.moveTo(0,i);
  ctx2.lineTo(1000,i);
  ctx2.moveTo(i,0);
  ctx2.lineTo(i,1000);
}
ctx2.strokeStyle = "gray";
ctx2.lineWidth = 1;
ctx2.stroke();
ctx2.beginPath();
ctx2.fillStyle = "black";
ctx2.font = "50px Arial";
ctx2.fillText("Score: "+score,50,100);
}
var foodX = random(30,970);
var foodY = random(30,970);
var currentFoodX;
var currentFoodY;
var foodRadius = 20;
var foodColor = ["red","yellow","lightgreen","lightblue"];
var currentColor = foodColor[random(0,foodColor.length)];

function drawFood() {
  ctx2.beginPath();
  currentFoodX = foodX;
  currentFoodY = foodY;
  ctx2.arc(currentFoodX,currentFoodY,20,0,2*Math.PI);
  ctx2.fillStyle = currentColor;
  ctx2.fill();
  if(Math.pow(foodX-ballX,2)+Math.pow(foodY-ballY,2) <= Math.pow(ballRadius,2)) {
    ctx2.clearRect(0,0,1000,1000)
    foodX = random(30,970);
    foodY = random(30,970);
    score += 10;
    ballRadius += 5;
    currentColor = foodColor[random(0,foodColor.length)];
    drawGrid();
    }
  requestAnimationFrame(drawFood);
}

function toggleFullScreen() {
  if(document.fullscreenEnabled) {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}
}
 function rgb_to_rgba(el) {
  const color = window.getComputedStyle(el).getPropertyValue("color");
  let rgba = color.slice(0,3);
  rgba += "a" + color.slice(3);
  rgba = rgba.slice(0,rgba.length-1)+","+" 0.5"+")";
  return rgba;
  }
