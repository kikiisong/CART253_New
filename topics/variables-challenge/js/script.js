/**
 * Mr. Furious
 * Pippin Barr
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  }

};

let sky = {
    fill: {
    r: 160,
    g: 180,
    b: 200,
  }
};

let bird = {
    fill: 
    {
        r: 0,
        g: 204,
        b: 0 
    },
    pos_x:
    {
        first: 20,
        second: 50,
        third:7
    },
    pos_y:
    {
        first: 20,
        second: 30,
        third: 25
    },
    velocity: 2
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
background(
  sky.fill.r -= 1,
  sky.fill.g -= 1,
  sky.fill.b -= 1)
  
  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  mrFurious.fill.g -= 1;
  mrFurious.fill.b -= 1;
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();

  //Draw bird
  push();
  noStroke();
  fill(bird.fill.r,bird.fill.g,bird.fill.b);
  triangle(bird.pos_x.first+=bird.velocity, bird.pos_y.first, bird.pos_x.second +=bird.velocity, bird.pos_y.second, bird.pos_x.third+=bird.velocity, bird.pos_y.third);
  pop();
}