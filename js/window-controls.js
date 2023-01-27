let currentWindowId = 1;

function showWindow(icon, title, content, width, height) {
  console.log(icon, title, content, width, height);
  width = width || 300;
  height = height || 300;
  let top = window.innerHeight / 2 - height / 2;
  let left = window.innerWidth / 2 - width / 2;

  let win = `<div id=${
    currentWindowId + 1
  } class="window draggable" style="width: ${width}px; height: ${height}px; top: ${top}px; left: ${left}px">
    <div class="title-bar">
      <div class="title-bar-text">${title}</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <p>${content}</p>
    </div>
  </div>`;
  document.querySelector(".desktop").insertAdjacentHTML("beforeend", win);

  win = document.querySelector(".window:last-child");
  win
    .querySelector('[aria-label="Close"]')
    .addEventListener("click", (e) => addCloseWindow(e));
  dragElement(win);
  bringToFrontEvent(win);
  addTaskToTaskbar(icon, title, win);
  currentWindowId += 1;
}

// Close
function addCloseWindow(e) {
  // remove from active_tasks by id
  let win = e.target.parentElement.parentElement.parentElement;
  let id = win.id;
  active_tasks = active_tasks.filter((task) => task.id != id);
  removeTaskFromTaskbar(win);

  e.target.parentElement.parentElement.parentElement.remove();
}

// Bring to front
function bringToFrontEvent(e) {
  e.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("window")) {
      e.target.style.zIndex = z_index + 1;
      z_index += 1;
    }
    if (e.target.classList.contains("title-bar")) {
      e.target.parentElement.style.zIndex = z_index + 1;
      z_index += 1;
    }
  });
}

// Add task to taskbar
function addTaskToTaskbar(icon, title, win) {
  let task = `<div id="desktop-task-${win.id}" class="task"><img src="../${icon}"><span>${title}</span></div>`;
  document.querySelector(".active-tasks").insertAdjacentHTML("beforeend", task);
}

// Remove task from taskbar
function removeTaskFromTaskbar(win) {
  document.querySelector(`#desktop-task-${win.id}`).remove();
}
