/*
Calculator should be 

------------------ Operation --
------------------Current value
-------------------------------
Clear               | Divide   |
--------------------------------
                    |          |
                    |          |
    NUMBERS         |          |
                    |OPERATORS |
                    |          |
                    |          |
--------------------------------
-/+     0       dot  equal     |
--------------------------------
*/

const buttons = [
  "clear",
  "/",
  "7",
  "8",
  "9",
  "x",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",

  "0",
  ".",
  "=",
];

let currenValue = 0;
let operator = "";

const content = document.querySelector("#content");

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const division = function (a, b) {
  return a / b;
};

function createCalculator() {
  const currentValueDiv = document.getElementById("current-value");
  const operatorDiv = document.getElementById("operation");
  operatorDiv.innerText = "";
  buttons.forEach((button) => {
    let cell = document.createElement("button");
    cell.innerText = button;
    cell.value = button;

    if (Number.parseInt(button) || button === "0") {
      // Add that button in the string screen
      // We need to check to not put a 0 in the left
      cell.addEventListener("click", (e) => {
        if (!(operatorDiv.innerText === "" && e.target.value === "0")) {
          operatorDiv.innerText += e.target.value;
        }
      });
    }

    switch (button) {
      case "/":
      case "+":
      case "-":
      case "x":
        cell.addEventListener("click", () => {
          const lastDigit = operatorDiv.innerText.slice(-1);
          if (lastDigit === "0" || Number.parseInt(lastDigit))
            operatorDiv.innerText += button;
        });
        break;
      case ".":
        cell.addEventListener("click", () => {
          if (
            (operatorDiv.innerText !== "" &&
              Number.parseInt(operatorDiv.innerText.slice(-1))) ||
            operatorDiv.innerText.slice(-1) === "0"
          )
            operatorDiv.innerText += button;
        });
        break;
      case "clear":
        cell.style.width = "332px";
        cell.style.borderRadius = "20px";
        cell.addEventListener("click", () => {
          operatorDiv.innerText = "";
          currentValueDiv.innerText = "";
        });
        break;
      case "=":
        // get the operation hireachy

        cell.addEventListener("click", () => {
          // Split the expression into individual tokens
          const tokens = operatorDiv.innerText.match(/(\d+|\+|\-|\x|\/|\.)/g);

          // Perform multiplication and division first
          for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "x") {
              const result =
                parseFloat(tokens[i - 1]) * parseFloat(tokens[i + 1]);
              tokens.splice(i - 1, 3, result);
              i--;
            } else if (tokens[i] === "/") {
              const result =
                parseFloat(tokens[i - 1]) / parseFloat(tokens[i + 1]);
              tokens.splice(i - 1, 3, result);
              i--;
            }
          }

          // Perform addition and subtraction next
          for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === "+") {
              const result =
                parseFloat(tokens[i - 1]) + parseFloat(tokens[i + 1]);
              tokens.splice(i - 1, 3, result);
              i--;
            } else if (tokens[i] === "-") {
              const result =
                parseFloat(tokens[i - 1]) - parseFloat(tokens[i + 1]);
              tokens.splice(i - 1, 3, result);
              i--;
            }
          }

          currentValueDiv.innerText = tokens[0];
        });
    }

    content.appendChild(cell).className = "grid-item";
  });
}

createCalculator();
