/**
 * VJ
 * Kiki
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

const symbols = " !\"#$%&'()*+,-./0123456789:;<=>?@";
const colorControl = {
    blank:"#ffffff"
};
let asciiMap = undefined;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(500, 500);
    asciiMap
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#000000");
    simple();
}

function simple() {
    push();
    fill(colorControl.blank);
    textSize(1);
    for(let i = 0; i<width; i+=2)
    {
        for(let j = 0; j< height; j+=2)
        {
            text(symbols[floor(random(symbols.length))], i, j);
        }
    }
    pop();
}