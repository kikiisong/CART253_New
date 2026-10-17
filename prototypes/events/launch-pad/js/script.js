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
    flash: Array(9).fill(0)
}

//the list of .wav file names
const beatNames = [
  'kick', 'snare', 'hihat',
  'openhat', 'clap', 'tom',
  'perc', 'cowbell', 'crash'
];


/**
 * Setting up the canvas
*/
async function setup() {
    createCanvas(900, 900);
    // load beats
    for (let i = 0; i < pad.beats.length; i++) {
        pad.beats[i] = await loadSound(`assets/sounds/${beatNames[i]}-808.wav`);
  }
}


/**
 * Draw components
*/
function draw() {
    background(30);
    drawPads();
}

function drawPads() {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const i = r * 3 + c;
            fill(millis() - pad.flash[i] < 120 ? 'orange' : 70);
            rect(pad.x + c * pad.size, pad.y + r * pad.size, pad.size - 4, pad.size - 4, 8);
        }
    }
}

function keyPressed() {
  userStartAudio();
  const i = padKeys.indexOf(key.toLowerCase());
  if (i !== -1) {
    pad.beats[i].play();
    pad.flash[i] = millis();
  }
}

