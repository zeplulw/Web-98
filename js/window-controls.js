let currentWindowId = 1;

function showWindow(title, content, width, height) {
  let win = `<div id=${
    currentWindowId + 1
  } class="window draggable" style="width: ${width}px; height: ${height}px">
    <div class="title-bar">
      <div class="title-bar-text">${title}</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body">
      <p>${content}</p>
    </div>
  </div>`;
  document.querySelector(".desktop").insertAdjacentHTML("beforeend", win);

  win = document.querySelector(".window:last-child");
  active_tasks.push(win);
  dragElement(win);
  win
    .querySelector('[aria-label="Close"]')
    .addEventListener("click", (e) => addCloseWindow(e));
  win
    .querySelector('[aria-label="Maximize"]')
    .addEventListener("click", (e) => addMaximizeWindow(e));
  bringToFrontEvent(win);
  console.log(active_tasks);
  currentWindowId += 1;
}

// Minimize

// Maximize
function addMaximizeWindow(e) {
  console.log(e.target)
  let win = e.target.parentElement.parentElement.parentElement;
  let desktop_size = document.querySelector(".desktop").getBoundingClientRect();

  win.dataset.width=win.style.width;
  win.dataset.height=win.style.height;

  win.style.left = 0;
  win.style.top = 0;
  win.style.width = `${desktop_size.width-6}px`;
  win.style.height = `${desktop_size.height-6-38}px`;
  e.target.ariaLabel = "Restore";
  e.target.removeEventListener("click", addMaximizeWindow());
  e.target.addEventListener("click", (e) => addRestoreWindow(e));
}

// Restore
function addRestoreWindow(e) {
  console.log("a")
  let win = e.target.parentElement.parentElement.parentElement;
  win.style.width = win.dataset.width;
  win.style.height = win.dataset.height;
  e.target.ariaLabel = "Maximize";
  e.target.removeEventListener("click", addRestoreWindow);
  e.target.addEventListener("click", (e) => addMaximizeWindow(e));
}

// Close
// Hardcoded parentElement scheme
function addCloseWindow(e) {
  // remove from active_tasks by id
  let id = e.target.parentElement.parentElement.parentElement.id;
  active_tasks = active_tasks.filter((task) => task.id != id);
  console.log(active_tasks);

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
