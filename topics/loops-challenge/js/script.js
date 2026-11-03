/**
 * Lines
 * Pippin Barr
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    background("pink");
    push();
    for (let bg_x = 0; bg_x <= width + 200; bg_x++)
    {
        // stroke(map(bg_x, 0, width, 0, 360), 50, 80);
        stroke(map(bg_x, 0, width, 0, 360) * cos(frameCount * 0.02) + 0, 50, 80);
        //line(bg_x, 0, bg_x, height);
        noFill();
        circle(width/2, height/2,bg_x);
    }
    pop();


    let strokeColor = 0;
    let x = 0;

    push();
    while(x <= 500)
    {
        stroke(strokeColor);
        line(x, 0, x, height);

        line(0, x, width, 0);

        strokeColor += 25;
        x += 50;
        
    }

    pop();

    // stroke(0);
    // line(0, 0, 0, height);
    
    // stroke(25);
    // line(50, 0, 50, height);
    
    // stroke(50);
    // line(100, 0, 100, height);
    
    // stroke(75);
    // line(150, 0, 150, height);
    
    // stroke(100);
    // line(200, 0, 200, height);
    
    // stroke(125);
    // line(250, 0, 250, height);
    
    // stroke(150);
    // line(300, 0, 300, height);
    
    // stroke(175);
    // line(350, 0, 350, height);
    
    // stroke(200);
    // line(400, 0, 400, height);
    
    // stroke(225);
    // line(450, 0, 450, height);
    
    // stroke(250);
    // line(500, 0, 500, height);
}