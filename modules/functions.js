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
function createImage(arr, images_arr) {
  let i;
  for(i = 0; i < arr.length; i++) {
  let image = new Image();
  image.src = "./.tiles/" + arr[i];
  images_arr.push(image);
  }
}

function Character(size, color) {
    this.size = size;
    this.color = color;
    ctx.beginPath();
    ctx.rect(100,100,size,size);
    ctx.fillStyle = color;
    ctx.fill();
}
export { toggleFullScreen };