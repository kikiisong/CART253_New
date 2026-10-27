/**
 * Makeup Salon
 * Kiki
 * 
 * Put on some makeup for our client!
 */

"use strict";

const canvasW = 500;
const canvasH = 600;

const face = {
    x: 250,
    y: 250,
    width: 260,
    length: 300,
    fill: '#fbdccb'
}

const ear = {
    offsetX: 125,
    width: 45,
    length: 70,
    inner: {
        yShift: 2,
        width: 20,
        length: 35
    },
};

const neck = {
    y: 360,
    width: 70,
    length: 70,
    fill: '#f0d1c0'
};

const shirt = {
    y: 520,
    width: 360,
    length: 200,
    fill: '#b7e5fc'
};

const hair = {
    back: {
        y: 85,
        halfWidth: 145,
        length: 400,
        topRadius: 80,
        bottomRadius: 20
    },
    bang: {
        topY: 100,
        bottomY: 190,
        topWidth: 90,
        bottomWidth: 115
    },
    fill: '#504337'
};

const nose = {
    y: 283,
    width: 15,
    length: 35,
    color: '#e0cbbf'
};

const mouth = {
    y: 322,
    width: 110,
    length: 70,
    trim: 0.15,
    lineColor: '#fac5c5',
    thickness: 5,
};

const eye = {
    offsetX: 45,
    y: 242,
    width: 62,
    length: 70,
    fill: '#ffffff',
    iris: {
        size: 34,
        color: '#5b84d7'
    },
    pupil: {
        size: 18,
        color: '#141414'
    },
    highlight: {
        size: 8,
        dx: -5,
        dy: -6,
        color: '#ffffff'
    },
    maxLook: 14, // how far the pupil can slide from the eye center
    lookSpeed: 10, // pupil movement pace
};

const brow = {
    offsetX: 45,
    y: 210,
    width: 60,
    length: 24,
    thickness: 7,
    color: '#2b1a04',
    outerTrim: 0.3,
    innerTrim: 0.2,
    liftMin: -8, // brow offset when the mouse is at the top
    liftMax: 4, // brow offset when the mouse is at the bottom
};

const lipsticks = {
    x: 455,
    topY: 70,
    spacing: 160, // distance between neighbouring lipsticks (top)
    caseWidth: 36,
    bulletWidth: 26,
    bulletHeight: 36,
    slant: 12,
    collarSize: 12,
    caseHeight: 52,
    bottomRadius:6,
    caseColor: '#171322',
    collarColor: '#f4ef55',
    colors: ['#d92222', '#f880f0', '#781b84'],
};

/**
 * Set up the canvas
*/
function setup() {
    createCanvas(canvasW, canvasH);
}


/**
 * Draw the components
*/
function draw() {
    background("#ffb6fa");
    drawPerson();

}

function drawPerson() {
    drawBackHair()
    drawBody();
    drawHead();
    drawEars();
    drawBrows();
    drawBang();
    drawNose();
    drawMouth();
    drawEye(face.x - eye.offsetX, eye.y);
    drawEye(face.x + eye.offsetX, eye.y);
    drawLipsticks();
    cursor(onLipstick(mouseX, mouseY) !== -1 ? HAND : ARROW);
}

function drawHead() {
    push();
    noStroke();
    fill(face.fill);
    ellipse(face.x, face.y, face.width, face.length);
    pop();
}

function drawEars() {
    push();
    noStroke();
    fill(face.fill);

    const left = face.x - ear.offsetX;
    const right = face.x + ear.offsetX;

    ellipse(left, face.y, ear.width, ear.length);
    ellipse(right, face.y, ear.width, ear.length);
    pop();
}

function drawBody() {
    push()
    noStroke()

    fill(neck.fill);
    rect(face.x - neck.width / 2, neck.y, neck.width, neck.length);

    fill(shirt.fill);
    arc(face.x, shirt.y, shirt.width, shirt.length, PI, TWO_PI, CHORD);
}

function drawBackHair() {
    push();
    const b = hair.back;
    noStroke();
    fill(hair.fill);
    rect(face.x - b.halfWidth, b.y, b.halfWidth * 2, b.length, b.topRadius, b.topRadius, b.bottomRadius, b.bottomRadius);
    pop();
}

function drawBang() {
    push();
    const b = hair.bang;
    noStroke();
    fill(hair.fill);
    quad(face.x - b.topWidth, b.topY, face.x + b.topWidth, b.topY, face.x + b.bottomWidth, b.bottomY, face.x - b.bottomWidth, b.bottomY);
    pop();
}

function drawNose() {
    push();
    noStroke();
    fill(nose.color);
    triangle(face.x, nose.y - nose.length / 2, face.x - nose.width, nose.y + nose.length / 2, face.x + nose.width, nose.y + nose.length / 2);
    pop();
}

function drawMouth() {
    push();
    stroke(mouth.lineColor);
    strokeWeight(mouth.thickness);
    noFill();
    arc(face.x, mouth.y, mouth.width, mouth.length, mouth.trim, PI - mouth.trim);

    pop();
}

function drawEye(x, y) {
    push();
    noStroke();
    fill(eye.fill);

    ellipse(x, y, eye.width, eye.length);

    // pupil slides toward the mouse up to a max distance
    const angle = atan2(mouseY - y, mouseX - x);
    const reach = min(eye.maxLook, dist(mouseX, mouseY, x, y) / eye.lookSpeed);
    const px = x + cos(angle) * reach;
    const py = y + sin(angle) * reach;

    fill(eye.iris.color);
    circle(px, py, eye.iris.size);
    fill(eye.pupil.color);
    circle(px, py, eye.pupil.size);
    fill(eye.highlight.color);
    circle(px + eye.highlight.dx, py + eye.highlight.dy, eye.highlight.size);
    pop();
}

function drawBrows() {
    const lift = map(mouseY, 0, height, brow.liftMin, brow.liftMax, true);
    const y = brow.y + lift;

    push();
    stroke(brow.color);
    strokeWeight(brow.thickness);
    noFill();

    arc(face.x - brow.offsetX, y, brow.width, brow.length, PI + brow.outerTrim, TWO_PI - brow.innerTrim);
    arc(face.x + brow.offsetX, y, brow.width, brow.length, PI + brow.innerTrim, TWO_PI - brow.outerTrim);
    pop();
}

function drawLipsticks() {
    for (let i = 0; i < lipsticks.colors.length; i++) {
        const topY = lipsticks.topY + i * lipsticks.spacing;
        drawLipstick(lipsticks.x, topY, lipsticks.colors[i]);
    }
}

function drawLipstick(x, topY, bulletColor) {
    const l = lipsticks;
    const bulletBottom = topY + l.bulletHeight;
    const collarBottom = bulletBottom + l.collarSize;

    push();
    noStroke();

    fill(bulletColor);
    quad(x - l.bulletWidth / 2, topY + l.slant, x + l.bulletWidth / 2, topY, x + l.bulletWidth / 2, bulletBottom, x - l.bulletWidth / 2, bulletBottom);

    fill(l.collarColor);
    rect(x - l.caseWidth / 2, bulletBottom, l.caseWidth, l.collarSize);

    fill(l.caseColor);
    rect(x - l.caseWidth / 2, collarBottom, l.caseWidth, l.caseHeight, 0, 0, l.bottomRadius, l.bottomRadius);
    pop();
}

// check if x,y overlap with which lipstick
function onLipstick(x, y) {
    const halfWidth = lipsticks.caseWidth / 2;
    for (let i = 0; i < lipsticks.colors.length; i++) {
        const top = lipsticks.topY + i * lipsticks.spacing;
        // if x, y is within this lipsticks's width & height, return the index
        if (x >= lipsticks.x - halfWidth && x <= lipsticks.x + halfWidth && y >= top && y <= top + lipsticks.bulletHeight + lipsticks.collarSize + lipsticks.caseHeight)
            return i;
    }
    return -1;
}

// mouse interaction
function mousePressed() {
    // if mouse on lipstick, change mouth color to clicked lipstick color
    const i = onLipstick(mouseX, mouseY);
    if (i !== -1) {
        mouth.lineColor = lipsticks.colors[i];
    }
}