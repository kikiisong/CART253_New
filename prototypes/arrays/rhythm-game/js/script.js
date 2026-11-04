/**
 * Rhythm Game But Only Drums
 * Kiki
 * 
 * Only drums
 */

"use strict";

// type of the beats
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

// list of incoming beats and corresponding timestamp (for appearing on screen)
const listBeats = [beat.kick, beat.clap, beat.hihat];
const timestamps = [1000, 6000, 11000];
// to track current beat to play the sound
let beatIndex = 0;
// variables to assist drawing and logic
let beatOnCanvas = false;
let gameEnd = false;

// target circle
const matchCircle = {
    y: 550,
    size: 50,
    stroke: '#ffffff',
    fill: '#ffffff7f'
};

// moving beat circle
const beatCircle = {
    startY: -25,
    y: 50,
    fill: '#ffffff',
    step: 8
};

// if hit a ratio of points depends how overlapped the 2 circles are
let points = 0;

/**
 * set up the canvas, add audio for each beat, and set up timed events
*/
async function setup() {
    createCanvas(400, 600);
    // loop through the list of incoming beats
    for (let i = 0; i < listBeats.length; i++) {
        // set up the audio
        // this works right now cuz it's exactly one beat type in the array
        listBeats[i].audio = await loadSound(`assets/sounds/${listBeats[i].type}-808.wav`);
        //console.log(listBeats[i]);
        // beat comes in at predefined timestamps
        setTimeout(() => {
            beatOnCanvas = true;
            beatCircle.fill = listBeats[i].fill;
            //console.log("This message appears after " + timestamps[i]);
        }, timestamps[i]);
    }
}


/**
 * draw components
*/
function draw() {
    background("#000000");

    
    if (!gameEnd) { // if game not ended
        drawMatchCircle(); // draw the target circle
        if (beatOnCanvas) { // if a beat came in and has not leave the canvas area
            drawBeatCircle();
        }
    } else {// show score if game eneded
        drawScore();
    }
}

/**
 * Show score as the end game screen
 */
function drawScore() {
    fill('#ffffff');
    textAlign(CENTER, CENTER);

    textSize(48);
    // only keep 2 decimals
    text('Score: ' + points.toFixed(2) + '/ 3', width / 2, height / 2);

}

/**
 * Draw target circle at the bottom
 */
function drawMatchCircle() {
    push();
    stroke(matchCircle.stroke);
    fill(matchCircle.fill);
    circle(width / 2, matchCircle.y, matchCircle.size);
    pop();
}

/**
 * Draw circle of the incomin beat
 */
function drawBeatCircle() {
    push();

    // move towards the target
    beatCircle.y += beatCircle.step;
    // if the circle moved out of the canvas, reset. i.e. missed
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
    // play corresponding audio
    listBeats[beatIndex].audio.play();
    const precision = abs(beatCircle.y - matchCircle.y);
    //console.log(precision / (matchCircle.size / 2));
    if (precision < matchCircle.size / 2) {
        points += 1 - precision / (matchCircle.size / 2);
    }

    resetBeatCircle();

}

/**
 * reset the beat circle
 */
function resetBeatCircle() {
    // remove beat circle from screen and reset y position
    beatOnCanvas = false;
    beatCircle.y = beatCircle.startY;
    // to switch to the next beat, mainly for audio
    beatIndex++;

    // game end if end of list of incoming beats reached
    if (beatIndex >= listBeats.length) {
        gameEnd = true;
    }
}

/**
 * interaction: press space
 */
function keyPressed() {
    userStartAudio();

    if (beatOnCanvas) { // only works if there's a beat on screen
        if (key === ' ') { //detect space and calculates points
            getPoints();
            //console.log("points: " + points);
        }
    }
}