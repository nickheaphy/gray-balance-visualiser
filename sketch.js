//globals

let myFont;
let checkboxarray = [];
let drawpoints;
let drawlines;

const L = 0;
const a = 1;
const b = 2;

// Note: L = Z axis, a = x axis, b = y axis

const canvas_y = 600;

const lscale = 3;
const abscale = 3;

//papers is loaded from paper.js

// -------------------------------------------
function preload() {
  myFont = loadFont(base64Font);
}

// -------------------------------------------
// Responsive when browser resized
function windowResized() {
  sketchWidth = document.getElementById("main").offsetWidth;
  resizeCanvas(sketchWidth, canvas_y);
}

// -------------------------------------------
function setup() {
  sketchWidth = document.getElementById("main").offsetWidth;
  can = createCanvas(sketchWidth, canvas_y, WEBGL);
  can.class('p-0 shadow-sm rounded')
  can.parent('main');
  textFont(myFont);
  textSize(18);
  textAlign(CENTER, CENTER);

  drawpoints = createCheckbox('Draw Points', false);
  drawpoints.parent('controls');
  drawlines = createCheckbox('Draw Lines', true);
  drawlines.parent('controls');
  
  for (var i = 0; i < papers.length; i++) {
    checkbox = createCheckbox(papers[i].papername, papers[i].show);
    checkbox.parent('papers');
    checkboxarray.push(checkbox);
  }
}

// -------------------------------------------
function draw_axis() {
  let yellow = color(230,230,0);
  let red = color(255,0,0);
  let green = color(0,255,0);
  let blue = color(0,0,255);
  let blak = color(0,0,0);

  strokeWeight(1);
  //L
  stroke(blak);
  fill(blak);
  line(0,0,0,0,0,100*lscale);
  push();
  translate(0,0,105*lscale);
  text('L', 0, 0);
  pop();
  //a - (green)
  stroke(green);
  fill(green);
  line(0,0,0,-128*abscale,0,0);
  text('a-', -145*abscale, 0);
  //a + (red)
  stroke(red);
  fill(red);
  line(0,0,0,128*abscale,0,0);
  text('a+', 145*abscale, 0);
  //b - (blue)
  stroke(blue);
  fill(blue);
  line(0,0,0,0,-128*abscale,0);
  text('b-', 0, -145*abscale);
  //b + (yellow)
  stroke(yellow);
  fill(yellow);
  line(0,0,0,0,128*abscale,0);
  text('b+', 0, 140*abscale);
}

// -------------------------------------------
function draw_point(x,y,z,col,size) {
  push();
  stroke(col);
  translate(x*abscale,
    y*abscale,
    z*lscale);
  sphere(size);
  pop();
}

// -------------------------------------------
function draw_gray_balance(paper, dpoints = false, dlines = true) {
  strokeWeight(0.5);
  stroke(0);
  
  //draw the line segments
  if (dlines) {
    for (var i = 0; i < paper.graybalance.length-1; i++) {
      line(paper.graybalance[i][a]*abscale,
        paper.graybalance[i][b]*abscale,
        paper.graybalance[i][L]*lscale,
        paper.graybalance[i+1][a]*abscale,
        paper.graybalance[i+1][b]*abscale,
        paper.graybalance[i+1][L]*lscale);
    }
  }

  //draw the points
  if (dpoints) {
    for (var i = 0; i < paper.graybalance.length; i++) {
      draw_point(paper.graybalance[i][a],
        paper.graybalance[i][b],
        paper.graybalance[i][L],
        color('black'),
        1);
    }
    //draw black and white points
    draw_point(paper.graybalance[0][a],
      paper.graybalance[0][b],
      paper.graybalance[0][L],
      color('black'),
      2);

    draw_point(paper.graybalance[paper.graybalance.length-1][a],
      paper.graybalance[paper.graybalance.length-1][b],
      paper.graybalance[paper.graybalance.length-1][L],
      color('Silver'),
      2);
  }

}

// -------------------------------------------
function draw() {

  background(250);
  orbitControl(1,1,0.01);
  translate(0 ,100 , 0);
  rotateX(1);
  rotateZ(frameCount * 0.005);
  
  //draw axis
  draw_axis();

  //draw the gray balance (if checked)
  for (var i = 0; i < papers.length; i++) {
    if (checkboxarray[i].checked()) {
      draw_gray_balance(papers[i],drawpoints.checked(), drawlines.checked());
    }
  }
}