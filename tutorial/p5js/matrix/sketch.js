
// @see https://www.youtube.com/watch?v=S1TQCi9axzg
var symbolSize = 12;
var streams = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  for(var i=0; i<=width/symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-500, 0));
    streams.push(stream);
    x += symbolSize;
  }
  textSize(symbolSize);
}

function draw() {
  background(0, 64);
  streams.forEach(function(stream) {
    stream.render();
  }); 
}

function MatrixSymbol(x, y, speed, first) {
  this.x = x;
  this.y = y;
  this.value;
  this.speed = speed;
  this.switchInterval = round(random(30, 70));
  this.first = first;

  this.setToRandomSymbol = function() {
    if(frameCount % this.switchInterval == 0) {
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96))
      );
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 30));
  this.speed = random(1, 7);

  this.generateSymbols = function(x, y) {
    var first = round(random(0, 4)) == 1;
    for(var i=0; i<=this.totalSymbols; i++) {
      var symbol = new MatrixSymbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {

    this.symbols.forEach(function(symbol) {
      if(symbol.first) {
        fill(180, 255, 180);
      } else {
        fill(0x33, 0xff, 0);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}