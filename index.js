import getHex from './gethex.js';
import ondbltap from './doubletap.js';

var inputs = document.querySelectorAll(
	'#redValueInput, #greenValueInput, #blueValueInput, #alphaValueInput'
);
var inputsNumbers = document.querySelectorAll(
	'#redValueDisplay, #greenValueDisplay, #blueValueDisplay, #alphaValueDisplay'
);
var colorDisplay = document.getElementById('colorDisplay');
var rgbDisplay = document.getElementById('rgbDisplay');
var toggleButton = document.getElementById('toggleButton');
var red, green, blue, alpha;
var isRGB = true;

setColor();

inputs.forEach((input) => input.addEventListener('input', setColor));

toggleButton.addEventListener('click', () => {
	isRGB = !isRGB;
	setColor();
});

function setColor() {
	if (isRGB === true) {
		toggleButton.textContent = 'RGB';
		red = inputs[0].value;
		green = inputs[1].value;
		blue = inputs[2].value;
		alpha = inputs[3].value / 100;

		document.getElementById(
			'rgbDisplay'
		).textContent = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
		document.getElementById(
			'colorDisplay'
		).style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
	} else {
		toggleButton.textContent = 'HEX';
		red = getHex(parseInt(inputs[0].value));
		green = getHex(parseInt(inputs[1].value));
		blue = getHex(parseInt(inputs[2].value));
		alpha = getHex(Math.round((inputs[3].value / 100) * 255));

		document.getElementById(
			'rgbDisplay'
		).textContent = `#${red}${green}${blue}${alpha}`;
		document.getElementById('colorDisplay').style.backgroundColor = `rgba(${
			inputs[0].value
		}, ${inputs[1].value}, ${inputs[2].value}, ${inputs[3].value / 100})`;
	}

	inputsNumbers[0].textContent = red;
	inputsNumbers[1].textContent = green;
	inputsNumbers[2].textContent = blue;
	inputsNumbers[3].textContent = alpha;
}

colorDisplay.addEventListener('dblclick', function () {
	document.execCommand('copy');
});

colorDisplay.addEventListener(
	'mouseup',
	ondbltap(() => {
		document.execCommand('copy');
	})
);

rgbDisplay.addEventListener('click', function (event) {
	event.stopPropagation();
	colorDisplay.focus();
});
rgbDisplay.addEventListener('click', function (event) {
	event.preventDefault();
});

colorDisplay.addEventListener('copy', function (event) {
	event.preventDefault();
	if (event.clipboardData) {
		event.clipboardData.setData('text/plain', rgbDisplay.textContent);
		LoudIt('Color code copied', {
			backgroundColor: colorDisplay.textContent,
			opacity: 1,
		});
	}
});

document.getElementById('rgbDisplay').oninput = (event) => {
	document.getElementById('colorDisplay').style.backgroundColor =
		event.target.textContent;
};
