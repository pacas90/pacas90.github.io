

 var Ripple = {
  create: function(arg) {
    arg.e = event;
    var elem = arg.e.currentTarget;
    const effect = document.createElement("span");
    elem.appendChild(effect);
    effect.classList.add("ripple-eff");
    effect.style.animationDuration = 1100 - getProp(elem,"width")/2+"ms";
    let color = RGBtoRGBA(elem,arg.opacity)
    const rect = elem.getBoundingClientRect();
    const x = event.clientX - rect.left - 20;
    const y = event.clientY - rect.top - 20;
    effect.style.left = x + "px";
    effect.style.top = y + "px";
    effect.style.backgroundColor = color;
  }
}

  function RGBtoRGBA(el,opac) {
  const color = window.getComputedStyle(el).getPropertyValue("color");
  let rgba = color.slice(0,3);
  rgba += "a" + color.slice(3);
  rgba = rgba.slice(0,rgba.length-1)+","+opac+")";
  return rgba;
  }
function getProp(el, style) {
    return parseInt(window.getComputedStyle(el).getPropertyValue(style),10);
}
  
  export { Ripple };