function Ripple(el,event) {
  el.addEventListener("touchend",touchend);
  el.addEventListener("touchstart",touchstart);
  
  
  var span;
  var style = window.getComputedStyle(el);
  var width = parseInt(style.getPropertyValue("width"),10);
  var height = parseInt(style.getPropertyValue("height"),10);
  var scaleValue = 0;
  var end;
  var color;
  var x, y;
  
  function touchstart(event) {
    if(span) {
      span.remove();
    }
    end = false;
    span = document.createElement("span");
    el.appendChild(span);
    span.classList.add("ripple-effect");
    const rect = el.getBoundingClientRect();
    x = event.touches[0].clientX - rect.left -10;
    y = event.touches[0].clientY - rect.top -10;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    
    color = RGBtoRGBA(el,0.2);
    span.style.backgroundColor = color;
    
    if(x <= width/2) {
      scaleValue = (width-x)*0.1+height/25;
    }
    if(x >= width/2) {
      scaleValue = x/10+5;
    }
   
    span.style.transform = "scale("+scaleValue+")";
    span.ontransitionend = () => {
      end = true;
    }
  }
  function touchend(event) {
    if(end) {
      span.style.opacity = 0;
    }
    else {
      span.ontransitionend = () => {
        span.style.opacity = 0;
      }
    }
  }

}

function RGBtoRGBA(el,opac) {
  const color = window.getComputedStyle(el).getPropertyValue("color");
  let rgba = color.slice(0,3);
  rgba += "a" + color.slice(3);
  rgba = rgba.slice(0,rgba.length-1)+","+opac+")";
  return rgba;
  }

  
  export { Ripple };