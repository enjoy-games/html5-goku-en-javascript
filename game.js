// Class KeyboardListener.
function KeyboardListener() {
 // Properties.
 this.keychar = null;
 this.getPressed = function () {
  return this.keychar;
 };

 // Methods
 this.listenKeydown = function (e) {
  var keynum;

  if(window.event) keynum = e.keyCode; // IE8 and earlier
  else if(e.which) keynum = e.which; // IE9/Firefox/Chrome/Opera/Safari

  this.keychar = String.fromCharCode(keynum);
  return true;
 };
 this.listenKeyup = function (e) {
  this.keychar = null;
  return true;
 };
}

var keyboard = new KeyboardListener();
