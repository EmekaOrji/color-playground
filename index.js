var inputs = document.querySelectorAll("#redValueInput, #greenValueInput, #blueValueInput, #alphaValueInput");
var inputsNumbers = document.querySelectorAll("#redValueDisplay, #greenValueDisplay, #blueValueDisplay, #alphaValueDisplay");
var colorDisplay = document.getElementById("colorDisplay");
var toggleButton = document.getElementById("toggleButton");
var red, green, blue, alpha;
var isRGB = true;

setColor();

inputs.forEach(input => input.addEventListener("input", setColor));

toggleButton.addEventListener("click", () => {
  isRGB = !isRGB;
  setColor();
});

function setColor() {
  if (isRGB === true) {
    toggleButton.textContent = "RGB";
    red = inputs[0].value;
    green = inputs[1].value;
    blue = inputs[2].value;
    alpha = inputs[3].value / 100;

    document.getElementById("rgbDisplay").textContent = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    document.getElementById("colorDisplay").style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  } else {
    toggleButton.textContent = "HEX";
    red = parseInt(inputs[0].value).toString(16);
    green = parseInt(inputs[1].value).toString(16);
    blue = parseInt(inputs[2].value).toString(16);
    alpha = Math.round(((inputs[3].value / 100) * 255)).toString(16);

    document.getElementById("rgbDisplay").textContent = `#${red}${green}${blue}${alpha}`;
    document.getElementById("colorDisplay").style.backgroundColor = `rgba(${inputs[0].value}, ${inputs[1].value}, ${inputs[2].value}, ${inputs[3].value / 100})`;

  }

  inputsNumbers[0].textContent = red;
  inputsNumbers[1].textContent = green;
  inputsNumbers[2].textContent = blue;
  inputsNumbers[3].textContent = alpha;
}



colorDisplay.onclick = function () {
  document.execCommand("copy");
};

colorDisplay.addEventListener("copy", function (event) {
  event.preventDefault();
  if (event.clipboardData) {
    event.clipboardData.setData("text/plain", colorDisplay.textContent);
    console.log(event.clipboardData.getData("text"));
    setSuccessMessage("Color code copied", 1000);
  }
});

const successMessage = document.getElementById("successMessage");
function setSuccessMessage(message, duration = 3000) {
  successMessage.classList.add("error--show");
  successMessage.innerHTML = message;
  setTimeout(() => {
    successMessage.classList.remove("error--show");
  }, duration);
}