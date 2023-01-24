// Minimize


// Maximize


// Close
// Hardcoded parentElement scheme because of 98.css' format
document.querySelectorAll('[aria-label="Close"]').forEach(elmnt => elmnt.addEventListener("click", e => e.target.parentElement.parentElement.parentElement.remove()))