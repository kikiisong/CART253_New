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
    y: 275, 
    width: 15, 
    length: 35, 
    color: '#e0cbbf'
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
    drawBang();
    drawNose();
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