var c = document.getElementById("canvas");
// read on stackoverflow that setting canvas width and height with js is reccomended
// for not stretching, but setting the canvas properties

c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");
var mode = null;

var color_palettes = [
    //[0] is the darkest
    //[4] is the brightest
    //[1] is the next darkest
    ["#55505C", "#5D737E", "#7FC6A4", "#FAF33E", "#D6F8D6"],
    ["#1D1E2C", "#59656F", "#AC9FBB", "#DDBDD5", "#F7EBEC"],
    ["#1C110A", "#50A2A7", "#f0ae2e", "#09cdd9", "#82f516"],
    ["#2B4162", "#721817", "#FA9F42", "#0B6E4F", "#E0E0E2"],
    ["#55505C", "#28965A", "#2CEAA3", "#6BFFB8", "#7CFEF0"],
]

function resize() {
    var box = c.getBoundingClientRect();
    c.width = box.width;
    c.height = box.height;
}

resize();

//randomly selects "-1" or "1"
function randomSign() {
    return Math.random() < 0.5 ? -1 : 1;
}

function random_number(a) {
    var percentage = Math.floor((Math.random() * 100) + 0);
    if (a == 0) {
        //random number between 15 and 25
        return Math.floor((Math.random() * 35) + 13);
    } else if (a == 1) {
        //random number between 0 and 100
        return percentage;
    } else if (a == 2) {
        //one box per avarage of 100 boxes in both x and y directions, 
        //with a potential offset of 50% in either positive or negative directions
        var num = ((((c.width + c.height) / 2) / 100));
        var num_1 = Math.floor(num + ((((percentage / 100) * num) * randomSign()) * 0.25));
        //console.log(num_1);
        return num_1;
    } else if (a == 3) {
        //random number between 1 and 4
        return Math.floor((Math.random() * 4) + 1);
    } else if (a == 4) {
        //random number between 1 and 5
        return Math.floor((Math.random() * 5) + 1);
    }
}

mode = random_number(4);

function randomColor() {
    if (mode == 1) {
        return color_palettes[0][random_number(3)];
    } else if (mode == 2) {
        return color_palettes[1][random_number(3)];
    } else if (mode == 3) {
        return color_palettes[2][random_number(3)];
    } else if (mode == 4) {
        return color_palettes[3][random_number(3)];
    } else if (mode == 5) {
        return color_palettes[4][random_number(3)];
    }
    return color;
}

var gravity = 0.2

class Sprite { //! change c to ctx, and canvas, to c
    constructor({ position, velocity, size, color }) {
        this.position = position
        this.velocity = velocity //measured in m/framerate
        this.size = size
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color.hex
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
    }

    update() {
        if (this.size.width > 80) {
            gravity = 0.1
        } else if (70 < this.size.width < 80) {
            gravity = 0.12
        } else if (60 < this.size.width < 70) {
            gravity = 0.13
        } else if (this.size.width < 60) {
            gravity = 0.15
        } else if (this.size.width < 50) {
            gravity = 0.18
        } else if (this.size.width < 40) {
            gravity = 0.2
        } else if (this.size.width < 30) {
            gravity = 0.23
        }

        this.draw()

        this.position.x = this.position.x + this.velocity.x
        this.position.y = this.position.y + this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= c.height) { //axis is opposite of that one in GeoGebra
            //! Will use this, just for the bottom, and not the top
            this.velocity.y = 0
        } else this.velocity.x += gravity, this.velocity.y += gravity
    }
}

var shapes = [
    [],
    [],
    [],
    []
];

var shapes_temp = [
    [],
    [],
    [],
    []
];

// var shapes_1 = [];
// var shapes_2 = [];
// var shapes_3 = [];
// var shapes_4 = [];

var shapes_2_speed_for_calculations = [];

var a_COUNTER = 0;

var slit = false;

function drawSquare(x, y, len, kvadrant) { //! add dynamic velocity
    //ctx.fillStyle = randomColor();
    //ctx.fillRect(x, y, len, len);
    var speed_x, speed_y = 3;

    if (len > 80) {
        speed_x = 0.7;
        speed_y = 0.7;
    } else if (70 < len < 80) {
        speed_x = 1;
        speed_y = 1;
    } else if (60 < len < 70) {
        speed_x = 2;
        speed_y = 2;
    } else if (len < 60) {
        speed_x = 3;
        speed_y = 3;
    } else if (len < 50) {
        speed_x = 4;
        speed_y = 4;
    } else if (len < 40) {
        speed_x = 5;
        speed_y = 5;
    } else if (len < 30) {
        speed_x = 6;
        speed_y = 6;
    }

    var obj = new Sprite({
        position: {
            x: x,
            y: y
        },
        velocity: {
            x: speed_x,
            y: speed_y
        },
        size: {
            width: len,
            height: len
        },
        color: {
            hex: randomColor()
        }
    })

    if (kvadrant == 1) {
        //shapes_1.push(obj);
        shapes[0].push(obj);
    } else if (kvadrant == 2) {
        //shapes_2.push(obj);
        shapes[1].push(obj);
        shapes_2_speed_for_calculations.push([speed_x, speed_y, len]);
    } else if (kvadrant == 3) {
        //shapes_3.push(obj);
        shapes[2].push(obj);
    } else if (kvadrant == 4) {
        //shapes_4.push(obj);
        shapes[3].push(obj);
    }
}

//var n_boxes = random_number(2);
//random number between 20 and 30

var len = null;
var x = null;
var y = null;
var arr_x_y_len = [];
var arr_x_y_len_2 = [];
var code_1 = [];
//[0->infinity] == [x,y,len]

var array_shapes_kvadrant = {
    1: [],
    2: [],
    3: [],
    4: []
}

var median = null;

function draw_army(kvadrant, dx, dy, split) {

    arr_x_y_len = [];
    code_1 = [];

    for (var i = 0; i < random_number(2); i++) {
        len = ((c.width) / random_number(0));
        x = ((c.width) * (random_number(1) / 100)) + dx;
        y = ((c.height) * (random_number(1) / 100)) + dy;
        //push two variables to 2d array
        arr_x_y_len.push([x, y, len]);
    }

    for (var i = 0; i < arr_x_y_len.length; i++) {
        var x_0 = arr_x_y_len[i][0];
        var y_0 = arr_x_y_len[i][1];
        var len_0 = arr_x_y_len[i][2];
        var x_1 = null;
        var y_1 = null;
        var len_1 = null;
        for (var j = 0; j < arr_x_y_len.length; j++) {
            if (i == j) {
                continue;
            }
            // two variables for the lengths betweeen the boxes, and the 
            // distance of the two diagonals of the boxes together
            // idea is, if the distance between the boxes is larger than,
            // the distance of the two diagonals (worst case scenario), 
            //then the boxes are not overlapping
            x_1 = arr_x_y_len[j][0];
            y_1 = arr_x_y_len[j][1];
            len_1 = arr_x_y_len[j][2];
            //distance between two points
            var distance = Math.sqrt(Math.pow((x_1 - x_0), 2) + Math.pow((y_1 - y_0), 2));
            var diagonal_distance = (Math.sqrt(2) / 2) * (len_0) + (Math.sqrt(2) / 2) * (len_1);
            if (distance < diagonal_distance) {
                //remove the infringing box at the j index of the array
                //arr_x_y_len.splice(j, 1);
                code_1.push(i);
                //console.log(i + " " + j);
                //console.log("removed");
            } else {
                //I suck at coding :)
            }
        }
    }
    //console.log(arr_x_y_len);
    //remove overlapping boxes

    var ut = null;

    for (var i = 0; i < arr_x_y_len.length; i++) {
        ut = false;
        for (var j = 0; j < code_1.length; j++) {
            if (i == code_1[j]) {
                ut = true;
                break;
            }
        }
        if (ut == true) {
            continue;
        } else {
            drawSquare(arr_x_y_len[i][0], arr_x_y_len[i][1], arr_x_y_len[i][2], kvadrant);
            //array_shapes_kvadrant[kvadrant].push(kvadrant);
        }
    }
}

//main loop
//draw_army(4, 0, 0);

var time_to_reset = null;
var count_element = true;

function main() {
    draw_army(3, -c.width, 0);
    draw_army(2, -c.width, -c.height);
    draw_army(1, 0, -c.height);

    function waitForElement() {
        if (time_to_reset !== null) {
            if ((Number.isFinite(time_to_reset)) || (time_to_reset_0 !== undefined)) {
                //call main() in time_to_reset seconds
                var time_to_reset_0 = time_to_reset;
                //console.log(time_to_reset); //0.78
                setTimeout(() => { main(); }, time_to_reset * 1000);
            } else {
                //console.log(time_to_reset);
                setTimeout(() => { main(); }, time_to_reset_0 * 1000);
            }
        } else {
            //console.log("true");
            setTimeout(waitForElement, 250);
        }
    }

    if (count_element == true) {
        waitForElement();
    }
}

main();

var count = [];
var counterer = 0;

var shapes_temp_change = false;

var count_shapes_temp = 0;

function animate_shapes_temp() {
    if (count_shapes_temp < 124) {
        var runner = null;
        setTimeout(() => { window.requestAnimationFrame(animate_shapes_temp); }, (1 / 62)); //ingenious way to call self
        resize();
        ctx.fillStyle = color_palettes[mode - 1][0];
        ctx.fillRect(-c.width, -c.height, 2 * c.width, 2 * c.height);
        for (var i = 1; i < 5; i++) {
            if (i == 1) {
                for (var j = 0; j < shapes_temp[0].length; j++) {
                    runner = shapes_temp[0][j];
                    runner.update();
                }
            } else if (i == 2) {
                for (var j = 0; j < shapes_temp[1].length; j++) {
                    runner = shapes_temp[1][j];
                    runner.update();
                }
            } else if (i == 3) {
                for (var j = 0; j < shapes_temp[2].length; j++) {
                    runner = shapes_temp[2][j];
                    runner.update();
                }
            } else if (i == 4) {
                for (var j = 0; j < shapes_temp[3].length; j++) {
                    runner = shapes_temp[3][j];
                    runner.update();
                }
            }
        }
        count_shapes_temp++;
        //console.log(count_shapes_temp);
    } else {
        count_shapes_temp = 0;
        shapes_temp = [
            [],
            [],
            [],
            []
        ];
    }
}

function animate() {
    if (shapes_temp_change == true) {
        shapes_temp = shapes;
        shapes = [
            [],
            [],
            [],
            []
        ];
        //console.log(shapes_temp);
        //keep updating shapes_temp for 2 seconds
        animate_shapes_temp();
        shapes_temp_change = false;
        setTimeout(() => { window.requestAnimationFrame(animate); }, (1 / 62)); //ingenious way to call self
    } else {
        //reset when color mode changes
        //after 10 seconds, 620 repeats of this function
        //for optimal function
        //62 repeats per second
        count.push("a");
        var mediator = null;
        setTimeout(() => { window.requestAnimationFrame(animate); }, (1 / 62)); //ingenious way to call self
        resize();
        ctx.fillStyle = color_palettes[mode - 1][0];
        ctx.fillRect(-c.width, -c.height, 2 * c.width, 2 * c.height);
        for (var i = 1; i < 5; i++) {
            if (i == 1) {
                for (var j = 0; j < shapes[0].length; j++) {
                    mediator = shapes[0][j];
                    mediator.update();
                }
            } else if (i == 2) {
                for (var j = 0; j < shapes[1].length; j++) {
                    mediator = shapes[1][j];
                    mediator.update();
                }
            } else if (i == 3) {
                for (var j = 0; j < shapes[2].length; j++) {
                    mediator = shapes[2][j];
                    mediator.update();
                }
            } else if (i == 4) {
                for (var j = 0; j < shapes[3].length; j++) {
                    mediator = shapes[3][j];
                    mediator.update();
                }
            }
        }
    }
}
animate()

var difference = null;
var count_length_1 = null;

function counter() {
    var count_length_0 = count.length;
    setTimeout(() => { count_length_1 = count.length; }, 250);
    difference = count_length_1 - count_length_0;
}

counter();
setInterval(counter, 500);

//call function with interval of 10 seconds
function change_colormode() {
    if (mode < 5) {
        mode++;
    } else {
        mode = 1;
    }
}

setInterval(change_colormode, 15000);

function side() {
    speed_x_00 = null;
    speed_y_00 = null;
    length_to_grav = null;
    speed_animation_frame = null;
    //! For estimating when the new boxes have to be spawned
    for (var i = 0; i < shapes_2_speed_for_calculations.length; i++) {
        //guessing that the avarage starting point for the shapes is in the middle 
        //of the screen, this will work for most cases, and long-term
        speed_x_00 += shapes_2_speed_for_calculations[i][0];
        speed_y_00 += shapes_2_speed_for_calculations[i][1];
        length_to_grav += shapes_2_speed_for_calculations[i][2];
        speed_animation_frame += Math.abs(difference);
    }

    speed_x_00 = speed_x_00 / shapes_2_speed_for_calculations.length;
    speed_y_00 = speed_y_00 / shapes_2_speed_for_calculations.length;
    length_to_grav = length_to_grav / shapes_2_speed_for_calculations.length;
    //console.log(speed_animation_frame);
    speed_animation_frame = (speed_animation_frame / shapes_2_speed_for_calculations.length) * gravity;

    //https://i.imgur.com/yztaXy4.png if u want to understand the physics/maths
    //edit -> a = 4*Math.abs(difference)*0.02

    time_to_reset = (Math.sqrt((4 * Math.sqrt((c.height) ^ 2 + (c.width) ^ 2) * speed_animation_frame) + speed_y_00 ^ 2) - speed_y_00) / (2 * Math.sqrt(2) * speed_animation_frame);
    //console.log(time_to_reset);
    time_to_reset = Math.round(time_to_reset * 0.39 * 100) / 100;
}

setInterval(side, 500);

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case ' ':
            shapes_temp_change = true;
            break
    }
    console.log(event.key)
})