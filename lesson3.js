/**

    Cookie Clicker - Lesson 3

**/

// ----------- Variables ------------
var timeSinceLastAutoUpdate = millis();

// ----------- Objects ----------
// Day 2: Define an object to represent a cookie
var cookie = {
    x: 300,
    y: 300,
    sz: 1,
    isTouching: function () {
        return dist(this.x, this.y, mouseX, mouseY) < 100 * this.sz;
    },
    cookies: 0,
    cps: 0, // cookies per second
    cpc: 1, // cookies per click
};

// Day 3: Define an object template to represent an StoreItem you can buy in the shop
/**
 * name is a string
 * label is a string
 * cost is an integer - the fixed number of cookies necessary to buy the storeitem
 * action is a function that represents what the storeitem actually does
 *  it is run once when the storeitem is purchased
 * buttonX, buttonY are integers
 */

var StoreItem = function (name, label, cost, action, buttonX, buttonY) {
    this.name = name;
    this.label = label;
    this.cost = cost;
    this.action = action;
    this.numPurchased = 0;
};
StoreItem.prototype.purchase = function () {
    if (cookie.cookies >= this.cost) {
        cookie.cookies -= this.cost;
        this.action();
        this.numPurchased += 1;
    }
};

// ----------- Functions -------------
// Day 1: Make a function to draw a cookie
/**
 * The function should control the position and size of the cookie
 * What parameters should the function have?
 * How can we move the cookie based on the parameters
 */
var drawCookie = function (x, y, sz) {
    noStroke();

    // cookie shadow
    fill(168, 106, 5);
    ellipse(x - 5 * sz, y + 5 * sz, 200 * sz, 200 * sz);

    // cookie body
    fill(214, 161, 70);
    ellipse(x, y, 200 * sz, 200 * sz);

    // chocolate chips
    fill(71, 45, 0);
    ellipse(x + 24 * sz, y + 11 * sz, 30 * sz, 30 * sz);
    ellipse(x - 51 * sz, y + 52 * sz, 20 * sz, 20 * sz);
    ellipse(x + 51 * sz, y + 55 * sz, 25 * sz, 25 * sz);
    ellipse(x + 28 * sz, y - 63 * sz, 22 * sz, 22 * sz);
    ellipse(x - 38 * sz, y - 26 * sz, 35 * sz, 35 * sz);
};

// ----------- Instances --------------
// Day 3 - Create instances of StoreItem object
var clicker = new StoreItem(
    "clicker",
    "Increase cookies per click by 1",
    15,
    function () {
        cookie.cpc += 1;
    }
);
var grandma = new StoreItem(
    "grandma",
    "Increase cookies per second by 8",
    100,
    function () {
        cookie.cps += 8;
    }
);

// ----------- Built Ins --------------
var draw = function () {
    background(255, 255, 255);

    // Day 1 optional - decrease size of cookie when mouse or key is pressed
    if (
        (mouseIsPressed || (keyIsPressed && str(key) === " ")) &&
        cookie.isTouching()
    ) {
        cookie.sz = 0.95;
    } else {
        cookie.sz = 1;
    }

    fill(0, 0, 0);
    text("Cookies: " + cookie.cookies, 20, 30);

    // Day 1 - draw the cookie
    drawCookie(cookie.x, cookie.y, cookie.sz);

    // Day 2 - Automatically add cookies per second
    if (millis() - timeSinceLastAutoUpdate > 1000) {
        cookie.cookies += cookie.cps;
        timeSinceLastAutoUpdate = millis();
    }
};

// Day 1: When you click the cookie, increment a variable
var mouseClicked = function () {
    // Use dist function to check if the cookie was clicked
    if (cookie.isTouching()) {
        cookie.cookies += cookie.cpc;
    }
};

// Day 1: When you press the spacebar and the mouse is over the cookies -> count as a click
var keyPressed = function () {
    if (str(key) === " " && cookie.isTouching()) {
        cookie.cookies += cookie.cpc;
    }
};
