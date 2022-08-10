//GoodNullName changed something magically
const cans = document.querySelector("canvas");
let myCanvas = document.getElementById("myCanvas");
let change_amount = document.getElementById("balls_amount");
const ctx = cans.getContext("2d");
const width = (cans.width = window.innerWidth - 20);
const height = (cans.height = window.innerHeight - 35);
let balls_valumn = [];
let number_of_balls = 100; //在这里修改出现球的总数
let v = 3; //在这里修改生成球速度的范围[-v,v];
let delta = 0.5; //昼夜交替速率
const default_gy = 0.4; //重力加速度,最好别改
const g_uni = 0.667; //万有引力常量
let rou = 1; //密度
let cnt;
let was_eaten = 0;
let cnt_of_balls_now = document.getElementById("cnt");
let dark_degree = 0;
let recovery = 1;
let circulate = 0;
let night_mode = 1; //default mode
let day_mode = 0;
let universe_mode = 0;
let gravity = 0;
let energy_loss = 0;
let eating_mode = 0;
let bug_m = 0;

class Ball {
    constructor(x, y, velX, velY, color, r) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.radius = r;
        this.mess = rou * r ** 3;
        this.fri_ax = 0;
        this.ax = 0;
        this.ay = 0;
        this.last_x = 0;
        this.last_y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    update() {
        if (this.x <= this.radius) {
            //rebound at left
            this.x = this.radius;
            this.velX = Math.abs(recovery * this.velX);
        } else if (this.x >= width - this.radius) {
            //rebound at right
            this.x = width - this.radius;
            this.velX = -recovery * Math.abs(this.velX);
        }
        if (this.y <= this.radius) {
            //rebound at ceil
            this.y = this.radius;
            this.velY = Math.abs(recovery * this.velY);
        } else if (gravity === 0 && this.y >= height - this.radius) {
            //always rebound at floor when no gravity
            this.y = height - this.radius;
            this.velY = -Math.abs(recovery * this.velY);
        }
        if (
            gravity === 1 &&
            this.y >= height - this.radius &&
            Math.abs(this.velY) > 0.5
        ) {
            //rebound at floor when speed is fast in gravity mode
            this.y = height - this.radius;
            this.velY = -recovery * Math.abs(this.velY);
            this.velY += 1.5 * gy;
        }
        if (
            gravity === 1 &&
            this.y >= height - this.radius - 1 &&
            Math.abs(this.velY) <= 0.5
        ) {
            //stop bounding at floor in gravity mode
            this.velY = 0;
            this.y = height - this.radius;
            if (Math.abs(this.velX) > Math.abs(this.ax) && energy_loss === 1)
                this.fri_ax = (-0.007 * Math.abs(this.velX)) / this.velX;
            if (Math.abs(this.velX) <= Math.abs(this.ax) && energy_loss === 1) {
                this.velX = 0;
                this.fri_ax = 0;
            }
        }
        this.last_x = this.x;
        this.last_y = this.y; //choose
        this.x += this.velX;
        this.y += this.velY;
        this.velX += this.ax;
        this.velY += this.ay;
        if (
            gravity === 1 &&
            (this.y < height - this.radius - 1 || Math.abs(this.velY) > 1)
        ) {
            //acceleration of y
            this.velY += gy;
        }
        if (energy_loss === 1) {
            //acceleration of x
            this.velX += this.fri_ax;
        }
    }
    a_gravation(serialNumber) {
        let a_g = 0;
        let a_gmax =
            (g_uni * balls_valumn[serialNumber].mess) /
            (this.radius + balls_valumn[serialNumber].radius) ** 2;
        if (
            balls_valumn[serialNumber].x != this.x ||
            balls_valumn[serialNumber].y != this.y
        )
            a_g =
                (g_uni * balls_valumn[serialNumber].mess) / this.distance(serialNumber);
        if (a_g > a_gmax) a_g = a_gmax;
        return a_g;
    } //compute the a of gravation

    position_angel(serialNumber) {
        if (
            balls_valumn[serialNumber].x != this.x ||
            balls_valumn[serialNumber].y != this.y
        ) {
            if (balls_valumn[serialNumber].x > this.x) {
                return Math.atan(
                    (this.y - balls_valumn[serialNumber].y) /
                    (this.x - balls_valumn[serialNumber].x)
                );
            } else if (balls_valumn[serialNumber].x < this.x) {
                return (
                    Math.PI +
                    Math.atan(
                        (this.y - balls_valumn[serialNumber].y) /
                        (this.x - balls_valumn[serialNumber].x)
                    )
                );
            } else if (balls_valumn[serialNumber].x === this.x) {
                if (this.y > balls_valumn[serialNumber].y) {
                    return -Math.PI / 2;
                } else return Math.PI / 2;
            }
        } else return 0;
    } //compute the angel between ball[serialNumber]

    grav_around() {
        this.ax = 0;
        this.ay = 0;
        if (universe_mode === 1) {
            for (var i = 0; i < cnt; i++) {
                this.ax += this.a_gravation(i) * Math.cos(this.position_angel(i));
                this.ay += this.a_gravation(i) * Math.sin(this.position_angel(i));
            }
        }
    } //compute a of gravation in x and y in total

    //模拟碰撞代码开始
    distance(serialNumber) {
        //计算和编号为serialNumber的球的距离的平方
        return (
            (this.x - balls_valumn[serialNumber].x) ** 2 +
            (this.y - balls_valumn[serialNumber].y) ** 2
        );
    }

    detect_collision_step1(serialNumber) {
        if (
            balls_valumn[serialNumber].x != this.x ||
            balls_valumn[serialNumber].y != this.y
        ) {
            //保证不是和自己比较
            if (
                this.distance(serialNumber) <
                (1.5 * (this.radius + balls_valumn[serialNumber].radius)) ** 2
            )
                return 1;
            else return 0;
        } else return 0;
    }
    detect_collision_step2(serialNumber) {
        //这里求解出了两个小球相撞的精确时间
        let small_root = root_solution(
            (balls_valumn[serialNumber].velX - this.velX) ** 2 +
            (balls_valumn[serialNumber].velY - this.velY) ** 2,
            2 *
            ((balls_valumn[serialNumber].x - this.x) *
                (balls_valumn[serialNumber].velX - this.velX) +
                (balls_valumn[serialNumber].y - this.y) *
                (balls_valumn[serialNumber].velY - this.velY)),
            (balls_valumn[serialNumber].x - this.x) ** 2 +
            (balls_valumn[serialNumber].y - this.y) ** 2 -
            (balls_valumn[serialNumber].radius + this.radius) ** 2
        );
        if (small_root) return small_root;
        else return 0;
    }
    deal_with_collision() {
        for (var i = 0; i < cnt; i++) {
            if (this.detect_collision_step1(i)) {
                let small_root = this.detect_collision_step2(i);
                if (small_root /*&& (this.velY !== 0)*/) {
                    let collide_X1 = this.x + small_root * this.velX; //利用碰撞精确时间,计算碰撞瞬间小球的位置
                    let collide_Y1 = this.y + small_root * this.velY;
                    let collide_X2 =
                        balls_valumn[i].x + small_root * balls_valumn[i].velX;
                    let collide_Y2 =
                        balls_valumn[i].y + small_root * balls_valumn[i].velY;
                    if (collide_Y1 - collide_Y2 === 0) collide_Y1 = collide_Y2 + 0.00001;
                    let theta = correct_angle(
                        Math.atan((collide_X1 - collide_X2) / (collide_Y1 - collide_Y2))
                    );
                    let vx = -this.velX;
                    let vy = -this.velY;
                    let sin_theta = Math.sin(theta);
                    let cos_theta = Math.cos(theta);
                    let v11 = vx * cos_theta + vy * sin_theta;
                    let v12 = -vx * sin_theta + vy * cos_theta;
                    let vx2 = -balls_valumn[i].velX;
                    let vy2 = -balls_valumn[i].velY;
                    let v21 = vx2 * cos_theta + vy2 * sin_theta;
                    let v22 = -vx2 * sin_theta + vy2 * cos_theta;

                    if (eating_mode === 0 || this.radius - balls_valumn[i].radius < 10) {
                        this.velX =
                            -v11 * cos_theta -
                            (sin_theta *
                                ((this.mess - balls_valumn[i].mess) * v12 +
                                    2 * balls_valumn[i].mess * v22)) /
                            (this.mess + balls_valumn[i].mess);
                        this.velY =
                            -v11 * sin_theta +
                            (cos_theta *
                                ((this.mess - balls_valumn[i].mess) * v12 +
                                    2 * balls_valumn[i].mess * v22)) /
                            (this.mess + balls_valumn[i].mess);
                        if (i !== chosed) {
                            balls_valumn[i].velX =
                                -v21 * cos_theta +
                                (sin_theta *
                                    (2 * this.mess * v12 +
                                        (balls_valumn[i].mess - this.mess) * v22)) /
                                (this.mess + balls_valumn[i].mess);
                            balls_valumn[i].velY =
                                -v21 * sin_theta -
                                (cos_theta *
                                    (2 * this.mess * v12 +
                                        (balls_valumn[i].mess - this.mess) * v22)) /
                                (this.mess + balls_valumn[i].mess);
                        }
                    } else if (this.radius - balls_valumn[i].radius >= 10) {
                        //big ball eat the smaller one
                        this.velX =
                            (-this.mess * vx + balls_valumn[i].mess * balls_valumn[i].velX) /
                            (this.mess + balls_valumn[i].mess);
                        this.velY =
                            (-this.mess * vy + balls_valumn[i].mess * balls_valumn[i].velY) /
                            (this.mess + balls_valumn[i].mess);
                        balls_valumn[i].velX = 0;
                        balls_valumn[i].velY = 0;
                        this.mess += balls_valumn[i].mess;
                        this.radius = Math.pow(this.mess / rou, 1 / 3);
                        balls_valumn.splice(i, 1);
                        number_of_balls--;
                        cnt--;
                        was_eaten++;
                    }
                }
            }
        }
    } //模拟碰撞代码结束
    isInsideBall(event_x, event_y) {
        return (this.x - event_x) ** 2 + (this.y - event_y) ** 2 < this.radius ** 2;
    } //choose
}

let chosed = cnt;
function choose_this_ball(ev) {
    var ev = ev;
    let mouse_down = getEventPosition(ev);
    for (let j = 0; j < cnt; j++) {
        if (balls_valumn[j].isInsideBall(mouse_down.x, mouse_down.y)) {
            balls_valumn[j].velX = 0;
            balls_valumn[j].velY = 0;
            chosed = j;
        }
    }
    if (chosed < cnt) {
        let x_pro, y_pro;
        document.onmousemove = document.ontouchmove = function (e) {
            var e = e;
            x_pro = e.layerX;
            y_pro = e.layerY;
            let maxX = width - balls_valumn[chosed].radius;
            let maxY = height - balls_valumn[chosed].radius;
            if (x_pro < balls_valumn[chosed].radius) {
                x_pro = balls_valumn[chosed].radius;
            } else if (x_pro > maxX) {
                x_pro = maxX;
            }
            if (y_pro < balls_valumn[chosed].radius) {
                y_pro = balls_valumn[chosed].radius;
            } else if (y_pro > maxY) {
                y_pro = maxY;
            }
            balls_valumn[chosed].x = x_pro;
            balls_valumn[chosed].y = y_pro;
            balls_valumn[chosed].velX = x_pro - balls_valumn[chosed].last_x;
            balls_valumn[chosed].velY = y_pro - balls_valumn[chosed].last_y;
        };
        document.onmouseup = document.ontouchend = document.ontouchcancel = function () {
            document.onmousemove = "";
            chosed = cnt;
        };
    }
}

function getEventPosition(ev) {
    let x = 0,
        y = 0;
    x = ev.layerX;
    y = ev.layerY;
    return { x: x, y: y };
} //choose

function correct_angle(angle) {
    if (angle < 0) angle += Math.PI;
    return angle;
}

function get_amount() {
    //adjust the number of balls
    let new_number = document.getElementById("number").value;
    if (new_number > 0 && new_number < 500) {
        if (new_number > cnt) {
            new_balls(new_number - cnt);
        }
        else
            balls_valumn.splice(0, cnt - new_balls);
        number_of_balls = new_number;
        cnt = new_number;
        document.getElementById("number").value = "";
    }
    else
        alert("Invalid number! Must be less than 500 and not null.");
}

function root_solution(a, b, c) {
    //一元二次方程求根公式 Assume that a > 0
    if (b * b - 4 * a * c >= 0) {
        var small_root = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        if (small_root > 0 && small_root < 3) return small_root;
        else return 0;
    } else return 0;
}

function sum_the_cnt_of_balls() {
    //统计现在屏幕上的球数 (作者太菜，有时球会莫名其妙地减少)
    cnt = number_of_balls;
    for (var i = 0; i < cnt; i++)
        if (
            balls_valumn[i].x <= 0 - balls_valumn[i].radius ||
            balls_valumn[i].x >= width + balls_valumn[i].radius ||
            balls_valumn[i].y >= height + balls_valumn[i].radius ||
            balls_valumn[i].y <= 0 - balls_valumn[i].radius
        ) {
            balls_valumn.splice(i, 1);
            number_of_balls--;
            cnt--;
        }
    return cnt;
}

function random_color() {
    let random_num1 = Math.floor(Math.random() * 150) + 50;
    let random_num2 = Math.floor(Math.random() * 150) + 50;
    let random_num3 = Math.floor(Math.random() * 160) + 40; //deliberately
    return "rgb(" + random_num1 + "," + random_num2 + "," + random_num3 + ")";
}

function random_int(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

for (var i = 0; i < number_of_balls; i++) {
    let r = random_int(7, 20);
    let x = random_int(r, width - r);
    let y = random_int(r, height - r);
    let velX = random(-v, v);
    let velY = random(-v, v);
    let color = random_color();
    let b = new Ball(x, y, velX, velY, color, r);
    balls_valumn.push(b);
}

function new_balls(amount) {
    //add some new balls
    for (var i = 0; i < amount; i++) {
        let r_new = random_int(7, 20);
        let x_new = random_int(r_new, width - r_new);
        let y_new = random_int(r_new, height - r_new);
        let velX_new = random(-v, v);
        let velY_new = random(-v, v);
        let color_new = random_color();
        let b_new = new Ball(x_new, y_new, velX_new, velY_new, color_new, r_new);
        balls_valumn.push(b_new);
    }
}
function draw_rect() {
    if (day_mode === 1) ctx.fillStyle = "rgba(255,255,230,0.9)";
    else if (night_mode === 1) ctx.fillStyle = "rgba(40,40,60,0.2)";
    else if (circulate === 1)
        ctx.fillStyle =
            "rgba(" +
            dark_degree +
            "," +
            dark_degree +
            "," +
            dark_degree +
            "," +
            ((0.6 * dark_degree) / 255 + 0.03 * v) +
            ")";
    ctx.fillRect(0, 0, width, height);
    if (circulate === 1) {
        dark_degree += delta;
        if (dark_degree > 276) delta = -delta;
        else if (dark_degree < -20) delta = Math.abs(delta);
    }
}
let summing_flag = 0;
function moving_loop() {
    draw_rect();
    for (var i = 0; i < cnt; i++) {
        balls_valumn[i].deal_with_collision();
    }
    for (var i = 0; i < cnt; i++) {
        balls_valumn[i].grav_around();
    }
    for (var i = 0; i < cnt; i++) {
        balls_valumn[i].update();
    }
    for (var i = 0; i < cnt; i++) {
        balls_valumn[i].draw();
    }
    myCanvas.onmousedown = myCanvas.ontouchstart = choose_this_ball;
    summing_flag = (summing_flag + 1) % 30; //为了降低刷新速率，引入flag使其每30个循环统计一次
    if (summing_flag == 0) {
        cnt_of_balls_now.innerHTML = "Number of balls now: "
                                   + sum_the_cnt_of_balls();
    }
    requestAnimationFrame(moving_loop);
}
moving_loop();
