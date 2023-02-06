setInterval(function () {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    time_display = document.getElementById(
      "time-display-text"
    )
    time_display.innerHTML = `${hours}:${minutes} ${ampm}`;
    time_display.title = `${hours}:${minutes} ${ampm}, ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
  }, 1000);