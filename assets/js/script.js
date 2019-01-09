// constants
var SNAKE_BIT_SIDE_LENGTH = 25;
var DIRECTION = Object.freeze({UP:1, DOWN:2, LEFT:3, RIGHT:4});
var SNAKE_MOVE_DISTANCE = 25;
var INITIAL_SNAKE_STEP_SPEED = 100000;


// global
var snake_head;
var body_bit;
var last_move;
var time_step_length = 1000;

function setup () {
    createCanvas(1200,600);
    snake_head = new SnakeHead();
    body_bit = new BodyBit();
    last_move = millis() - 1000;
    console.log(roundUp(23, 25));
    console.log(roundUp(26, 25));
}

function draw () {
    background(0,0,0);
    snake_head.move();
    body_bit.display();
    snake_head.display();
    if(snake_head.touching(body_bit)){

    }
}

function keyPressed () {
    if (keyCode == UP_ARROW) {
        snake_head.direction = DIRECTION.UP;
    } else if (keyCode == DOWN_ARROW) {
        snake_head.direction = DIRECTION.DOWN;
    } else if (keyCode == LEFT_ARROW) {
        snake_head.direction = DIRECTION.LEFT;
    } else if (keyCode == RIGHT_ARROW) {
        snake_head.direction = DIRECTION.RIGHT;
    }
}

function BodyBit () {
    this.x = roundUp(random(width), 25);
    this.y = roundUp(random(height), 25);
    this.left_x = this.x - SNAKE_BIT_SIDE_LENGTH/2;
    this.right_x = this.x + SNAKE_BIT_SIDE_LENGTH/2;
    this.top_y = this.y - SNAKE_BIT_SIDE_LENGTH/2;
    this.bottom_y = this.y + SNAKE_BIT_SIDE_LENGTH/2;
    this.side_length = SNAKE_BIT_SIDE_LENGTH;
    this.display = SnakeBitDisplay;
}

function roundUp (numToRound, multiple) {
    if (multiple == 0) {
        return numToRound;
    }
    var remainder = numToRound % multiple;
    if (remainder == 0) {
        return numToRound;
    }
    return numToRound + multiple - remainder;
}

function SnakeHead () {
    this.x = width/2;
    this.y = height/2;
    this.prevX;
    this.prevY;
    this.side_length = SNAKE_BIT_SIDE_LENGTH;
    this.direction = DIRECTION.RIGHT;
    this.move_distance = SNAKE_MOVE_DISTANCE;
    this.top_y = this.y - SNAKE_BIT_SIDE_LENGTH/2;
    this.bottom_y = this.y + SNAKE_BIT_SIDE_LENGTH/2;
    this.left_x = this.x - SNAKE_BIT_SIDE_LENGTH/2;
    this.right_x = this.x + SNAKE_BIT_SIDE_LENGTH/2;

    this.move = function () {
        var time_elapsed = millis() - last_move;
        if (time_elapsed > time_step_length) {
            this.prevX = this.x;
            this.prevY = this.y;
            if(this.direction === DIRECTION.RIGHT){
                this.x += this.move_distance;
            } else if (this.direction === DIRECTION.LEFT) {
                this.x -= this.move_distance;
            } else if (this.direction === DIRECTION.UP) {
                this.y -= this.move_distance;
            } else if (this.direction === DIRECTION.DOWN) {
                this.y += this.move_distance;
            }
            this.update_hit_box();
            last_move = millis();
        }
    }

    this.touching = function (object) {
        if (this.right_x > object.left_x
        && this.right_x < object.right_x) {
            // top right corner collision
            if (this.top_y < object.bottom_y
            && this.top_y > object.top_y) {
                return true;
            }
             // bottom right corner collision
            else if (this.bottom_y > object.top_y
            && this.bottom_y < object.bottom_y) {
                return true;
            }
        } else if (this.left_x < object.right_x
        && this.left_x > object.left_x) {
            // top left corner collision
            if (this.top_y < object.bottom_y
            && this.top_y > object.top_y) {
                return true;
            }
             // bottom left corner collision
            else if (this.bottom_y > object.top_y
            && this.bottom_y < object.bottom_y) {
                return true;
            }
        }
        return false;
    }

    this.update_hit_box = function () {
        this.top_y = this.y - SNAKE_BIT_SIDE_LENGTH/2;
        this.bottom_y = this.y + SNAKE_BIT_SIDE_LENGTH/2;
        this.left_x = this.x - SNAKE_BIT_SIDE_LENGTH/2;
        this.right_x = this.x + SNAKE_BIT_SIDE_LENGTH/2;
    }

    this.display = SnakeBitDisplay;
}

function SnakeBitDisplay () {
    fill(50, 205, 50);
    stroke(50, 205, 50);
    rect(this.x, this.y, this.side_length, this.side_length);
}
