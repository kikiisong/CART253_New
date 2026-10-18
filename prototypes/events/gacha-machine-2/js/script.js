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
};

const sparkles = [];

/**
 * Set up canvas
*/
function setup() {
    createCanvas(canvasW, canvasH);
    initSparkles(16);
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

// Initialize sparkle array
function initSparkles(numSparkles) {
    for (let i = 0; i < numSparkles; i++) {
        const a = random(TWO_PI);
        const d = random(-globe.radius, globe.radius);
        sparkles.push({
            x: globe.centerX + cos(a) * d,
            y: globe.centerY + sin(a) * d,
            size: random(3, 7),
            speed: random(0.001, 0.003), // how fast the blinking cycle is
            phase: random(TWO_PI) // when blinking cycle starts
        });
    }
}

/**
 * Draw the capsule container as a large crystal ball
 */
function drawCrystalBall() {
    // for clipping
    const ctx = drawingContext;

    push();
    ctx.save();

    ctx.beginPath();
    //create 3d effect gradient
    let g = ctx.createRadialGradient(globe.centerX - globe.radius * 0.3, globe.centerY - globe.radius * 0.3, globe.radius * 0.1, globe.centerX, globe.centerY, globe.radius);
    g.addColorStop(0, '#6a4a9e');
    g.addColorStop(1, '#1f1338');
    ctx.fillStyle = g;
    // draw ball
    ctx.arc(globe.centerX, globe.centerY, globe.radius, 0, TWO_PI);
    ctx.fill();
    // clips everything in the ball
    ctx.clip();

    //sparkles
    noStroke();
    for (const s of sparkles) {
        //keeps brightness >=0 and gives shorter max brightness (blink)
        const brightness = pow(max(0, sin(millis() * s.speed + s.phase)), 4);
        //longer break
        if (brightness < 0.03) continue;
        fill(255, 255, 255, brightness * 255);
        star(s.x, s.y, s.size * brightness, s.size * brightness * 0.25);
    }

    ctx.restore();

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
    translate(width / 2, 440);
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