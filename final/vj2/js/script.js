/**
 * VJ2
 * Kiki
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

const symbolsToUse = " \\x._/[]";
const symbolsPool = " !\"#$%&'()*+,-./0123456789:;<=>?";
const colorControl = {};

const txtSize = 10;
const txtGap = 10;
let asciiMap = undefined;
let colorMap = undefined;
let cols, rows;
let length;

let angle = 0;
let strokeAngle = 0;
let layerAngle = 0;
let layerLength = 50;


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES)
    initColors();
    //initMaps();
    noCursor();
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#000000");
    simple();
    //drawLetters();
}

function initColors() {
    colorMode(HSB);
    colorControl.blank = color(0, 0, 100);
}

function initMaps() {
    cols = ceil(width / txtGap);
    rows = ceil(height / txtGap);

    asciiMap = [];
    colorMap = [];
    for (let i = 0; i < cols; i++) {
        asciiMap[i] = [];
        colorMap[i] = [];
        for (let j = 0; j < rows; j++) {
            asciiMap[i][j] = symbolsToUse[floor(random(symbolsToUse.length))];
            colorMap[i][j] = colorControl.blank;
        }
    }
}

// draw letters based on maps
function drawLetters() {
    push();
    textSize(txtSize);
    for (let i = 0; i < asciiMap.length; i++) {
        for (let j = 0; j < asciiMap[i].length; j++) {
            fill(colorMap[i][j]);
            text(asciiMap[i][j], i * txtGap, j * txtGap);
        }
    }
    pop();
}

// Based on Op Art No.3 by Pippin
function simple() {
    push();
    translate(width / 2, height / 2);
    textSize(20);

    layerLength = map(cos(layerAngle), -1, 1, 1, 50);
    for (let layer = 0; layer < width / layerLength; layer++) {
        const x = layer * layerLength;
        const y = 0;
        for (let spoke = -100; spoke < 100; spoke++) {
            push();
            //stroke(map(spoke, 0, 200, 0, 100))
            //strokeWeight(map(sin(strokeAngle), -1, 1, 0.5, 5));
            //line(x, y, x + layerLength, y);
            fill(random(360), 100, 100);
            //text(symbolsToUse[floor(random(symbolsToUse.length))], spoke, spoke);
            //text('/', x - txtGap * spoke, y - txtGap * spoke);
            text('.', x + txtGap * spoke, y + txtGap * spoke);
            pop();
            // 200 makes cool spiral, 2 makes a fan
            rotate(TWO_PI / 2);
        }
    }
    rotate(angle * 2 + 0.05);

    /*for (let i = 0; i < asciiMap.length; i++) {
        for (let j = 0; j < asciiMap[i].length; j++) {
            fill(colorMap[i][j]);
            text(asciiMap[i][j], i * txtGap, j * txtGap);
        }
    }*/
    pop();

    angle += 0.001;
    strokeAngle += 0.0001;
    layerAngle += 0.5;
}



//to do: use trig
//to do: move the grid + 3d effect
//note: 1 input make it back to initial simple = update everyframe