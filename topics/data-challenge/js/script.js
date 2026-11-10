/**
 * Colorful New Car
 * 
 * Kiki and Mona
 * 
 * Base code by Pippin Barr
 * 
 * A program to generate new car model names using color names and dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

//Define variables
let carData = undefined;
let dinosaurData = undefined;
let colorData = undefined;
let langData = undefined;

//Set language
let lang = "fr";

// Starts with the instruction
let carName = "Click to generate a car name.";

//Initial text color
let carColor = "pink";

/**
 * Load the car, dinosaur, color and language data
 */
async function preload() {
    carData = await loadJSON("assets/data/cars.json");
    dinosaurData = await loadJSON("assets/data/dinosaurs.json");
    langData = await loadJSON("assets/data/lang.json");
    colorData = await loadJSON("assets/data/wikipedia.json");
}

/**
 * Create the canvas
*/
async function setup() {
    
    createCanvas(600, 400);

    await preload();

    //Load chosen language
    carName = langData.instructions[lang];
}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background(0);

    push();
    fill(carColor);
    textAlign(CENTER, CENTER);
    textSize(32);
    text(carName, width / 2, height / 2);
    pop();
}

/**
 * Generate a new car name
 */
function mousePressed() {
    const car = random(carData.cars);
    const dinosaur = random(dinosaurData.dinosaurs);
    const color = random(colorData);
    //Update color from list of colors
    carColor = color.color;

    //Update car name with randomly picked color, car and dinosaur
    carName = color.name + "\n" + car + "\n" + dinosaur;
   
}