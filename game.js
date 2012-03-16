// Class KeyboardListener.
function KeyboardListener() {
 // Properties.
 this.getPressed = null;

 // Methods
 this.listenKeydown = function (e) {
  var keynum;

  if(window.event) keynum = e.keyCode; // IE8 and earlier
  else if(e.which) keynum = e.which; // IE9/Firefox/Chrome/Opera/Safari

  this.getPressed = String.fromCharCode(keynum);
  return true;
 };
 this.listenKeyup = function (e) {
  this.getPressed = null;
  return true;
 }
}

var keyboard = new KeyboardListener();
