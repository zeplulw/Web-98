let start = { x: 0, y: 0 };
let highlighting_tool = document.querySelector("#highlighting");

document.querySelector("#desktop-apps").onmousedown = (e) => {
  start.x = e.clientX;
  start.y = e.clientY;
  highlighting_tool.style.display = "block";
  highlighting_tool.style.left = start.x + "px";
  highlighting_tool.style.top = start.y + "px";
};

document.querySelector("#desktop-apps").onmousemove = (e) => {
  if (e.buttons == 1) {
    var min_x = Math.min(start.x, e.clientX);
    var min_y = Math.min(start.y, e.clientY);
    var max_x = Math.max(start.x, e.clientX);
    var max_y = Math.max(start.y, e.clientY);
    highlighting_tool.style.left = min_x + "px";
    highlighting_tool.style.top = min_y + "px";
    highlighting_tool.style.width = max_x - min_x + "px";
    highlighting_tool.style.height = max_y - min_y + "px";
  }
};

document.querySelector("#desktop-apps").onmouseup = (e) => {
  highlighting_tool.style.display = "none";
  highlighting_tool.style.width = "0px";
  highlighting_tool.style.height = "0px";
};
