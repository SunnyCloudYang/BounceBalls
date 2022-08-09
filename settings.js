
document.getElementById("night_mode").onclick = function () {
    //codes below set the modes.(in an awful way)
    dark_degree = 0;
    circulate = 0;
    night_mode = 1;
    day_mode = 0;
    document.getElementById("night_mode").style.backgroundColor = "black";
    document.getElementById("day_mode").style.backgroundColor =
        "rgba(225,225,225,1)";
    document.getElementById("circulation").style.backgroundColor =
        "rgba(225,225,225,1)";
};
document.getElementById("day_mode").onclick = function () {
    dark_degree = 255;
    circulate = 0;
    night_mode = 0;
    day_mode = 1;
    document.getElementById("night_mode").style.backgroundColor = "dimgrey";
    document.getElementById("day_mode").style.backgroundColor = "white";
    document.getElementById("circulation").style.backgroundColor =
        "rgba(225,225,225,1)";
};
document.getElementById("circulation").onclick = function () {
    circulate = 1;
    night_mode = 0;
    day_mode = 0;
    document.getElementById("night_mode").style.backgroundColor = "dimgrey";
    document.getElementById("day_mode").style.backgroundColor =
        "rgba(225,225,225,1)";
    document.getElementById("circulation").style.backgroundColor =
        "rgba(200,225,200,1)";
};
document.getElementById("gravity").onclick = function () {
    if (gravity === 0) {
        gravity = 1;
        gy = default_gy;
        document.getElementById("gravity").style.color = "white";
        document.getElementById("gravity").style.backgroundColor = "purple";
    } else {
        gravity = 0;
        gy = 0;
        document.getElementById("gravity").style.color = "black";
        document.getElementById("gravity").style.backgroundColor =
            "rgba(225,225,225,1)";
    }
};
document.getElementById("energy_loss").onclick = function () {
    if (energy_loss === 0) {
        energy_loss = 1;
        recovery = 0.85;
        document.getElementById("energy_loss").style.color = "white";
        document.getElementById("energy_loss").style.backgroundColor = "purple";
    } else {
        energy_loss = 0;
        recovery = 1;
        document.getElementById("energy_loss").style.color = "black";
        document.getElementById("energy_loss").style.backgroundColor =
            "rgba(225,225,225,1)";
    }
};

document.getElementById("Ball_Universe").onclick = function () {
    if (universe_mode === 0) {
        universe_mode = 1;
        document.getElementById("Ball_Universe").style.color = "white";
        document.getElementById("Ball_Universe").style.backgroundColor = "#002e63";
    } else {
        universe_mode = 0;
        document.getElementById("Ball_Universe").style.color = "black";
        document.getElementById("Ball_Universe").style.backgroundColor =
            "rgba(225,225,225,1)";
    }
};