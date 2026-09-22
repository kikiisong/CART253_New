/**
 * Blueberry Swiss Roll
 * Kiki
 * 
 * Drawing a blueberry swiss roll
 */

"use strict";

/**
 * Setting up the canvas
*/
function setup() {
    createCanvas(420, 420);
}


/**
 * Draw the parts
*/
function draw() {
    // color background
    background("#FF9CB5");

    push();
    // draw the roll
    noStroke();
    for(let x = 0; x<=5; x++)
    {
        if( x%2 ===0)
        {
            fill("#9c66d9");       
        }else
        {
            fill("#fefcff");
        }
        ellipse(210,210, 50*(6-x), 50*(6-x));
    }
    
    // draw leaf & blueberries
    rotate(radians(-10));
    fill("#036e10"); 
    ellipse(245,100, 20, 50);
    rotate(radians(10));
    fill("#4b3663"); 
    ellipse(250,55, 30, 30);
    fill("#4b3663"); 
    ellipse(270,65, 25, 25);

    pop();
}