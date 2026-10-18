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
    height: 240
};

const globe = {
    centerX: canvasW / 2,
    centerY: 180,
    radius: 150
};

const sparkles = [];

const knob = {
    y: 440,
    centerSize: 22,
    outerSize: 50,
    innerSize: 40,
    tipLength: 22,
    angle: 0,
    duration: 1500
};

const chute = {
    y: 520,
    sizeX: 80,
    sizeY: 10
}

const card = {
    topWidth: 56,
    bottomWidth: 80,
    height: 70,
    duration: 1000
};

const state = {
    idle: 'idle',
    spinning: 'spinning',
    dispensing: 'dispensing',
    available: 'available'
};

let currentState = state.idle;
// when the state starts, for animation
let stateStart = null;

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

    updateState();
    console.log(currentState);
    drawMachine();
    drawCrystalBall();
    drawKnob();
    drawChute();
    drawCard();
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
function drawKnob() {
    push();
    translate(globe.centerX, knob.y);
    knob.angle = currentState === state.spinning ? checkProgress(knob.duration) * TWO_PI : 0;
    rotate(knob.angle);

    //outer star
    stroke("#fffacf4c");
    strokeWeight(2)
    fill('#412147');
    star(0, 0, knob.outerSize, knob.outerSize - knob.tipLength);
    // inner star
    fill('#f6e979');
    star(0, 0, knob.innerSize, knob.innerSize - knob.tipLength);
    // center
    noStroke();
    fill('#1f1759');
    ellipse(0, 0, knob.centerSize, knob.centerSize);
    pop();
}

/**
 * Draw the chute/dispenser
 */
function drawChute() {
    push();
    stroke("#000000");
    strokeWeight(2);
    fill('#1b182b');
    rect(globe.centerX - chute.sizeX / 2, chute.y, chute.sizeX, chute.sizeY, 8);
    pop();
}

/**
 * Draw card if dispensed
 */
function drawCard() {
    if (currentState === state.dispensing) {

        const p = constrain((millis() - stateStart) / card.duration, 0, 1);
        const e = 1 - pow(1 - p, 3);

        const topY = chute.y + chute.sizeY / 2;
        const topW = card.topWidth * e;
        const bottomW = card.bottomWidth * e;
        const h = card.height * e;

        push();
        stroke('#f3e991');
        strokeWeight(2);
        strokeJoin(ROUND);
        fill('#2c2f46');
        quad(globe.centerX - topW / 2, topY, globe.centerX + topW / 2, topY, globe.centerX + bottomW / 2, topY + h, globe.centerX - bottomW / 2, topY + h);
        pop();
    } else if (currentState === state.available) {
        const topY = chute.y + chute.sizeY / 2;

        push();
        stroke('#f3e991');
        strokeWeight(2);
        strokeJoin(ROUND);
        fill('#2c2f46');
        quad(globe.centerX - card.topWidth / 2, topY, globe.centerX + card.topWidth / 2, topY, globe.centerX + card.bottomWidth / 2, topY + card.height, globe.centerX - card.bottomWidth / 2, topY + card.height);
        pop();
    }
}

function checkProgress(duration) {
    return constrain((millis() - stateStart) / duration, 0, 1);
}

function setState(next) {
    currentState = next;
    stateStart = millis();
}

function updateState() {
    if (currentState === state.spinning && checkProgress(knob.duration) === 1) {
        setState(state.dispensing);
    } else if (currentState === state.dispensing && checkProgress(card.duration) === 1) {
        setState(state.available);
    }
}


function mousePressed() {
    const onKnob = dist(mouseX, mouseY, globe.centerX, knob.y) < knob.outerSize;
    if (currentState === state.idle && onKnob) {
        setState(state.spinning);
    }
}