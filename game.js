// Class KeyboardListener.
function KeyboardListener() {
 // Properties.
 this.keychar = null;
 this.getPressed = function () {
  return this.keychar;
 };
 this.kLeft = function () {
  return String.fromCharCode(37);
 };
 this.kUp = function () {
  return String.fromCharCode(38);
 };
 this.kRight = function () {
  return String.fromCharCode(39);
 };
 this.kDown = function () {
  return String.fromCharCode(40);
 };

 // Methods.
 this.listenKeydown = function (e) {
  var keynum;

  if(window.event) keynum = e.keyCode; // IE8 and earlier.
  else if(e.which) keynum = e.which; // IE9/Firefox/Chrome/Opera/Safari.

  this.keychar = String.fromCharCode(keynum);

  return true;
 };
 this.listenKeyup = function (e) {
  this.keychar = null;
  return true;
 };
}

// Class Character.
function Character() {
 // Properties.
 this.image = new Image(); this.image.src = "Imagenes/goku.png";
 this.xPos = 50; this.yPos = 300;
 this.died = false;

 // Methods.
 this.update = function () {
  if (keyboard.getPressed() == ' ') {
   this.image.src = "Imagenes/gokukamehameha.png";
  } else if (kamehameha.xPos > 860) {
   this.image.src = "Imagenes/goku.png";
  }

  if (keyboard.getPressed() == keyboard.kLeft()) {
   this.image.src = "Imagenes/gokuleft.png";
   if (this.xPos > 0) this.xPos -= 10;
  } else if (keyboard.getPressed() == keyboard.kRight()) {
   this.image.src = "Imagenes/gokuright.png";
   if (this.xPos < 740) self.xPos += 10;
  }

  if (keyboard.getPressed() == keyboard.kUp()) {
   this.image.src = "Imagenes/gokuup.png";
   if (this.yPos > 32) this.yPos -= 10;
  } else if (keyboard.getPressed() == keyboard.kDown()) {
   this.image.src = "Imagenes/gokudown.png";
   if (this.y < 530) this.yPos += 10;
  }
 }
}

// Class Kamehameha.
function Kamehameha() {
 // Properties.
 this.image = new Image(); this.image.src = "Imagenes/kamehameha.gif";
 this.xPos = 900; this.yPos = 700;

 // Methods.
 this.update = function () {
  if (this.xPos > 840) {
   if (keyboard.getPressed == ' ') {
    this.xPos = (personaje.xPos + 60);
    this.yPos = (personaje.yPos + 14);
   }
  }

  if (this.xPos < 870) {
   this.xPos += 20;
  }
 };
}

var keyboard = new KeyboardListener();
