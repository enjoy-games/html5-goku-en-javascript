// Bucle optimizado para animaciones web.
(function() {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];

  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
   window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
   window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
   window.requestAnimationFrame = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
   };

  if (!window.cancelAnimationFrame)
   window.cancelAnimationFrame = function(id) { clearTimeout(id); };
}());

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
   if (this.xPos < 740) this.xPos += 10;
  }

  if (keyboard.getPressed() == keyboard.kUp()) {
   this.image.src = "Imagenes/gokuup.png";
   if (this.yPos > 32) this.yPos -= 10;
  } else if (keyboard.getPressed() == keyboard.kDown()) {
   this.image.src = "Imagenes/gokudown.png";
   if (this.yPos < 530) this.yPos += 10;
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
   if (keyboard.getPressed() == ' ') {
    this.xPos = (character.xPos + 60);
    this.yPos = (character.yPos + 14);
    sonidoDisparoGoku.play();
   }
  }

  if (this.xPos < 870) {
   this.xPos += 20;
  }
 };
}

// Class GokuLife.
function GokuLife() {
 // Properties.
 this.image = new Image(); this.image.src = "Imagenes/barravidagoku.png";
 this.xPos = 18; this.yPos = 4;

 // Methods.
 this.update = function () {
  if (this.xPos <= -152) {
   character.died = true;
  }

  if (shot.yPos >= (character.yPos - 56)) {
   if (shot.yPos <= (character.yPos + 62)) {
    if (shot.xPos >= character.xPos) {
     if (shot.xPos <= (character.xPos + 43)) {
      gokulife.xPos -= 26;
      shot.xPos = -400;
      heridoGoku.play();
     }
    }
   }
  }

  if (minicell.yPos >= (character.yPos - 56)) {
   if (minicell.yPos <= (character.yPos + 62)) {
    if (minicell.xPos >= character.xPos) {
     if (minicell.xPos <= (character.xPos + 43)) {
      gokulife.xPos -= 26;
      shot.xPos = -400;
      heridoGoku.play();
     }
    }
   }
  }
 };
}

// Class Minicell.
function Minicell() {
 // Properties.
 this.image = new Image(); this.image.src = "Imagenes/minicell.png";
 this.xPos = 750; this.yPos = 300;
 this.flag = false;
 this.died = false;

 // Methods.
 this.update = function () {
  if (this.yPos <= 40) this.flag = false;
  else if (this.yPos >= 540) this.flag = true;

  if (this.flag == false) this.yPos += 10;
  else if (this.flag == true) this.yPos -= 10;
 };

 this.hard = function () {
  if (this.xPos < 0) this.xPos = 800;
  if (this.yPos > 600) this.yPos = 0;
  this.xPos -= 10;
  this.yPos += 10;
 };
}

// Class Shot.
function Shot() {
 // Properties.
 this.image = new Image(); this.image.src = "Imagenes/disparominicell.png";
 this.xPos = -400; this.yPos = -400;

 // Methods.
 this.update = function () {
  if (this.xPos == -400) {
   if (minicell.yPos == character.yPos) {
    this.xPos = (minicell.xPos - 60);
    this.yPos = (minicell.yPos - 14);
    sonidoDisparoCell.play();
   }
  }

  if (this.xPos > -400) {
   this.xPos -= 5;
  }
 };
}

// Class MinicellLife.
function MinicellLife() {
 // Properties.
 this.image = new Image(); this.image.src = "Imagenes/barravidaminicell.png";
 this.xPos = 612; this.yPos = 4;

 // Methods.
 this.update = function () {
  if (this.xPos >= 782) minicell.died = true;

  if (kamehameha.yPos >= minicell.yPos) {
   if (kamehameha.yPos <= (minicell.yPos + 62)) {
    if (kamehameha.xPos >= minicell.xPos) {
     if (kamehameha.xPos <= (minicell.xPos + 43)) {
      this.xPos += 6;
      kamehameha.xPos = 900;
      heridoCell.play();
     }
    }
   }
  }
 };
}

var gameScreen = document.getElementById("gameScreen"); gameScreen.width = 800; gameScreen.height = 600;
var screen = gameScreen.getContext("2d");
var bufferCanvas = document.createElement('canvas'); bufferCanvas.width = gameScreen.width; bufferCanvas.height = gameScreen.height;
var bufferContext = bufferCanvas.getContext('2d');
var keyboard = new KeyboardListener();
var world = new Image(); world.src = "Imagenes/namek.jpg";
var gokulifebox = new Image(); gokulifebox.src = "Imagenes/cuadrovidagoku.png";
var minicelllifebox = new Image(); minicelllifebox.src = "Imagenes/cuadrovidaminicell.png";
var winbox = new Image(); winbox.src = "Imagenes/Hasganado.png";
var lostbox = new Image(); lostbox.src = "Imagenes/Hasperdido.png";
var character = new Character();
var kamehameha = new Kamehameha();
var minicell = new Minicell();
var shot = new Shot();
var gokulife = new GokuLife();
var minicelllife = new MinicellLife();
var exit = false;
var intervalId;
var bso = document.getElementById('bso');
bso.volume = 0.5;
bso.play();
var sonidoDisparoGoku = document.getElementById('disparoGoku');
var sonidoDisparoCell = document.getElementById('disparoCell');
var heridoCell = document.getElementById('heridoCell');
heridoCell.volume = 0.4;
var heridoGoku = document.getElementById('heridoGoku');
heridoGoku.volume = 0.3;

// Estadísticas.
var stats_fps = new Stats(), stats_ms = new Stats();
stats_fps.setMode(0); stats_ms.setMode(1); // 0: fps, 1: ms
// Align top-left
stats_fps.domElement.style.position = 'absolute';
stats_fps.domElement.style.left = '0px';
stats_fps.domElement.style.top = '0px';
// Align top-left
stats_ms.domElement.style.position = 'absolute';
stats_ms.domElement.style.left = '100px';
stats_ms.domElement.style.top = '0px';
/** /
document.body.appendChild( stats_fps.domElement );
document.body.appendChild( stats_ms.domElement );
/**/

function gameLoop() {
 stats_fps.begin();
 stats_ms.begin();

 if (exit == false) {
  character.update();
  kamehameha.update();
  if (minicelllife.xPos < 697) minicell.update();
  else minicell.hard();
  shot.update();
  gokulife.update();
  minicelllife.update();

  bufferContext.drawImage(world, 0, 0);
  bufferContext.drawImage(character.image, character.xPos, character.yPos);
  bufferContext.drawImage(kamehameha.image, kamehameha.xPos, kamehameha.yPos);
  bufferContext.drawImage(minicell.image, minicell.xPos, minicell.yPos);
  bufferContext.drawImage(shot.image, shot.xPos, shot.yPos);
  bufferContext.drawImage(gokulife.image, gokulife.xPos, gokulife.yPos);
  bufferContext.drawImage(minicelllife.image, minicelllife.xPos, minicelllife.yPos);
  bufferContext.drawImage(gokulifebox, 0, 0);
  bufferContext.drawImage(minicelllifebox, 608, 0);

  if (character.died == true) bufferContext.drawImage(lostbox, 250,264);
  if (minicell.died == true) bufferContext.drawImage(winbox, 250,264);

  if (character.died == true || minicell.died == true) exit = true;

  screen.drawImage(bufferCanvas, 0, 0);
 } else {
  //clearInterval(intervalId);
  bso.pause();
  cancelAnimationFrame(intervalId);
 }

 setTimeout(function() {
  intervalId = requestAnimationFrame(gameLoop);
 }, 10);

 stats_fps.end();
 stats_ms.end();
}

