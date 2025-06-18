const display = document.getElementById("display");
const historyBox = document.getElementById("history");
const clickSound = document.getElementById("clickSound");

let currentInput = "";
let history = [];

function updateDisplay(value) {
  display.textContent = value || "0";
}

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function updateHistory(expr, result) {
  const entry = `${expr} = ${result}`;
  history.unshift(entry);
  if (history.length > 5) history.pop();

  historyBox.innerHTML = history
    .map(h => `<div>• ${h}</div>`) 
    .join("");
}

function handleButtonPress(action) {
  playSound();

  if (action === "C") {
    currentInput = "";
    updateDisplay(currentInput);
    return;
  }

  if (action === "=") {
    try {
      const sanitized = currentInput.replace(/÷/g, '/').replace(/×/g, '*');
      const result = eval(sanitized);

      if (result !== undefined && result !== null) {
        updateHistory(currentInput, result);
        currentInput = result.toString();
        updateDisplay(currentInput);
      } else {
        throw new Error("Invalid");
      }
    } catch {
      updateDisplay("Error");
      currentInput = "";
    }
    return;
  }

  currentInput += action;
  updateDisplay(currentInput);
}

// Button styling and interaction
document.querySelectorAll(".btn").forEach(btn => {
  btn.classList.add(
    "p-4", "rounded-xl", "transition-all", "duration-300", "text-xl", "font-bold",
    "bg-white", "bg-opacity-10", "hover:bg-opacity-20", "hover:scale-105",
    "focus:outline-none", "shadow-lg", "hover:shadow-cyan-500/50",
    "active:scale-95"
  );

  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");
    handleButtonPress(action);
  });
});

// Initialize display
updateDisplay("0");
