/**
 * VJ
 * Kiki
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

const symbols = " !\"#$%&'()*+,-./0123456789:;<=>?";
const colorControl = {
    blank: "#ffffff"
};

const txtSize = 10;
const txtGap = 10;
let asciiMap = undefined;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(500, 500);
    initAsciiMap();
}

/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#000000");
    simple();
}

function initAsciiMap() {
    const cols = ceil(width / txtGap);
    const rows = ceil(height / txtGap);

    asciiMap = [];
    for (let i = 0; i < cols; i++) {
        asciiMap[i] = [];
        for (let j = 0; j < rows; j++) {
            asciiMap[i][j] = symbols[floor(random(symbols.length))];
        }
    }
}

function simple() {
    push();
    fill(colorControl.blank);
    textSize(txtSize);
    for (let i = 0; i < asciiMap.length; i++) {
        for (let j = 0; j < asciiMap[i].length; j++) {
            text(asciiMap[i][j], i * txtGap, j * txtGap);
        }
    }
    pop();
}

//note: 1 input make it back to initial simple = update everyframe