/**
 * Rhythm Game But Only Drums
 * Kiki
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

const beat = {
    kick:
    {
        type: 'kick',
        fill: '#aaccfe',
        audio: undefined
    },
    clap:
    {
        type: 'clap',
        fill: '#ffb5fa',
        audio: undefined
    },
    hihat:
    {
        type: 'hihat',
        fill: '#f9bc5f',
        audio: undefined
    }
};

const listBeats = [beat.kick, beat.clap, beat.hihat];
const timestamps = [1000, 7000, 12000];
let beatIndex = 0;
let beatOnCanvas = false;

const matchCircle = {
    y: 550,
    size: 50,
    stroke: '#ffffff',
    fill: '#ffffff7f'
};

const beatCircle = {
    startY: -25,
    y: 50,
    fill: '#ffffff',
    step: 2
};

// if hit, gets a point, or a ratio of points?
let points = 0;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
async function setup() {
    createCanvas(400, 600);
    for (let i = 0; i < listBeats.length; i++) {
        listBeats[i].audio = await loadSound(`assets/sounds/${listBeats[i].type}-808.wav`);
        console.log(listBeats[i]);
        setTimeout(() => {
            beatOnCanvas = true;
            beatCircle.fill = listBeats[i].fill;
            console.log("This message appears after " + timestamps[i]);
        }, timestamps[i]);
    }
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background("#000000");

    drawMatchCircle();
    if (beatOnCanvas) {
        drawBeatCircle();
    }
}

function drawMatchCircle() {
    push();
    stroke(matchCircle.stroke);
    fill(matchCircle.fill);
    circle(width / 2, matchCircle.y, matchCircle.size);
    pop();
}

function drawBeatCircle() {
    push();

    beatCircle.y += beatCircle.step;
    if (beatCircle.y > height) {
        resetBeatCircle();
    }

    noStroke();
    fill(beatCircle.fill);
    circle(width / 2, beatCircle.y, matchCircle.size);
    pop();
}

// 0 point if the 2 circles has no overlay
// if overlayed, calculates the ratio and give points
function getPoints() {
    listBeats[beatIndex].audio.play();
    beatIndex++;
    const precision = abs(beatCircle.y - matchCircle.y);
    console.log(precision / (matchCircle.size / 2));
    if (precision < matchCircle.size / 2) {
        points += 1 - precision / (matchCircle.size / 2);
    }

    resetBeatCircle();
}

function resetBeatCircle() {
    beatOnCanvas = false;
    beatCircle.y = beatCircle.startY;
}

function keyPressed() {
    userStartAudio();
    if (beatOnCanvas) {
        if (key === ' ') {
            getPoints();
            console.log("points: " + points);
        }
    }
}