/**
 * Gacha Machine 2
 * Kiki
 * 
 * Gacha machine with physics and animation
 */

"use strict";
const canvasW = 400, canvasH = 600;
const machine = {
    topX: 70,
    topY: 320,
    width: 260,
    height: 240,
};

const globe = {
    centerX: canvasW / 2,
    centerY: 190,
    radius: 150
};

const knob = {
};

const capsule = {
    size: 20,
}

/**
 * Set up canvas
*/
function setup() {
    createCanvas(canvasW, canvasH);
}


/**
 * Draw componenets
 */
function draw() {
    background('#403643');

    drawMachine();
    drawCrystalBall();
    drawKnob();
}

/**
 * Draw machine body
*/
function drawMachine() {
    push();
    noStroke();
    // body
    fill('#1f1759');
    rect(machine.topX, machine.topY, machine.width, machine.height, 24);
    // globe holder
    fill('#ffffa0');
    ellipse(canvasW / 2, machine.topY + 10, machine.width, 30);
    pop();
}

/**
 * Draw the capsule container as a large crystal ball
 */
function drawCrystalBall() {
    push();
    noFill();
    //outline
    stroke("#474961");
    strokeWeight(5);
    ellipse(globe.centerX, globe.centerY, globe.radius * 2, globe.radius * 2);
    //inner glow
    stroke("#9597a97f");
    strokeWeight(12);
    ellipse(globe.centerX, globe.centerY, globe.radius * 2 - 12, globe.radius * 2 - 12);
    //highlight
    noStroke();
    fill("#d3d3f4f0");
    ellipse(globe.centerX - 70, globe.centerY - 80, 50, 50);
    pop();
}

/**
 * draw star shape
 */
function star(x, y, rOuter, rInner) {
    beginShape();
    for (let i = 0; i < 10; i++) {
        //determine tip or inner point
        const r = i % 2 === 0 ? rOuter : rInner;
        // points the 1st tip upwards & spacing = 2pi/10
        const a = -HALF_PI + i * PI / 5;
        vertex(x + cos(a) * r, y + sin(a) * r);
    }
    endShape(CLOSE);
}

/**
 * 
 * draw star shaped knob
 * the knob rotates for animation effect
 */
function drawKnob(angle = 0) {
    push();
    translate(width/2, 440);
    rotate(angle);

    //outerstar
    stroke("#fffacf4c");
    strokeWeight(2)
    fill('#412147'); 
    star(0, 0, 50, 28, 5);
    // inner star
    fill('#f6e979'); 
    star(0, 0, 40, 22, 5);
    // center
    noStroke();
    fill('#add1f5');
    ellipse(0, 0, 22, 22);
    pop();
}