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
        fill: '#aaccfe'
    },
    clap:
    {
        type: 'clap',
        fill: '#ffb5fa'
    },
    hihat:
    {
        type: 'hihat',
        fill: '#f9bc5f'
    }
};

const listBeats = [beat.kick, beat.clap, beat.hihat];
const timestamps = [1000, 2000, 3000];

const matchCircle = {
    y: 550,
    size: 50,
    stroke: '#ffffff',
    fill: '#ffffff7f'
};

const beatCircle = {
    startY: 50,
    y: 50,
    fill: '#ffffff'
};

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(400, 600);
    for (let i = 0; i < listBeats.length; i++) {
        setTimeout(() => {
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
    drawBeatCircle();
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
    noStroke();
    fill(beatCircle.fill);
    circle(width / 2, beatCircle.y, matchCircle.size);
    pop();
}