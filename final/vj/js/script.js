/**
 * VJ
 * Kiki
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

const symbols = " !\"#$%&'()*+,-./0123456789:;<=>?";
const colorControl = {};

const txtSize = 10;
const txtGap = 10;
let asciiMap = undefined;
let colorMap = undefined;
let cols, rows;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(800, 800);
    angleMode(DEGREES)
    initColors();
    initMaps();
    noCursor(); 
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#000000");
    //simple();
    //mouseColor();
    virusSpread();
    //letterBlink();
    //rainbowBlink();
    mouseSpreadColor();
    drawLetters();
}

function initColors(){
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
            asciiMap[i][j] = symbols[floor(random(symbols.length))];
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

/*function simple() {
    push();
    textSize(txtSize);
    for (let i = 0; i < asciiMap.length; i++) {
        for (let j = 0; j < asciiMap[i].length; j++) {
            fill(colorMap[i][j]);
            text(asciiMap[i][j], i * txtGap, j * txtGap);
        }
    }
    pop();
}*/

//================ Text Controls =================
function letterBlink() {
    for (let i = 0; i < asciiMap.length; i++) {
        for (let j = 0; j < asciiMap[i].length; j++) {
            asciiMap[i][j] = symbols[floor(random(symbols.length))];
        }
    }
}

// some letters in a randomly defined square disapear
function virusSpread() {

    const sqTopx = floor(random(0, rows));
    const sqTopy = floor(random(0, cols));
    const sqSizex = floor(random(0, rows-sqTopx));
    const sqSizey = floor(random(0, cols-sqTopy));

    for(let i =sqTopx; i < sqSizex; i++){
        for(let j =sqTopy; j < sqSizey; j++){
            //2nd layer of randomness, 50% chance to disappear
            asciiMap[i][j] = random() < 0.5 ? asciiMap[i][j] : ' ';
        }
    }
}

//================ Color Controls =================
// change color every frame
function rainbowBlink() {
    push();
    textSize(txtSize);
    for (let i = 0; i < asciiMap.length; i++) {
        for (let j = 0; j < asciiMap[i].length; j++) {
            colorMap[i][j] = color(random(360), random(100), random(100));
            //text(asciiMap[i][j], i * txtGap, j * txtGap);
        }
    }
    pop();
}

function mouseColor() {
    push();
    for (let i = 0; i < asciiMap.length; i++) {
        for (let j = 0; j < asciiMap[i].length; j++) {
            colorMap[i][j] = color(map(mouseY, 0, height, 0, 360, true), map(mouseX, 0, width, 0, 100, true), 100);
        }
    }
    pop();
}

function mouseSpreadColor() {
    push();
    const initX = constrain(floor(mouseX / txtGap), 0, cols - 1);
    const initY = constrain(floor(mouseY / txtGap), 0, rows - 1);
    const spreadSize = floor(random(60));

    // end positions capped at the grid edge
    const endX = min(initX + spreadSize, cols);
    const endY = min(initY + spreadSize, rows);

    for (let i = initX; i < endX; i++) {
        for (let j = initY; j < endY; j++) {
            colorMap[i][j] = color(map(mouseX, 0, height, 0, 360, true), 100, 100);
        }
    }
    pop();

}
//note: 1 input make it back to initial simple = update everyframe