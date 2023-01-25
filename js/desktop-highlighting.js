let original_x;
let original_y;

document.querySelector("#desktop-apps").onmousedown = e => {
    original_x = e.clientX;
    original_y = e.clientY;
    document.querySelector("#highlighting").style.display = "block";
    document.querySelector("#highlighting").style.left = original_x + "px";
    document.querySelector("#highlighting").style.top = original_y + "px";
}

document.querySelector("#desktop-apps").onmousemove = e => {
    if (e.buttons == 1) {
        document.querySelector("#highlighting").style.width = e.clientX - original_x + "px";
        document.querySelector("#highlighting").style.height = e.clientY - original_y + "px";
    }
}

document.querySelector("#desktop-apps").onmouseup = e => {
    document.querySelector("#highlighting").style.display = "none";
    document.querySelector("#highlighting").style.width = "0px";
    document.querySelector("#highlighting").style.height = "0px";
}