/**
 * Launchpad
 * Kiki
 * 
 * A launchpad to practice beat-making
 */

"use strict";

let pad = {
    size: 100,
    x: 50,
    y: 500,
    beats: [],
    flash: Array(9).fill(0)
}
/**
 * Setting up the canvas
*/
function setup() {
    createCanvas(900, 900);
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

function mousePressed() {
    userStartAudio();
    const c = floor((mouseX - pad.x) / pad.size);
    const r = floor((mouseY - pad.y) / pad.size);
    if (c >= 0 && c < 3 && r >= 0 && r < 3) {
        const i = r * 3 + c;
        //pad.beats[i].play();
        pad.flash[i] = millis();
    }
}