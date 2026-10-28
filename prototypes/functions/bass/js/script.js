/**
 * Bass
 * Kiki
 * 
 * Helper for memorizing bass notes (& ear training)
 */

"use strict";
const canvasW = 280;
const canvasH = 1000;

// note names in order
const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// determines if hover shows the note's name, can be turned on/off with spacebar
let showNotes = false;

// measurements
const bass = {
    fret: {
        top: 20,
        height: 45,
        strokeW: 2,
        num: 20,
        color: '#49484b'
    },
    string: {
        x: 30,
        width: 60,
        strokeW: 2,
        num: 4,
        color: '#ffffff',
        tuning: [41.2, 55.0, 73.42, 98.0], // standard bass tuning in Hz
        notes: [4, 9, 2, 7] //open strings notes - index in noteNames array
    },
    marker: {
        x: 10,
        size: 8,
        color: '#49484b',
        single: [3, 5, 7, 9, 15, 17, 19], //single dot
        double: [12] //double dots
    }
};

let note = null;
// sound meta
let osc;
let stopTimer;
const noteVolume = 0.8;  // volume while a note plays
const noteLength = 400;  // how long a note plays

/**
 * Set up the canvas and the osillator
*/
function setup() {
    createCanvas(canvasW, canvasH);

    osc = new p5.Oscillator('triangle');
    osc.amp(0); // starts silent, or it will constantly play a sound
    osc.start();
}


/**
 * Draw the components
*/
function draw() {
    background('#2d2017');
    drawFrets();
    drawMarkers();
    drawStrings();

    // check overlap with which fret
    note = getCellAt(mouseX, mouseY);
    cursor(note ? HAND : ARROW);
    // draw highlight if hovered
    drawHover(note);
}

/**
 * draw frets
 */
function drawFrets() {
    push();
    stroke(bass.fret.color);
    strokeWeight(bass.fret.strokeW);

    for (let i = 0; i <= bass.fret.num; i++) {
        line(0, bass.fret.top + i * bass.fret.height, width, bass.fret.top + i * bass.fret.height);
    }

    pop();
}

/**
 * draw markers
 */
function drawMarkers() {
    push();
    noStroke();
    fill(bass.marker.color);

    for (let n of bass.marker.single) {
        circle(bass.marker.x, bass.fret.top + (n - 0.5) * bass.fret.height, bass.marker.size);
    }

    for (let n of bass.marker.double) {
        circle(bass.marker.x, bass.fret.top + (n - 0.5) * bass.fret.height, bass.marker.size);
        circle(bass.marker.x + bass.marker.size + 2, bass.fret.top + (n - 0.5) * bass.fret.height, bass.marker.size);
    }

    pop();
}

/**
 * draw strings
 */
function drawStrings() {
    const s = bass.string;

    push();
    stroke(s.color);
    strokeWeight(s.strokeW);

    for (let i = 0; i < s.num; i++) {
        line(s.x + (i + 0.5) * s.width, bass.fret.top, s.x + (i + 0.5) * s.width, bass.fret.top + bass.fret.num * bass.fret.height);
    }

    pop();
}

// check which cell is at the position
function getCellAt(x, y) {
    for (let s = 0; s < bass.string.num; s++) {
        for (let f = 1; f <= bass.fret.num; f++) {
            const r = cellRect(s, f);
            if (x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h) {
                return { string: s, fret: f };
            }
        }
    }
    return null;
}

/**
 * 
 * a semi-transparent rect highlight over the clickable area of a note
 */
function drawHover(cell) {
    if (!cell) return;

    const r = cellRect(cell.string, cell.fret);

    push();
    noStroke();
    fill('#ffffff53');
    rect(r.x, r.y, r.w, r.h);

    // if show notes mode on, calculate & draw the node name
    if (showNotes) {
        const name = noteNames[(bass.string.notes[cell.string] + cell.fret) % 12];
        const x = r.x + r.w/2;
        const y = r.y + r.h/2;

        textAlign(CENTER, CENTER);
        textSize(20);
        noStroke();
        fill('#000000');
        text(name, x, y);
    }

    pop();
}

/**
 * calculate the rectangle that covers the current hovered note
 *  
 */
function cellRect(string, fret) {
    return {
        x: bass.string.x + (string + 0.5) * bass.string.width - bass.string.width / 2,
        y: bass.fret.top + (fret - 1) * bass.fret.height,
        w: bass.string.width,
        h: bass.fret.height
    };
}

/**
 * 
 * Play the corresponding note (frequency) for a short time 
 * wasn't able to figure out the oscillator so using a manual solution for now
 */
function playNote(string, fret) {
    osc.freq(bass.string.tuning[string] * Math.pow(2, fret / 12));
    osc.amp(noteVolume);

    // cancel the old timer if needed
    clearTimeout(stopTimer);
    stopTimer = setTimeout(() => osc.amp(0), noteLength);
}

/**
 * play note when clicked on a rectangle
 */
function mousePressed() {
    userStartAudio();

    const cell = getCellAt(mouseX, mouseY);
    if (cell) {
        playNote(cell.string, cell.fret);
    }
}

// press space to turn on/off show nodes mode
function keyPressed() {
    if (key === ' ') {
        showNotes = !showNotes;
    }
}
