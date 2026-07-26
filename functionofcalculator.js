/*
1) Create helper functions to read and update the calculator display:
   a) `getHistory()` → return the text inside `#history-value`.
   b) `printHistory(num)` → set `#history-value` to `num`.
   c) `getOutput()` → return the text inside `#output-value`.
   d) `printOutput(num)` → show `num` in `#output-value`
      - if `num` is empty, show blank
      - else show it using formatted number (commas)

2) Format and unformat numbers:
   a) `getFormattedNumber(num)`:
      - If num is "-" return empty (avoid showing just "-")
      - Convert to Number and use `toLocaleString("en")` to add commas.
   b) `reverseNumberFormat(num)`:
      - Remove commas using `replace(/,/g,'')`
      - Convert back to Number.

3) Add click events for operator buttons (class="operator"):
   a) Get all operator buttons using `getElementsByClassName("operator")`.
   b) Loop through each button and add a `click` event listener.

4) Handle operator button actions:
   a) If button id is `"clear"`:
      - Clear history and output.
   b) Else if button id is `"backspace"`:
      - Remove the last digit from output and re-print it.
   c) Else (for +, -, *, /, %, =):
      - Read current output and history.
      - If output is empty but history ends with an operator, remove the last operator.
      - If output or history has value:
        - Convert output to number (remove commas)
        - Add output to history

      - If button id is `"="`:
        - Evaluate full history using `eval(history)`
        - Print result in output and clear history
      - Else:
        - Add the operator to history
        - Print history and clear output for next number input.

5) Add click events for number buttons (class="number"):
   a) Get all number buttons using `getElementsByClassName("number")`.
   b) Loop through each button and add a `click` event listener.

6) Handle number button clicks:
   a) Get current output (remove commas).
   b) Append the clicked digit (`this.id`) to the output.
   c) Print the updated output (formatted with commas).
*/
function getHistory() {
   return document.getElementById("history-value").innerText;

}

function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.frequency.value = 700;
    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
}

document.querySelectorAll(".number, .operator").forEach(function (button) {
    button.addEventListener("click", playClickSound);
});
function printHistory(num) {
   document.getElementById("history-value").innerText = num;

}

function getOutput() {
   return document.getElementById("output-value").innerText;

}

function printOutput(num) {
   if (num == "") {
      document.getElementById("output-value").innerText = num;

   }

   else {
      document.getElementById("output-value").innerText = getFormattedNumber(num);
   }

}

function getFormattedNumber(num) {
   if (num == "-") {
      return "";

   }

   var n = Number(num);
   var value = n.toLocaleString("en");
   return value;

}

function reverseNumberFormat(num) {

   return Number(num.replace(/,/g, ''));

}

var operator = document.getElementsByClassName("operator");

for (var i = 0; i < operator.length; i++) {

   operator[i].addEventListener('click', function () {

      if (this.id == "clear") {

         printHistory("");

         printOutput("");

      }

      else if (this.id == "backspace") {

         var output = reverseNumberFormat(getOutput()).toString();

         if (output) {//if output has a value

            output = output.substr(0, output.length - 1);

            printOutput(output);

         }

      }

      else {

         var output = getOutput();

         var history = getHistory();

         if (output == "" && history != "") {

            if (isNaN(history[history.length - 1])) {

               history = history.substr(0, history.length - 1);

            }

         }

         if (output != "" || history != "") {

            output = output == "" ? output : reverseNumberFormat(output);

            history = history + output;

            if (this.id == "=") {

               var result = eval(history);

               printOutput(result);

               printHistory("");

            }

            else {

               history = history + this.id;

               printHistory(history);

               printOutput("");

            }

         }

      }


   });

}

var number = document.getElementsByClassName("number");

for (var i = 0; i < number.length; i++) {

   number[i].addEventListener('click', function () {

      var output = reverseNumberFormat(getOutput());

      if (output != NaN) { //if output is a number

         output = output + this.id;

         printOutput(output);

      }

   });

}