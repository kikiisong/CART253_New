/**
 * Cafe
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

// current order player need to make
let order = undefined;

const menuItems = ["Magical Berries", "Dragon's Eyeball", "Summer Breeze"]

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(900,600);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background('#9cd5f8');

    //customer come & ask for type of drink + numbers

}

function newOrder()
{
    order = [];
    const orderSize = random(1,3);
    for (let i = 0; i<orderSize; i++)
    {
        order.push(random(menuItems));
    }
    console.log(order);
}

function mousePressed()
{
    newOrder();
}