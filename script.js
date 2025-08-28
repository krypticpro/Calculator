const display = document.getElementById("display");
const getNumButtons = document.querySelectorAll(".number");
const numButtons = [...getNumButtons];
const getOpButtons = document.querySelectorAll(".operator");
const opButtons = [...getOpButtons];
const displayArray = [];
const numInputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const opInputs = ["+", "-", "*", "/"];

function backspace(str) {
  let newStr = str.slice(0, -1);
  str = newStr;
}

display.addEventListener("click", () => {
  function handleKey(e) {
    if (numInputs.includes(e.key)) {
      displayArray.push(parseInt(e.key));
      display.value += e.key;
    } else if (
      opInputs.includes(e.key) &&
      !isNaN(displayArray[displayArray.length - 1])
    ) {
      displayArray.push(e.key);
      display.value += " " + e.key + " ";
    } else if (e.key === "Enter") {
      let equals = document.getElementById("equals");
      let click = new MouseEvent("click");
      equals.dispatchEvent(click);
    } else if (e.key === "Backspace") {
      let newValue = display.value.slice(0, -1);
      display.value = newValue;
      displayArray.pop();
    } else {
      return;
    }
  }

  display.addEventListener("blur", () => {
    display.removeEventListener("keydown", handleKey);
  });
  display.addEventListener("keydown", handleKey);
});

numButtons.map((e, i) => {
  if (i === 9) {
    e.addEventListener("click", (e) => {
      if (!display.value || isNaN(displayArray[displayArray.length - 1])) {
        return;
      } else {
        let num = e.target.innerText;
        display.value += num;
        displayArray.push(parseInt(num));
      }
    });
  } else {
    e.addEventListener("click", (e) => {
      let num = e.target.innerText;
      display.value += num;
      displayArray.push(parseInt(num));
    });
  }
});

opButtons.map((e, i) => {
  if (i === 4) {
    e.addEventListener("click", (e) => {
      let ans = eval(display.value);
      display.value = ans;
    });
  } else if (i === 5) {
    e.addEventListener("click", (e) => {
      let newValue = display.value.slice(0, -1);
      display.value = newValue;
    });
  } else {
    e.addEventListener("click", (e) => {
      let symbol = e.target.innerText;
      if (
        opInputs.includes(symbol) &&
        !isNaN(displayArray[displayArray.length - 1])
      ) {
        display.value += ` ${symbol} `;
        displayArray.push(` ${symbol} `);
      } else {
        return;
      }
    });
  }
});
