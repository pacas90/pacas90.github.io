export default class Dropdown {
  constructor() {
  
  }
  static hideInnerMenuAll() {
    const innerMenu = document.querySelectorAll("[data-menu-inner]");
    for(let b = 0; b < innerMenu.length; b++) {
      innerMenu[b].classList.remove("dropdown-menu-show");
    }
  }
  static deactivateAllButtons() {
    const buttons = document.querySelectorAll(".dropdown-menu button");
    for(let a = 0; a < buttons.length; a++) {
      buttons[a].classList.remove("active-dropdown-btn");
    }
  }
  toggle = (arg) => {
    
      const button = arg.button;
      if(arg.margin === undefined) {
      	arg.margin = 0;
      }
      button.addEventListener("click" ,function() {
      let attribute, menu;
      let allMenu = document.querySelectorAll(".dropdown-menu");
      const buttonRect = button.getBoundingClientRect();
     
      if(button.hasAttribute("data-menu")) {
        attribute = button.getAttribute("data-menu");
        menu = document.querySelector(`[data-menu=${attribute}].dropdown-menu`);
        menu.style.width = arg.width;
        menu.style.left = `${buttonRect.left}px`;
        menu.style.top = `${buttonRect.bottom+arg.margin}px`;
        
        if(menu.classList.contains("dropdown-menu-show")) {
          menu.classList.remove("dropdown-menu-show");
          Dropdown.hideInnerMenuAll();
          Dropdown.deactivateAllButtons();
        }
        else {
          for(let i = 0; i < allMenu.length; i++) {
            allMenu[i].classList.remove("dropdown-menu-show");
          }
          menu.classList.add("dropdown-menu-show");
        }
          
          
      //inner menu
      }
      else if(button.hasAttribute("data-menu-inner")) {
        attribute = button.getAttribute("data-menu-inner");
        menu = document.querySelector(`[data-menu-inner=${attribute}].dropdown-menu`);
        menu.style.left = `${buttonRect.right}px`;
        menu.style.top = `${buttonRect.top}px`;
        Dropdown.deactivateAllButtons();
        
        //if menu is opened
        if(menu.classList.contains("dropdown-menu-show")) {
          menu.classList.remove("dropdown-menu-show");
          
        }
        else {
          Dropdown.hideInnerMenuAll();
          button.classList.add("active-dropdown-btn")
          menu.classList.add("dropdown-menu-show");
        }
        
      }
      //code to close any inner menu when clicking dropdown item
      const menuButtons = document.querySelectorAll(".dropdown-menu button");
      for(let i = 0; i < menuButtons.length; i++) {
       if(!menuButtons[i].hasAttribute("data-menu-inner") && !menuButtons[i].parentElement.hasAttribute("data-menu-inner")) {
          menuButtons[i].addEventListener("click",function() {
            Dropdown.hideInnerMenuAll();
            Dropdown.deactivateAllButtons();
          })
        }
      }
      
      
    });
    
  }
  
}
