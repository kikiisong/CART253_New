/**
 * Gacha Machine
 * Kiki
 * 
 * Try the gacha machine and see what you can get
 */

"use strict";

const knob = {
    x: 125,
    y: 305,
    radius: 70
}

//use to determine drawn or not
const State = {
    IDLE: 0,
    DRAWN: 1
};
let currentState = 0;

//most recent drawn item
let outcome = {
    icon: null,
    name: null,
    rarity: null
}

//list of potential outcomes
const items = [
  { icon: "🍬", name: "Candy",   rarity: "Common" },
  { icon: "🧸", name: "Teddy Bear",   rarity: "Common" },
  { icon: "🎈", name: "Balloon", rarity: "Common" },
  { icon: "🥑", name: "Avocado", rarity: "Rare" },
  { icon: "🥐", name: "Croissant",  rarity: "Rare" },
  { icon: "✨", name: "Sparkles",   rarity: "Super Rare" },
  { icon: "🫂", name: "Hug", rarity: "Super Rare" }
];

/**
 * Set up canvas
*/
function setup() {
    createCanvas(500, 400);
}


/**
 * Draw components
*/
function draw() {
    background("#b3d8fd");
    drawMachine();
    if (currentState === 1) {
        drawResult();
    }

}

// draws the machine
function drawMachine() {
    drawContainer();
    drawKnob();
}

function drawContainer() {
    push();
    // container
    fill("#d6f2fcc3");
    quad(30, 40, 220, 40, 190, 250, 60, 250);
    fill("#05516cc3");
    quad(38, 90, 212, 90, 190, 250, 60, 250);

    pop();

}

function drawKnob() {

    push();
    // base
    fill("#748fba");
    rect(50, 250, 150, 120, 10);

    // circle
    fill("#e2eff0");
    circle(knob.x, knob.y, knob.radius);

    // handle
    fill("#e2eff0");
    rectMode(CENTER);
    rect(knob.x, knob.y, 52, 14, 7);

    pop();
}

function mousePressed() {
    if(mouseX>knob.x-knob.radius && mouseX<knob.x+knob.radius
        &&mouseY >knob.y-knob.radius && mouseY<knob.y+knob.radius)
        {
                doTheDraw();
        }

}

function doTheDraw() {
    // normal distribution
    const z = abs(randomGaussian(0, 1));

    // distance from the mean decides rarity
    let rarity;
    if (z < 1) rarity = "Common";
    else if (z < 2) rarity = "Rare";
    else rarity = "Super Rare";

    // pick a random item of that rarity
    const pick = random(items.filter(i => i.rarity === rarity));

    outcome.icon = pick.icon;
    outcome.name = pick.name;
    outcome.rarity = pick.rarity;

    currentState = State.DRAWN;
}

//draw the outcome
function drawResult() {
    push();
    textAlign(CENTER);
    textSize(70);
    text(outcome.icon, 350, 150);
    textSize(30);
    text(outcome.name, 350, 200);
    fill("#ffe49b")
    textSize(20);
    text(outcome.rarity, 350, 250);
    pop();
}