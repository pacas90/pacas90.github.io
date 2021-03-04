

const slide_toggle = document.querySelectorAll(".slide-toggle");

for(let i = 0; i < slide_toggle.length; i++) {
  
  slide_toggle[i].classList.add("slide-toggle-container");
  slide_toggle[i].setAttribute("data-checked","false");
  
  const inner_container = document.createElement("div");
  inner_container.classList.add("slide-toggle-inner-container");
  slide_toggle[i].appendChild(inner_container);
  
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type","checkbox");
  inner_container.appendChild(checkbox);
  checkbox.classList.add("slide-toggle-hidden-checkbox");
  
  const slide_rect = document.createElement("div");
  slide_rect.classList.add("slide-rect");
  inner_container.appendChild(slide_rect);
  
  const slide_circle = document.createElement("div");
  inner_container.appendChild(slide_circle);
  slide_circle.classList.add("slide-circle");
  
  const slide_eff = document.createElement("div");
  slide_eff.classList.add("slide-effect");
  inner_container.appendChild(slide_eff);
  
  slide_toggle[i].addEventListener("touchstart",hover);
  slide_toggle[i].addEventListener("touchmove",hover);
  slide_toggle[i].addEventListener("touchend",unhover);

  function hover() {
    slide_eff.style.opacity = 1;
  }
  function unhover() {
    setTimeout(function(){
      slide_eff.style.opacity = 0;
    },200);
  }
 slide_toggle[i].addEventListener("click",function() {
  	if(checkbox.checked) {
  		checkbox.checked = false;
  		slide_toggle[i].setAttribute("data-checked","false");
  	}
  	else {
  		checkbox.checked = true;
  		slide_toggle[i].setAttribute("data-checked","true");
  	}
  });

  
}

const input = document.querySelectorAll(".fancy-input input");
const inputDiv = document.querySelectorAll(".fancy-input");


for(let i = 0; i < input.length; i++) {
input[i].addEventListener("focus",function(){
	inputDiv[i].classList.add("active-ui-component");
});
input[i].addEventListener("blur",function(){
	inputDiv[i].classList.remove("active-ui-component");
});
}

for(let i = 0; i < inputDiv.length; i++) {
  const label = document.createElement("p");

  inputDiv[i].appendChild(label);

  label.classList.add("label");
  label.innerText = input[i].getAttribute("data-label");

  if(input[i].getAttribute("data-icon") !== null) {
    const icon = document.createElement("a");
    inputDiv[i].appendChild(icon);
    icon.classList.add("icon");
    icon.innerHTML = input[i].getAttribute("data-icon");
  }
    
  
  

  input[i].onfocus = () => {
    label.classList.add("label-transform");
    let inputRect = inputDiv[i].getBoundingClientRect();
    let labelRect = label.getBoundingClientRect();
    let transform = inputRect.top - inputRect.top-inputRect.height/2+2;
    label.style.transform = `translate(-5px,${transform}px) scale(0.8)`;
  }
  input[i].onblur = () => {
    if(input[i].value.length === 0) {
    	label.classList.remove("label-transform");
      label.style.transform = "translate(0px,0px) scale(1)";
    }
  }
}


const button_toggle = document.querySelectorAll(".button-toggle");
const buttons = document.querySelectorAll(".button-toggle-btn");


for(let i = 0; i < buttons.length; i++) {
buttons[i].addEventListener("focus",function(){
	buttons[i].parentElement.classList.add("active-ui-component");
});
buttons[i].addEventListener("blur",function(){
	buttons[i].parentElement.classList.remove("active-ui-component");
});
}


for(let i = 0; i < buttons.length; i++) {
	if(buttons[i].className === "button-toggle-btn default") {
		buttons[i].classList.add("toggled-btn");
		buttons[i].setAttribute("data-toggled","true");
	}
  buttons[i].onclick = (event) => {
    for(let h = 0; h < event.currentTarget.parentElement.children.length; h++) {
      event.currentTarget.parentElement.children[h].classList.remove("toggled-btn");
      event.currentTarget.parentElement.children[h].setAttribute("data-toggled","false");
    }
    event.currentTarget.classList.add("toggled-btn");
    event.currentTarget.setAttribute("data-toggled","true");
  }
}



 
function getProp(el, style) {
    return parseInt(window.getComputedStyle(el).getPropertyValue(style),10);
}