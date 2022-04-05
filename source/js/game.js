const form = document.getElementById('formular');
const play = document.getElementById('play');

let canvas, x0, y0, trooper, trooperImg;
let time = 0;
let timeG = 0;
let Cborder = 50;
let Csize = 80;
let health = 5;
let kills = 0;
let Cspeed = 5;
let spawnSpeed = 350/Cspeed;
let droids = [];
let blasts = [];
let lasers = [];

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function setup() {
  canvas = createCanvas(1000, 600);
  canvas.parent("mycanvas");
  trooper = new Trooper(Cborder, height / 2 - 40);
}

function draw() {
  time++;
  timeG++;
  background(250);
  trooper.draw();
  if (time % spawnSpeed == 0) {
    droids.push(new Droid());
    console.log(droids);
  }
  droids.forEach(function (droid, index, array) {
    droid.draw();
    if (trooper.detectCollision(droid)) {
      array.splice(index, 1);
      health--;
      kills++;
      console.log(health);
    }
    if (droid.x < 0) {
      array.splice(index, 1);
      health--;
    }
    blasts.forEach(function (blast, idx, arr) {
      if (droid.detectCollision(blast)) {
        array.splice(index, 1);
        arr.splice(idx, 1);
        kills++;
      }
    });
  });

  blasts.forEach(function (blast, idx, arr) {
    blast.draw();
    if (
      blast.y > height ||
      blast.y < 0 ||
      blast.x < 0 ||
      blast.x > width
    ) {
      arr.splice(idx, 1);
    }
  });
  
  if (health === 0) {
    noLoop();
    background(0, 0, 0, 200);
    textSize(50);
    fill(255, 0, 0, 200);
    text('GAME IS OVER', width / 2 - 200, height / 2);
    form.style.display = 'block';
    points.value = kills * 10;
  }
}

function mousePressed() {
  x0 = mouseX;
  y0 = mouseY;
  trooper.angle += 15;
}

function mouseMoved() { }
