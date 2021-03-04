class Dialog {
  constructor(id) {
    this.id = id;
  }
  create(args) {
  	const dialog = document.querySelector(this.id);
    const container = document.querySelector(`${this.id}`);
    container.style.opacity = 1;
    container.style.width = args.width;
    container.style.height = args.height;
    container.style.backgroundColor = args.bgColor;
    container.style.color = args.textColor;
    const bg = document.createElement("div");
    bg.classList.add("UI-dialog-bg");
    document.body.appendChild(bg);
    bg.appendChild(container);
    
    //creating container for heading
    const h_container = document.createElement("div");
    h_container.classList.add("UI-dialog-h-container");
    container.appendChild(h_container);
    h_container.appendChild(document.querySelector(`${this.id} .heading`));
    
    //creating container for content
    const c_container = document.createElement("div");
    c_container.classList.add("UI-dialog-c-container");
    const content = document.querySelectorAll(`${this.id} .content`);
    for(let i = 0; i < content.length; i++) {
      c_container.appendChild(content[i]);
    }
    container.appendChild(c_container);
   
    //creating container for buttons
    const b_container = document.createElement("div");
    b_container.classList.add("UI-dialog-b-container");
    const buttons = document.querySelectorAll(`${this.id} .buttons`);
    for(let i = 0; i < buttons.length; i++) {
      b_container.appendChild(buttons[i]);
    }
    container.appendChild(b_container);
    const btns = document.querySelectorAll(`${this.id} button`);
    for(let i = 0; i < btns.length; i++) {
      if(btns[i].classList.contains("cancel")) {
        document.querySelector(`${this.id} .cancel`).addEventListener("click",function(){
          bg.classList.remove("UI-dialog-bg-show");
          dialog.classList.remove("UI-dialog-show");
        });
      }
    }
  }
  show() {
    const bg = document.querySelector(`${this.id}`).parentElement;
    bg.classList.add("UI-dialog-bg-show");
    const dialog = document.querySelector(`${this.id}`);
    dialog.classList.add("UI-dialog-show");
  }
   hide() {
    const bg = document.querySelector(`${this.id}`).parentElement;
    const dialog = document.querySelector(`${this.id}`);
    bg.classList.remove("UI-dialog-bg-show");
    dialog.classList.remove("UI-dialog-show");
  }
}

export { Dialog };