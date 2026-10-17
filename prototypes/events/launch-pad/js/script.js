/**
 * Launchpad
 * Kiki
 * 
 * A launchpad to practice beat-making
 */

"use strict";

//define the key controls
const padKeys = 'qweasdzxc';

//define the pad variable
let pad = {
    size: 100,
    x: 50,
    y: 500,
    beats: Array(9).fill(null),
    flash: Array(9).fill(0),
    colors: Array(9).fill(null)
}

//the list of .wav file names
const beatNames = [
    'kick', 'snare', 'hihat',
    'openhat', 'clap', 'tom',
    'perc', 'cowbell', 'crash'
];

const canvasW = 900;
const canvasH = 900;
const paintH = 400;
let paint;


/**
 * Setting up the canvas
*/
async function setup() {
    createCanvas(canvasW, canvasH);
    // load beats
    for (let i = 0; i < pad.beats.length; i++) {
        pad.beats[i] = await loadSound(`assets/sounds/${beatNames[i]}-808.wav`);
        //assign random color for each square
        pad.colors[i] = color(random(60, 255), random(60, 255), random(60, 255));
    }
    // a seperate canvas layer for drawing
    paint = createGraphics(canvasW, paintH);
    paint.background(20);
}


/**
 * Draw components
*/
function draw() {
    background(30);
    // show the paint area
    image(paint, 0, 0); 
    drawPads();
}

/**
 * Draw pads, flash if pressed
 */
function drawPads() {
    push();
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const i = r * 3 + c;
            fill(millis() - pad.flash[i] < 120 ? pad.colors[i] : 70);
            rect(pad.x + c * pad.size, pad.y + r * pad.size, pad.size - 4, pad.size - 4, 8);
        }
    }
    pop();
}

/**
 * Key input reactions
 */
function keyPressed() {
    userStartAudio();
    const i = padKeys.indexOf(key.toLowerCase());
    if (i !== -1) {
        // play the correspoinding beat and initiate the flash
        pad.beats[i].play();
        pad.flash[i] = millis();

        // draw a circle in the pad's color at a random spot in the paint area
        const size = random(20, 70);
        paint.noStroke();
        paint.fill(pad.colors[i]);
        paint.circle(random(size / 2, canvasW - size / 2), random(size / 2, paintH - size / 2), size);
    }
}

