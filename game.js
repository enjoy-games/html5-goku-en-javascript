// Optimized loop for web animations.
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

// Class KeyboardListener
function KeyboardListener() {
 // Properties
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

 // Methods
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

// Class User
function User($character_name) {
 // Properties
 this.character_name = $character_name;
 this.directory = path_prefix_characters + this.character_name;
 this.image = new Image(); this.image.src = this.directory + "/sprites/standing.png";
 this.xPos = 50; this.yPos = 300;
 this.died = false;
 this.sound_hurt = document.getElementById('sound_user_hurt');
 this.sound_hurt.volume = 0.3;
 this.shot = new UserShot(this.directory);

 // Methods
 this.update = function () {
  if (keyboard.getPressed() == ' ') {
   this.image.src = this.directory + "/sprites/shooting.png";
  } else if (this.shot.xPos > 860) {
   this.image.src = this.directory + "/sprites/standing.png";
  }

  if (keyboard.getPressed() == keyboard.kLeft()) {
   this.image.src = this.directory + "/sprites/left.png";
   if (this.xPos > 0) this.xPos -= 10;
  } else if (keyboard.getPressed() == keyboard.kRight()) {
   this.image.src = this.directory + "/sprites/right.png";
   if (this.xPos < 740) this.xPos += 10;
  }

  if (keyboard.getPressed() == keyboard.kUp()) {
   this.image.src = this.directory + "/sprites/up.png";
   if (this.yPos > 32) this.yPos -= 10;
  } else if (keyboard.getPressed() == keyboard.kDown()) {
   this.image.src = this.directory + "/sprites/down.png";
   if (this.yPos < 530) this.yPos += 10;
  }
 }
}

// Class UserShot
function UserShot($directory) {
 // Properties
 this.directory = $directory;
 this.image = new Image(); this.image.src = this.directory + "/sprites/shot.gif";
 this.xPos = 900; this.yPos = 700;
 this.sound = document.getElementById('sound_user_shot');

 // Methods
 this.update = function () {
  if (this.xPos > 840) {
   if (keyboard.getPressed() == ' ') {
    this.xPos = (user.xPos + 60);
    this.yPos = (user.yPos + 14);
    user.shot.sound.play();
   }
  }

  if (this.xPos < 870) {
   this.xPos += 20;
  }
 };
}

// Class UserLife
function UserLife($life_box_name) {
 // Properties
 this.life_box_name = $life_box_name;
 this.box = new Image(); this.box.src = path_prefix_lifeboxes + this.life_box_name + "/life_box.png";
 this.bar = new Image(); this.bar.src = path_prefix_lifeboxes + this.life_box_name + "/lifebar.png";
 this.xPos = 18; this.yPos = 4;

 // Methods
 this.update = function () {
  if (this.xPos <= -152) {
   user.died = true;
  }

  if (cpu_controller.shot.yPos >= (user.yPos - 56)) {
   if (cpu_controller.shot.yPos <= (user.yPos + 62)) {
    if (cpu_controller.shot.xPos >= user.xPos) {
     if (cpu_controller.shot.xPos <= (user.xPos + 43)) {
      this.xPos -= 26;
      cpu_controller.shot.xPos = -400;
      sound_user_hurt.play();
     }
    }
   }
  }

  if (cpu_controller.yPos >= (user.yPos - 56)) {
   if (cpu_controller.yPos <= (user.yPos + 62)) {
    if (cpu_controller.xPos >= user.xPos) {
     if (cpu_controller.xPos <= (user.xPos + 43)) {
      this.xPos -= 26;
      cpu_controller.shot.xPos = -400;
      sound_user_hurt.play();
     }
    }
   }
  }
 };
}

// Class CpuController
function CpuController($character_name) {
 // Properties
 this.character_name = $character_name;
 this.directory = path_prefix_characters + this.character_name;
 this.image = new Image(); this.image.src = this.directory + "/sprites/standing.png";
 this.xPos = 750; this.yPos = 300;
 this.flag = false;
 this.died = false;
 this.sound_hurt = document.getElementById('sound_cpu_hurt');
 this.sound_hurt.volume = 0.4;
 this.shot = new CpuControllerShot(this.directory);

 // Methods
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

// Class CpuControllerShot
function CpuControllerShot($directory) {
 // Properties
 this.directory = $directory;
 this.image = new Image(); this.image.src = this.directory + "/sprites/shot.png";
 this.xPos = -400; this.yPos = -400;
 this.sound = document.getElementById('sound_cpu_shot');

 // Methods
 this.update = function () {
  if (this.xPos == -400) {
   if (cpu_controller.yPos == user.yPos) {
    this.xPos = (cpu_controller.xPos - 60);
    this.yPos = (cpu_controller.yPos - 14);
    this.sound.play();
   }
  }

  if (this.xPos > -400) {
   this.xPos -= 5;
  }
 };
}

// Class CpuControllerLife
function CpuControllerLife($life_box_name) {
 // Properties
 this.life_box_name = $life_box_name;
 this.box = new Image(); this.box.src = path_prefix_lifeboxes + this.life_box_name + "/life_box.png";
 this.bar = new Image(); this.bar.src = path_prefix_lifeboxes + this.life_box_name + "/lifebar.png";
 this.xPos = 612; this.yPos = 4;

 // Methods
 this.update = function () {
  if (this.xPos >= 782) cpu_controller.died = true;

  if (user.shot.yPos >= cpu_controller.yPos) {
   if (user.shot.yPos <= (cpu_controller.yPos + 62)) {
    if (user.shot.xPos >= cpu_controller.xPos) {
     if (user.shot.xPos <= (cpu_controller.xPos + 43)) {
      this.xPos += 6;
      user.shot.xPos = 900;
      cpu_controller.sound_hurt.play();
     }
    }
   }
  }
 };
}

var path_prefix_characters = 'assets/characters/';
var path_prefix_lifeboxes = 'assets/life_boxes/';
var path_prefix_messages = 'assets/messages/';
var gameScreen = document.getElementById("gameScreen"); gameScreen.width = 800; gameScreen.height = 600;
var screen = gameScreen.getContext("2d");
var bufferCanvas = document.createElement('canvas'); bufferCanvas.width = gameScreen.width; bufferCanvas.height = gameScreen.height;
var bufferContext = bufferCanvas.getContext('2d');
var keyboard = new KeyboardListener();
var world = new Image(); world.src = "assets/scenarios/dragon_ball_namek.jpg";
var winbox = new Image(); winbox.src = path_prefix_messages + "default_user_wins_es.png";
var lostbox = new Image(); lostbox.src = path_prefix_messages + "default_user_loses_es.png";
var user = new User('dragon_ball_goku');
var cpu_controller = new CpuController('dragon_ball_minicell');
var user_life = new UserLife('default_left');
var cpu_controller_life = new CpuControllerLife('default_right');
var exit = false;
var intervalId;
var ost = document.getElementById('ost');
ost.volume = 0.5;
ost.play();

// Statistics
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
// document.body.appendChild( stats_fps.domElement );
// document.body.appendChild( stats_ms.domElement );

function gameLoop() {
 stats_fps.begin();
 stats_ms.begin();

 if (exit == false) {
  user.update();
  user.shot.update();
  if (cpu_controller_life.xPos < 697) cpu_controller.update();
  else cpu_controller.hard();
  cpu_controller.shot.update();
  user_life.update();
  cpu_controller_life.update();

  bufferContext.drawImage(world, 0, 0);
  bufferContext.drawImage(user_life.bar, user_life.xPos, user_life.yPos);
  bufferContext.drawImage(cpu_controller_life.bar, cpu_controller_life.xPos, cpu_controller_life.yPos);
  bufferContext.drawImage(user_life.box, 0, 0);
  bufferContext.drawImage(cpu_controller_life.box, 608, 0);
  bufferContext.drawImage(user.image, user.xPos, user.yPos);
  bufferContext.drawImage(user.shot.image, user.shot.xPos, user.shot.yPos);
  bufferContext.drawImage(cpu_controller.image, cpu_controller.xPos, cpu_controller.yPos);
  bufferContext.drawImage(cpu_controller.shot.image, cpu_controller.shot.xPos, cpu_controller.shot.yPos);

  if (user.died == true) bufferContext.drawImage(lostbox, 250,264);
  if (cpu_controller.died == true) bufferContext.drawImage(winbox, 250,264);

  if (user.died == true || cpu_controller.died == true) exit = true;

  screen.drawImage(bufferCanvas, 0, 0);
 } else {
  //clearInterval(intervalId);
  ost.pause();
  cancelAnimationFrame(intervalId);
 }

 setTimeout(function() {
  intervalId = requestAnimationFrame(gameLoop);
 }, 10);

 stats_fps.end();
 stats_ms.end();
}

