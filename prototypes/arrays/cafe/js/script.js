/**
 * Cafe
 * Kiki
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// current order player need to make
let orders = [];
const orderNum = 4;
// current order item index
let currentOrder = 0;
// keep track of how long order has been put in
let currentOrderStart = undefined;
// order can wait this long before getting cancelled
let orderMaxDuration = 10000;
// ingredients get added to cup on mouse clicks
let inCup = [];
// if in cup ingredients can make a menu item, product record the item
let product = undefined;
// success order num
let points = 0;
let gameEnd = false;

const fruit = {
    berries: {
        name: "berries",
        emoji: "🫐"
    },
    melon: {
        name: "melon",
        emoji: "🍈"
    },
    pomegranate: {
        name: "pomegranate",
        emoji: "🍎"
    }
}

const syrup = {
    blossom: {
        name: "orange blossom",
        emoji: "🌸"
    },
    peace: {
        name: "peace & love",
        emoji: "💗"
    },
    night: {
        name: "vel of the night",
        emoji: "🌌"
    }
}

const menuItem = {
    magical: {
        name: "Magical Berries",
        ingredients: [fruit.berries, syrup.peace]
    },
    dragon: {
        name: "Dragon's Eyeball",
        ingredients: [fruit.pomegranate, syrup.night]
    },
    summer: {
        name: "Summer Breeze",
        ingredients: [fruit.melon, syrup.blossom]
    }
};


const menuItems = [menuItem.magical, menuItem.dragon, menuItem.summer];
const fruits = [fruit.berries, fruit.melon, fruit.pomegranate];
const syrups = [syrup.stardust, syrup.peace, syrup.night];
//const garnish = [""]

//measurement of the drawn items
const counter = {
    fill: '#8b5a2b',
    edge:
    {
        fill: '#a67340',
        height: 12
    }
};

const fruitStation = {
    baseY: 300, // y of the bottom of the cans
    can: {
        width: 80,
        height: 90,
        fill: '#d498e6',
        lidFill: '#dab3e3',
        stroke: '#eac96e',
        strokeWeight: 2,
        ellipseHeight: 22, // height of the top and bottom ellipses
        emojiSize: 36
    },
    // one can per fruit
    items: [
        { ingredient: fruit.berries, x: 620 },
        { ingredient: fruit.melon, x: 730 },
        { ingredient: fruit.pomegranate, x: 840 }
    ]
};

const syrupStation = {
    baseY: 450, // y of the bottom of the containers
    container: {
        width: 80,
        height: 100,
        corner: 6,
        fill: '#f4c278',
        stroke: '#6db7e9',
        strokeWeight: 2,
        cap: {
            fill: '#6db7e9',
            width: 36,
            height: 12,
            corner: 3
        },
        emojiSize: 32
    },
    // one container per syrup
    items: [
        { ingredient: syrup.blossom, x: 620 },
        { ingredient: syrup.peace, x: 730 },
        { ingredient: syrup.night, x: 840 }
    ]
};

const cup = {
    x: 450, // center x
    baseY: 300, // y of the bottom
    height: 100,
    topWidth: 70,
    bottomWidth: 45,
    stroke: '#91b7fd',
    strokeWeight: 3,
    fill: '#91b7f49a',
    bottomEllipseHeight: 14,
    rimHeight: 18,
    emojiSize: 20
};

const orderBubble = {
    fill: '#ffffffda',
    stroke: '#40559c', // dark blue
    strokeWeight: 3,
    // the large bubble
    main: { x: 190, y: 140, width: 270, height: 110 },
    // small bubbles
    minis: [
        { x: 98, y: 262, size: 12 },
        { x: 118, y: 232, size: 20 }
    ],
    content: { fill: '#1b2a5c', size: 24 }
};


/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(900, 600);

    // generate the list of menu 
    for (let i = 0; i < orderNum; i++) {
        orders.push(random(menuItems));
    }
    console.log(orders);
    //set 1st order
    currentOrder = 0;
    currentOrderStart = millis();
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background('#9cd5f8');

    if (!gameEnd) {
        drawCafe();
        drawFruitStation();
        drawSyrupStation();
        drawCup();
        //customer come & ask for type of drink
        updateOrder();
        drawOrder();
    } else {
        drawScore();
    }
}

function drawCafe() {
    push();
    noStroke();
    fill(counter.fill);
    rect(0, height / 2, width, height / 2);
    // lighter edge along the top
    fill(counter.edge.fill);
    rect(0, height / 2, width, counter.edge.height);
    // shelf
    rect(0, height / 4 * 3, width, counter.edge.height);
    pop();
}

function drawFruitStation() {
    const { baseY, can, items } = fruitStation;
    const top = baseY - can.height;

    push();
    for (const item of items) {
        stroke(can.stroke);
        strokeWeight(can.strokeWeight);
        // body
        fill(can.fill);
        rect(item.x - can.width / 2, top, can.width, can.height);
        // rounded bottom
        ellipse(item.x, baseY, can.width, can.ellipseHeight);
        // hide the seam between the body and the bottom ellipse
        noStroke();
        rect(item.x - can.width / 2 + 1, baseY - can.ellipseHeight / 2, can.width - 2, can.ellipseHeight / 2);
        // top lid
        stroke(can.stroke);
        fill(can.lidFill);
        ellipse(item.x, top, can.width, can.ellipseHeight);

        // emoji label
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(can.emojiSize);
        text(item.ingredient.emoji, item.x, top + can.height / 2 + 4);
    }
    pop();
}
function drawSyrupStation() {
    const { baseY, container, items } = syrupStation;
    const cap = container.cap;
    const top = baseY - container.height;

    push();
    for (const item of items) {
        // container
        stroke(container.stroke);
        strokeWeight(container.strokeWeight);
        fill(container.fill);
        rect(item.x - container.width / 2, top, container.width, container.height, container.corner);

        // cap
        fill(cap.fill);
        rect(item.x - cap.width / 2, top - cap.height, cap.width, cap.height, cap.corner);

        // emoji label
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(container.emojiSize);
        text(item.ingredient.emoji, item.x, top + container.height / 2);
    }
    pop();
}

function drawCup() {
    const top = cup.baseY - cup.height;

    push();

    // draw ingredients in the cup
    for (let i = 0; i < inCup.length; i++) {
        const item = inCup[i];
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(cup.emojiSize);
        text(item.emoji, cup.x, cup.baseY - cup.bottomEllipseHeight - i * cup.emojiSize);
    }

    stroke(cup.stroke);
    strokeWeight(cup.strokeWeight);
    fill(cup.fill);
    // cup body
    beginShape();
    vertex(cup.x - cup.topWidth / 2, top);
    vertex(cup.x + cup.topWidth / 2, top);
    vertex(cup.x + cup.bottomWidth / 2, cup.baseY);
    vertex(cup.x - cup.bottomWidth / 2, cup.baseY);
    endShape(CLOSE);
    // rounded bottom and rim
    ellipse(cup.x, cup.baseY, cup.bottomWidth, cup.bottomEllipseHeight);
    fill(cup.fill);
    ellipse(cup.x, top, cup.topWidth, cup.rimHeight);
    pop();
}

function drawOrder() {
    const order = orders[currentOrder];
    //console.log(order);
 
    const { main, minis, content} = orderBubble;
 
    push();
    stroke(orderBubble.stroke);
    strokeWeight(orderBubble.strokeWeight);
    fill(orderBubble.fill);
 
    // trail of small bubbles
    for (const mini of minis) {
        circle(mini.x, mini.y, mini.size);
    }
    // main bubble
    ellipse(main.x, main.y, main.width, main.height);
 
    // order name in the center
    noStroke();
    fill(content.fill);
    textAlign(CENTER, CENTER);
    textSize(content.size);
    text(order.name, main.x, main.y);
    pop();
}

function drawScore() {

}

function updateOrder() {
    const timeElapsed = millis() - currentOrderStart;
    // if order time has passed, go to next order without getting points
    if (timeElapsed > orderMaxDuration) {
        nextOrder();
    }

}

// check if current items in cup can make menu item
function canMakeItem() {
    if (inCup.length === 2) {
        for (const item of menuItems) {
            // since in cup length needs to be 2 and ingredients is always 2, we make sure this match means exact ingredient match
            // may need to change if more complex recipe gets added
            const matches = item.ingredients.every(ing => inCup.includes(ing));
            if (matches) {
                //clear the cup
                inCup.length = 0;
                console.log("matched " + item.name);
                return item;
            }
        }
    }
    //clear the cup
    inCup.length = 0;
    return null;
}

// check if point is inside the rectangle
function pointInRect(px, py, left, top, w, h) {
    return px >= left && px <= left + w && py >= top && py <= top + h;
}

// return fruit if mouse overlap with a fruit
function getClickedFruit() {
    const { baseY, can, items } = fruitStation;
    // include the lid and rounded bottom
    const top = baseY - can.height - can.ellipseHeight / 2;
    const h = can.height + can.ellipseHeight / 2;

    for (const item of items) {
        if (pointInRect(mouseX, mouseY, item.x - can.width / 2, top, can.width, h)) {
            return item.ingredient;
        }
    }
    return null;
}

// returns syrup if mouse overlap with one
function getClickedSyrup() {
    const { baseY, container, items } = syrupStation;
    // just the container, no cap
    const top = baseY - container.height;

    for (const item of items) {
        if (pointInRect(mouseX, mouseY, item.x - container.width / 2, top, container.width, container.height)) {
            return item.ingredient;
        }
    }
    return null;
}

// 
function mousePressed() {
    //if clicked on a fruit or syrup, add to cup
    //if clicked area is in fruit station
    if (mouseX > fruitStation.items[0].x - fruitStation.can.width / 2
        && mouseY > fruitStation.baseY - fruitStation.can.height - fruitStation.can.ellipseHeight / 2
        && mouseY < fruitStation.baseY + fruitStation.can.ellipseHeight) {
        const clickedFruit = getClickedFruit();
        if (clickedFruit !== null) {
            console.log(clickedFruit);
            inCup.push(clickedFruit);
        }
        // else if cllicked area in syrup station
    } else if (mouseX > syrupStation.items[0].x - syrupStation.container.width / 2
        && mouseY > syrupStation.baseY - syrupStation.container.height
        && mouseY < syrupStation.baseY) {
        const clickedSyrup = getClickedSyrup();
        if (clickedSyrup !== null) {
            console.log(clickedSyrup);
            inCup.push(clickedSyrup);
        }
    }
    //console.log(inCup);

    //if clicked on cup, check if can make Item, return the item or clear the cup
    else if (pointInRect(mouseX, mouseY, cup.x - cup.topWidth / 2, cup.baseY - cup.height - cup.rimHeight / 2, cup.topWidth, cup.height + cup.rimHeight / 2 + cup.bottomEllipseHeight / 2)) {
        console.log("in Cup")
        product = canMakeItem();
        if (product === orders[currentOrder]) {
            points++;
            nextOrder();
        }
    }
}

function nextOrder() {
    //update order number and order start time
    currentOrder++;
    currentOrderStart = millis();
    // if reached the end of orders, go to score screen
    if (currentOrder === orderNum) {
        gameEnd = true;
    }
}