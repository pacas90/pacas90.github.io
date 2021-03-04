
var Snackbar = {
  show: function(arg) {
  	if(document.getElementById("snackbar-element") !== null) {
  		document.getElementById("snackbar-element").remove();
  		
  	}
    
    
    const container = document.createElement("div");
    container.setAttribute("id","snackbar-element");
    container.classList.add("snackbar-container");
    document.body.appendChild(container)
    
    if(arg.bottom !== null) {
    	container.style.bottom = arg.bottom;
    }
    
    if(arg.icon !== undefined) {
    	const icon_container = document.createElement("div");
    	container.appendChild(icon_container);
    	icon_container.classList.add("snackbar-icon-container");
    	icon_container.innerHTML = arg.icon;
    }
    
    const text_container = document.createElement("div");
    text_container.classList.add("snackbar-text-container");
    container.appendChild(text_container);
    
    const text = document.createElement("p");
    text.classList.add("snackbar-text")
    text_container.appendChild(text);
    text.innerHTML = arg.text;
    
    if(arg.button !== undefined) {
      const button_container = document.createElement("div");
      container.appendChild(button_container);
      button_container.classList.add("snackbar-btn-container");
      const button = document.createElement("button");
      button_container.appendChild(button);
      button.classList.add("snackbar-button");
      button.innerHTML = arg.button;
      if(arg.button_function !== undefined) {
      	button.addEventListener("click",arg.button_function);
      }
    }
    
    

    
    
    setTimeout(function(){
      container.classList.add("show-snackbar");
    },1);
    
    setTimeout(function(){
    	container.classList.remove("show-snackbar");
    	setTimeout(function(){
    		container.remove();
    	},arg.duration+300);
    },arg.duration);
    
    
  	
  },
  remove: function() {
  	const container = document.getElementById("snackbar-element");
   	container.classList.remove("show-snackbar");
    setTimeout(function(){
    	container.remove();
    },300);
  }
}


export { Snackbar };