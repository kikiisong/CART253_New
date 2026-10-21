/**
 * Launchpad
 * Kiki
 * 
 * A launchpad to practice beat-making (draw)
 */

"use strict";

//define the key controls
const padKeys = 'qweasdzxc';

// the board that contains the pads and the keyboard
const board = {
    x: 10,
    y: 450,
    width: 880,
    height: 450
}

//define the pad variable
const pad = {
    size: 100,
    x: 50,
    y: 500,
    beats: Array(9).fill(null),
    flash: Array(9).fill(0),
    colors: Array(9).fill(null)
}

// keyboard...placeholder for now
const keyboard = {
    x: 400,
    y: 500,
    width: 450,
    height: 300
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
// additional canvas for painting
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

    drawBoard();
    drawPads();
    drawKeyboard();
}

/**
 * draw the board
 */
function drawBoard() {
    push();
    fill(10);
    rect(board.x, board.y, board.width, board.height);
    pop();
}

/**
 * Draw pads, flash if pressed
 */
function drawPads() {
    push();
    // 3*3 squares
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const i = r * 3 + c;
            fill(millis() - pad.flash[i] < 120 ? pad.colors[i] : 70);
            rect(pad.x + c * pad.size, pad.y + r * pad.size, pad.size - 4, pad.size - 4, 8);

            // key text
            fill(150);
            textSize(20);
            text(padKeys[i], pad.x + (c+1) * pad.size - 20, pad.y + (r+1) * pad.size-20);
        }
    }
    pop();
}

/**
 * Draw keyboard placeholder
 */
function drawKeyboard() {
    push();
    fill(50);
    rect(keyboard.x, keyboard.y, keyboard.width, keyboard.height);
    // centered text
    fill(150);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("< Keyboard under construction >", keyboard.x + keyboard.width / 2, keyboard.y + keyboard.height / 2);
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
        // avoid circle being cut by the edge
        paint.circle(random(size / 2, canvasW - size / 2), random(size / 2, paintH - size / 2), size);
    }
}
