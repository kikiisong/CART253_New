/**
 * Cafe
 * Kiki
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// current order player need to make
let orders = undefined;
const orderNum = 4;
// current order item index
let currentOrder = 0;
// keep track of how long order has been put in
let currentOrderStart = undefined;
// order can wait this long before getting cancelled
let orderMaxDuration = 5000;
//ingredients get added to cup on mouse clicks
    let inCup = [];
    // if in cup ingredients can make a menu item, product record the item
let product = undefined;
// success order num
let points = 0;

const fruit = {
    berries: "berries",
    melon: "melon",
    pomegranate: "pomegranate"
}

const syrup = {
    blossom: "orange blossom",
    peace: "peace & love",
    night: "vel of the night"
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



/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(900, 600);

    // generate the list of menu 
    for (let i = 0; i < orderNum; i++) {
        orders.push(random(menuItem));
    }
    //set 1st order
    currentOrder = orders.pop(0);
    currentOrderStart = millis();
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background('#9cd5f8');

    drawCafe();
    drawFruitStation();
    drawSyrupStation();
    drawCup();
    //customer come & ask for type of drink
    updateOrder();
    drawOrder();
}

function updateOrder() {
    const timeElapsed = millis() - currentOrderStart;
    // if order time has passed, go to next order without getting points
    if(timeElapsed > orderMaxDuration)
    {
        nextOrder();
    }

}

// check if current items in cup can make menu item
function canMakeItem() {
    if (inCup.length === 2) {
        for (item of menuItems) {
            // can it be forced in like alphabetic order, so only compare items in the same index
            // or loop and compare

            //clear the cup
            inCup.length = 0;
            return item
        }
    }
    //clear the cup
    inCup.length = 0;
    return null;
}

// for testing
function mousePressed() {
    //if clicked on a fruit or syrup, add to cup

    //if clicked on cup, check if can make Item, return the item or clear the cup
    product = canMakeItem();
    if (product === orders[currentOrder])
    {
        points++;
        nextOrder();
    }
}

function nextOrder(){
    //update order number and order start time
     currentOrder++;
     currentOrderStart = millis();
     // if reached the end of orders, go to score screen
        if(currentOrder === orderLength)
        {
            drawScore();
        }
}