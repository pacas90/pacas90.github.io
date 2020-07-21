function newDropdown(el) {

  this.el = el;

const dropdownItems = document.getElementsByClassName("dropdown-items")[el];

const x = document.querySelectorAll(".dropdown-items button");

textAlign.onclick = function() {

dropdownItems.style.transform = "scale(1.1,1.1)";

for(var y = 0; y < x.length; y++) { 

x[y].onclick = function() {  

textAlign.innerHTML = this.innerHTML;

dropdownItems.style.transform = "scale(0,0)";

}}}}

function newDropdown2(el) {

  this.el = el;

const dropdownItems2 = document.getElementsByClassName("dropdown-items2")[el];

const x2 = document.querySelectorAll(".dropdown-items2 button");

textSize.onclick = function() {

dropdownItems2.style.transform = "scale(1.1,1.1)";

for(var y = 0; y < x2.length; y++) { 

x2[y].onclick = function() {  

textSize.innerHTML = this.innerHTML;

dropdownItems2.style.transform = "scale(0,0)";

}}}}

function ripplefunc(el, bgcolor) {

  this.el = el;

  this.bgcolor = bgcolor;

  const ripple = document.createElement("div");

  el.parentElement.appendChild(ripple);

/*ripple style:*/

ripple.style.backgroundColor = bgcolor;

ripple.style.position = "absolute";

ripple.style.pointerEvents = "none";

ripple.style.borderRadius = "5px";

ripple.style.transition = "transform 0.2s";

ripple.style.transform = "scale(0,0)";

ripple.style.opacity = 1;

const rippleStyle = window.getComputedStyle(el);

ripple.style.width = rippleStyle.getPropertyValue("width");

ripple.style.height = rippleStyle.getPropertyValue("height");

ripple.style.margin = rippleStyle.getPropertyValue("margin");

ripple.style.marginTop = parseInt(rippleStyle.getPropertyValue("margin-top"), 10) - 10 - parseInt(rippleStyle.getPropertyValue("height"), 10) + "px"

ripple.style.borderRadius = rippleStyle.getPropertyValue("border-radius");

/*other code*/

  ripple.style.transform = "scale(1,1)";

  setTimeout(function(){

  ripple.style.transition = "opacity 0.5s";

  ripple.style.opacity = 0;

    setTimeout(function(){ripple.remove();}, 3000);

  },300);

}








const preview = document.getElementById("preview");

const textarea = document.getElementsByClassName("textarea")[0];

const addText = document.getElementsByClassName("add")[0];

const textBoldCheckbox = document.getElementById("first-text-checkbox");

const textItalicCheckbox = document.getElementById("second-text-checkbox");

const textSize = document.getElementById("text-size");

const textAlign = document.getElementById("text-align");

const textColor = document.getElementById("text-color");

var a;

var b;

var c;

textAlign.onclick = function() {

  newDropdown(0);

}

textSize.onclick = function() {

  newDropdown2(0);

}

textBoldCheckbox.oninput = function() {

  if(textBoldCheckbox.checked) {

 textarea.style.fontWeight = "bold";

}

else {

  textarea.style.fontWeight = "normal";

}

if(textItalicCheckbox.checked) {

  textarea.style.fontStyle = "italic";

}

else {

  textarea.style.fontStyle = "normal";

}

}

textItalicCheckbox.oninput = function() {

  if(textBoldCheckbox.checked) {

 textarea.style.fontWeight = "bold";

}

else {

  textarea.style.fontWeight = "normal";

}

if(textItalicCheckbox.checked) {

  textarea.style.fontStyle = "italic";

}

else {

  textarea.style.fontStyle = "normal";

}

}

textColor.oninput = function() {

  textColor.style.color = textColor.value;

  textarea.style.color = textColor.value;

}

addText.onclick = function() {

 ripplefunc(addText, "rgba(255,255,255,0.5)"); 

if(textBoldCheckbox.checked) {

  a = "font-weight: bold";

}

if(textItalicCheckbox.checked) {

  a = "font-style: italic";

}

if(textBoldCheckbox.checked && textItalicCheckbox.checked) {

  a = "font-style: italic; font-weight: bold";

}

preview.insertAdjacentHTML("beforeend", "<p style='"+a+";font-size:"+textSize.innerHTML+";color:"+textColor.value+";text-align:"+textAlign.innerHTML+";margin:0px;'>"+textarea.value+"</p>");

textBoldCheckbox.checked = false;

textItalicCheckbox.checked = false;

textarea.value = "";

}


