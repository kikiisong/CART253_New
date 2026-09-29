/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can push a circle
 * on the canvas using their own circle.
 */

const puck = {
  x: 200,
  y: 289,
  size: 100,
  fill: "#ff0000",
  velocity:
  {
    x:0,
    y:0
  }
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 30,
  fill: "#000000"
};

const target = {
    x:200,
    y: 80,
    size: 200,
    fill: "blue",
    fills: {
        noOverlap: "blue",
        overlap: "green",
    }
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#aaaaaa");
  
  // Move user circle
  moveUser();
  
  // Draw the target, user and puck
  drawTarget();
  checkTarget();
  drawUser();
  drawPuck();
  movePuck();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

// Move puck based on user position
function movePuck()
{
    // Calculate distance between circles' centres
  const d = dist(user.x, user.y, puck.x, puck.y);
  // Check if that distance is smaller than their two radii, 
  // because if it is, they are overlapping by the amazing
  // power of geometry!
  const overlap = (d < user.size/2 + puck.size/2);
  // Set velocity and update position on whether they overlap
  if (overlap) {
    puck.velocity.x = (puck.x-user.x) * 0.05;
    puck.velocity.y = (puck.y-user.y) * 0.05;
    puck.x += puck.velocity.x;
    puck.y += puck.velocity.y;
  }

}

/**
 * Draw the target circle
 */
function drawTarget()
{
    push();
    noStroke();
    noFill();
    stroke(target.fill);
    strokeWeight(2);
    //dashed outline
    drawingContext.setLineDash([10,10]);
    ellipse(target.x, target.y, target.size);
    pop();
}

/**
 * Check if the puck is fully in the target
 */
function checkTarget()
{
    const d = dist(puck.x, puck.y, target.x, target.y);
    // Check if that distance is smaller than their two radii, 
    // because if it is, they are overlapping by the amazing
    // power of geometry!
    const overlap = (d < target.size*0.25);
    // Set fill(i.e. stroke color) based on whether they overlap
    if (overlap) {
        target.fill = target.fills.overlap;
    }
    else {
        target.fill = target.fills.noOverlap;
    }
}