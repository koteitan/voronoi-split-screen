window.onload=function(){ //entry point
  window.onresize();
  initGame();
  initDraw();
  initEvent();
  setInterval(procAll, 1000/frameRate);
};
var procAll=function(){ //main loop
  if(isRequestedDraw){
    procDraw();
    isRequestedDraw = false;
  }
  procEvent();
}
window.onresize = function(){
  document.getElementById("canvas0").width = 512;
  document.getElementById("canvas0").height= 512;
  isRequestedDraw = true;
};
//fields for game ---------------------------
var players=5;
var q = new Array(players); // q[p][] = [x,y] = 2D position for player p
for(var p=0;p<players;p++) q[p]=new Array(2);
var ww = [[0,0],[1,1]]; // world rectangle
//fields for graphic ------------------------
var sw = [[0,0],[512,512]]; // screen rectangle
var canvases  = 1;
var frameRate = 60; // [fps]
var canvas = new Array(canvases);
var ctx    = new Array(canvases);
var isRequestedDraw;
//field for event--------------------
var isKeyTyping;
//init event---------------------
var initEvent = function(){
  eventQueue = new Array(0);
  canvas[0].ontouchstart = addTouchEvent;
  canvas[0].ontouchmove  = addTouchEvent;
  canvas[0].ontouchend   = addTouchEvent;
  canvas[0].onmousedown  = addEvent;
  canvas[0].onmousemove  = addEvent;
  canvas[0].onmouseup    = addEvent;
  canvas[0].onmouseout   = addEvent;
  canvas[0].onmousewheel = addEvent;
//  window.onkeydown       = addEvent;
};
//initialize game----------------------------
var initGame=function(){
  for(var p=0;p<players;p++){
    for(var d=0;d<2;d++) q[p][d]=Math.random();
  }
};
var resetGame=function(){
  initGame();
  initDraw();
  procDraw();
  initEvent();
}
var initDraw=function(){
  //renderer
  for(var i=0;i<canvases;i++){
    canvas[i] = document.getElementById("canvas"+i);
    if(!canvas[i]||!canvas[i].getContext) return false;
    ctx[i] = canvas[i].getContext('2d');
  }
};
var procDraw=function(){
  //clear ---------
  //draw ball
  if(0){
    ctx[0].fillStyle = 'rgb(255,255,255)'; //white
    ctx[0].beginPath();
    ctx[0].arc(p[0], p[1], p[2]*Rnowpos, 0, Math.PI*2, false);
    ctx[0].fill();
    ctx[0].strokeStyle = 'yellow'; //white
    ctx[0].guideText("BALL",p[0],p[1]);
  }
}
//event handlers after queue ------------
var handleMouseDown = function(){
  isRequestedDraw = true;
}
var handleMouseDragging = function(){
  isRequestedDraw = true;
}
var handleMouseUp = function(){
}
var handleMouseMoving = function(){
//
}
var handleMouseWheel = function(){
  isRequestedDraw = true;
}
var handleKeyDown = function(e){
}
var printDebug=function(str){
  document.getElementById("debugout").innerHTML += str;
}
var clsDebug=function(str){
  document.getElementById("debugout").innerHTML = "";
}

