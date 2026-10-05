/**
 * Choose Your Fighter
 * Kiki
 * 
 * Pick Your Fav!
 */

"use strict";

const canvasW = 500;
const canvasH = 600;

let characterIndex = 0;
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

const arrow = {
    base: 40,
    height: 20,
    gap: 20
};

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
    angleMode(DEGREES);

    //load image
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
    fill("#dccd82")
    triangle(-canvasW / 2 + arrow.gap + arrow.height, arrow.base / 2, -canvasW / 2 + arrow.gap + arrow.height, -arrow.base / 2, -canvasW / 2 + arrow.gap, 0);
    triangle(canvasW / 2 - arrow.gap - arrow.height, arrow.base / 2, canvasW / 2 - arrow.gap - arrow.height, -arrow.base / 2, canvasW / 2 - arrow.gap, 0);
    
    gl.enable(gl.DEPTH_TEST);
    pop();
}

// draw character based on current index
// one of the character is 3d and can be dragged 
function drawCharacter() {
    drawFront();
    drawBox();
    drawRoof();
}

function drawFront() {
    let w = cartonMeasures.boxWidth;
    let h = cartonMeasures.boxHeight;
    let d = cartonMeasures.boxDepth;
    // Front
    push();
    textureMode(NORMAL);
    console.log(characters);
    console.log(characterIndex);
    texture(characters[characterIndex].img);
    beginShape();
    vertex(-w / 2, -h / 2, d / 2, 0, 0);
    vertex(w / 2, -h / 2, d / 2, 1, 0);
    vertex(w / 2, h / 2, d / 2, 1, 1);
    vertex(-w / 2, h / 2, d / 2, 0, 1);
    endShape(CLOSE);
    pop();
}
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

function isPrevious() {
  return mouseX >= arrow.gap && mouseX <= arrow.gap + arrow.height &&
         mouseY >= canvasH/2-arrow.base / 2 && mouseY <= canvasH+arrow.base / 2;
}

function isNext() {
  return mouseX >= canvasW - arrow.gap - arrow.height && mouseX <= canvasW -arrow.gap &&
         mouseY >= canvasH/2-arrow.base / 2 && mouseY <= canvasH+arrow.base / 2;
}

function mouseClicked() {
  if (isPrevious()) {
    console.log("prev");
    characterIndex--;
  }else if(isNext())
  {
    console.log("next");
    characterIndex++;
  }
}