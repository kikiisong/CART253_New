/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";
const canvasW = 280;
const canvasH = 1000;

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
        color: '#ffffff'
    },
    marker: {
        x: 10,
        size: 8,
        color: '#49484b',
        single: [3, 5, 7, 9, 15, 17, 19],
        double: [12]
    }
};

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(canvasW, canvasH);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background('#2d2017');
    drawFrets();
    drawMarkers();
    drawStrings();
    
    const note = getCellAt(mouseX, mouseY);
    cursor(note ? HAND : ARROW);
    drawHover(note);
}

function drawFrets()
{
    push();
    stroke(bass.fret.color);
    strokeWeight(bass.fret.strokeW);
 
    for (let i = 0; i <= bass.fret.num; i++) {
        line(0, bass.fret.top + i * bass.fret.height, width, bass.fret.top + i * bass.fret.height);
    }

    pop();
}

function drawMarkers()
{
    push();
    noStroke();
    fill(bass.marker.color);
 
    for (let n of bass.marker.single) {
        circle(bass.marker.x, bass.fret.top + (n-0.5) * bass.fret.height, bass.marker.size);
    }
 
    for (let n of bass.marker.double) {
        circle(bass.marker.x, bass.fret.top + (n-0.5) * bass.fret.height, bass.marker.size);
        circle(bass.marker.x + bass.marker.size + 2, bass.fret.top + (n-0.5) * bass.fret.height, bass.marker.size);
    }
 
    pop();
}

function drawStrings()
{
    const s = bass.string;
 
    push();
    stroke(s.color);
    strokeWeight(s.strokeW);
 
    for (let i = 0; i < s.num; i++) {
        line(s.x+(i + 0.5) * s.width, bass.fret.top, s.x+(i + 0.5) * s.width, bass.fret.top + bass.fret.num * bass.fret.height);
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

function drawHover(cell)
{
    if (!cell) return;

    const r = cellRect(cell.string, cell.fret);
 
    push();
    noStroke();
    fill('#ffffff53');
    rect(r.x, r.y, r.w, r.h);
 
    pop();
}

function cellRect(string, fret) {
    return {
        x: bass.string.x+(string + 0.5) * bass.string.width - bass.string.width / 2,
        y: bass.fret.top + (fret-1) * bass.fret.height,
        w: bass.string.width,
        h: bass.fret.height
    };
}