/**
 * Sticky Notes
 * Kiki
 * 
 * Paranatural Entity S-13
 */

"use strict";

const stickyNotes = [];
let timer = 0;
let interval = 2000;
let maxInterval = 2000;
let minInterval = 1000;


/**
 * set up canvas and timer
*/
function setup() {
    createCanvas(1000, 800);
    timer = millis();
}


/**
 * draw components, and logic for adding sticky notes
*/
function draw() {
    background('#a9a0a0');

    // add a new note if the interval has passed
    if (millis() - timer > interval) {
        console.log("timer triggered");
        createStickyNote();
        // reset the timer
        timer = millis(); 
        // reset the interval
        interval = random(minInterval, maxInterval);
        // increase the speed as time goes on
        minInterval -= random(50, 100);
        minInterval = constrain(minInterval, 10, maxInterval);
        maxInterval -= random(50, 100);
        maxInterval = constrain(maxInterval, minInterval, maxInterval);
    }
    drawStickyNote();
}

// create a new sticky note and add to the array
function createStickyNote() {
    const newStickyNote = {
        x: random(0, width),
        y: random(0, height),
        size: random(80, 150)
    };
    stickyNotes.push(newStickyNote);

}

// goes through the array and draw every sticky notes
// add a bit jiggle to the positions
function drawStickyNote() {
    push();
    // stroke so the sticky notes doesn't look merged
    stroke('#1f16169a');
    fill('#f4e571');
    for (const note of stickyNotes) {
        rect(note.x + random(-2, 2), note.y + random(-2, 2), note.size, note.size);
    }
    pop();
}