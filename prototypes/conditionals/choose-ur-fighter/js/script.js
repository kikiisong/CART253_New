/**
 * Choose Your Fighter
 * Kiki
 * 
 * Pick Your Fav!
 */

"use strict";

const canvasW = 500;
const canvasH = 600;

// current character index
let characterIndex = 0;
// array of avaiable characters
const characters = [
    {
        name: "Melon",
        imgPath: "assets/images/melon_front.png",
        img: undefined,
        color: "#98f17e"
    },
    {
        name: "Strawberry",
        imgPath: "assets/images/strawberry_front.png",
        img: undefined,
        color: "#edbaf7"
    },
     {
        name: "Chocolate",
        imgPath: "assets/images/chocolate_front.png",
        img: undefined,
        color: "#33261d"
    }
];

// measurements for the next and previous arrow buttons
const arrow = {
    base: 40,
    height: 20,
    gap: 20
};

// measurements for the character(s) - milk carton
const cartonMeasures = {
    boxWidth: 160,
    boxHeight: 180,
    boxDepth: 160,
    roofHeight: 90,
    extraHeight: 10
};

/**
 * Set up the canvas
*/
async function setup() {
    createCanvas(canvasW, canvasH, WEBGL);

    //load image for each character in the array
    for(let i =0; i<characters.length; i++)
    {
        characters[i].img=await loadImage(characters[i].imgPath);
    }

}


/**
 * Draw components
*/
function draw() {
    background("#5fbcfa");

    //turn on the mouse control for 3d objects (character)
    orbitControl();
    //current character
    drawCharacter();

    //buttons to go to next/previous character
    drawArrows();

}

// draw left & right arrow
// on click, update the current character index
function drawArrows() {
    push();

    //reset transforms, camera and perspective to make sure the arrows don't rotate with the 3d character
    resetMatrix();                 
    camera();                      
    perspective(); 
    let gl = drawingContext;
    gl.disable(gl.DEPTH_TEST);

    noStroke();
    fill("#dccd82");
    //only display the left arrow if not the first character in array
    if(characterIndex>0)
    {
        triangle(-canvasW / 2 + arrow.gap + arrow.height, arrow.base / 2, -canvasW / 2 + arrow.gap + arrow.height, -arrow.base / 2, -canvasW / 2 + arrow.gap, 0);
    }
    //only display right arrow if not the last character in array
    if(characterIndex < characters.length-1)
    {
        triangle(canvasW / 2 - arrow.gap - arrow.height, arrow.base / 2, canvasW / 2 - arrow.gap - arrow.height, -arrow.base / 2, canvasW / 2 - arrow.gap, 0);
    
    }
    
    gl.enable(gl.DEPTH_TEST);
    pop();
}

// draw character based on current index
// one of the character is 3d and can be dragged 
function drawCharacter() {
    //separate each faces individually instead of drawing just a box
    // to give different textures/colors to each face
    drawFront();
    drawBox();
    drawRoof();
}

// draw front of the carton box
// use an image as texture
function drawFront() {
    let w = cartonMeasures.boxWidth;
    let h = cartonMeasures.boxHeight;
    let d = cartonMeasures.boxDepth;
    // Front
    push();
    textureMode(NORMAL);

    texture(characters[characterIndex].img);
    beginShape();
    vertex(-w / 2, -h / 2, d / 2, 0, 0);
    vertex(w / 2, -h / 2, d / 2, 1, 0);
    vertex(w / 2, h / 2, d / 2, 1, 1);
    vertex(-w / 2, h / 2, d / 2, 0, 1);
    endShape(CLOSE);
    pop();
}

// draw the rest of the box with solid colors
function drawBox() {

    let w = cartonMeasures.boxWidth;
    let h = cartonMeasures.boxHeight;
    let d = cartonMeasures.boxDepth;


    push();
    // Back
    fill("#ffffff");
    beginShape();
    vertex(w / 2, -h / 2, -d / 2);
    vertex(-w / 2, -h / 2, -d / 2);
    vertex(-w / 2, h / 2, -d / 2);
    vertex(w / 2, h / 2, -d / 2);
    endShape(CLOSE);

    // Left
    beginShape();
    fill(characters[characterIndex].color);
    vertex(-w / 2, -h / 2, -d / 2);
    vertex(-w / 2, -h / 2, d / 2);
    vertex(-w / 2, h / 2, d / 2);
    vertex(-w / 2, h / 2, -d / 2);
    endShape(CLOSE);

    // Right
    beginShape();
    vertex(w / 2, -h / 2, d / 2);
    vertex(w / 2, -h / 2, -d / 2);
    vertex(w / 2, h / 2, -d / 2);
    vertex(w / 2, h / 2, d / 2);
    endShape(CLOSE);

    // Bottom
    fill("#ffffff");
    beginShape();
    vertex(-w / 2, h / 2, d / 2);
    vertex(w / 2, h / 2, d / 2);
    vertex(w / 2, h / 2, -d / 2);
    vertex(-w / 2, h / 2, -d / 2);
    endShape(CLOSE);
    pop();

}

// draw the roofs with solid colors
function drawRoof() {
    let w = cartonMeasures.boxWidth;
    let h = cartonMeasures.boxHeight;
    let d = cartonMeasures.boxDepth;
    let roofH = cartonMeasures.roofHeight;
    let extraH = cartonMeasures.extraHeight;

    push();
    // Front
    fill("#ffffff");
    beginShape();
    vertex(-w / 2, -h / 2, d / 2);
    vertex(w / 2, -h / 2, d / 2);
    vertex(0, -(h / 2 + roofH), d / 2);
    endShape(CLOSE);

    // Back
    beginShape();
    vertex(-w / 2, -h / 2, -d / 2);
    vertex(w / 2, -h / 2, -d / 2);
    vertex(0, -(h / 2 + roofH), -d / 2);
    endShape(CLOSE);

    // Left
    fill(characters[characterIndex].color);
    beginShape();
    vertex(-w / 2, -h / 2, d / 2);
    vertex(0, -(h / 2 + roofH), d / 2);
    vertex(0, -(h / 2 + roofH), -d / 2);
    vertex(-w / 2, -h / 2, -d / 2);
    endShape(CLOSE);

    // Right
    beginShape();
    vertex(w / 2, -h / 2, d / 2);
    vertex(0, -(h / 2 + roofH), d / 2);
    vertex(0, -(h / 2 + roofH), -d / 2);
    vertex(w / 2, -h / 2, -d / 2);
    endShape(CLOSE);

    // Little extra piece
    fill("#ffffff");
    beginShape();
    vertex(0, -(h / 2 + roofH), d / 2);
    vertex(0, -(h / 2 + roofH + extraH), d / 2);
    vertex(0, -(h / 2 + roofH + extraH), -d / 2);
    vertex(0, -(h / 2 + roofH), -d / 2);
    endShape(CLOSE);
    pop();
}

// return if clicked position is within the previous button area
function isPrevious() {
  return mouseX >= arrow.gap && mouseX <= arrow.gap + arrow.height &&
         mouseY >= canvasH/2-arrow.base / 2 && mouseY <= canvasH+arrow.base / 2;
}

// return if clicked position is within the next button area
function isNext() {
  return mouseX >= canvasW - arrow.gap - arrow.height && mouseX <= canvasW -arrow.gap &&
         mouseY >= canvasH/2-arrow.base / 2 && mouseY <= canvasH+arrow.base / 2;
}


function mouseClicked() {
    //only click if previous/next arrow is showing up
  if (characterIndex > 0 && isPrevious()) {
    characterIndex--;
    // resets camera if character switched
    camera();
  }
  else if(characterIndex < characters.length-1 && isNext())
  {
    characterIndex++;
    // resets camera if character switched
    camera();
  }
}