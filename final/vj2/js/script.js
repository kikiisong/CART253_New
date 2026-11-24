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
    //simple2();
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
        for (let spoke = 0; spoke < 1; spoke++) {
            push();
            //stroke(map(spoke, 0, 200, 0, 100))
            //strokeWeight(map(sin(strokeAngle), -1, 1, 0.5, 5));
            //line(x, y, x + layerLength, y);
            fill(random(360), 100, 100);
            //text(symbolsToUse[floor(random(symbolsToUse.length))], spoke, spoke);
            //text('/', x - txtGap * spoke, y - txtGap * spoke);
            text('.', x + txtGap * spoke, y + txtGap * spoke);
            pop();
            // 200 makes cool spiral, 2 makes cool fan
            rotate(TWO_PI / 2);
        }
    }
    rotate(angle * 2 + 0.05);

    pop();

    angle += 0.001;
    strokeAngle += 0.0001;
    layerAngle += 0.5;
}

let tx = 0;
let ty = 0;
let x = 0;
let y = 0;

function simple2() {
    push();

    fill(random(360), 100, 100);
    textSize(30);
    //x += noise(tx + 100) * txtGap;
        //y += noise(ty + 100) * txtGap;
        //text('.', x, y);
        x=10;
        y=200;
    for (let i = 0; i < 50; i++) {
        x = x+noise(tx + 0.05) * txtGap;
        //y = y+noise(ty + 0.05) * txtGap;
        //text('.', x, y);
        //x+=random(20);
        //y+=random(50);
        // change to tan to see different visuals
        x+= map(sin(angle), 1, -1, 1, 60);
        y+= map(cos(angle), 1, -1, -30, 30);
        text('/', x, y)
        angle += 10;
    }
    pop();

    tx += 0.01;
    ty += 0.01;
}

//To Do: let input decides which ascii letter