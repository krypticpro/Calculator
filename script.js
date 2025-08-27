let display = document.getElementById("display");
let getNumButtons = document.querySelectorAll(".number");
let numButtons = [...getNumButtons];
let getOpButtons = document.querySelectorAll(".operator");
let opButtons = [...getOpButtons];
let focus = new FocusEvent("focus");
let displayArray = [];
let numInputs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let opInputs = ["+", "-", "*", "/"];

function backspace(str) {
  let newStr = str.slice(0, -1);
  str = newStr;
}

display.addEventListener("click", () => {
  display.dispatchEvent(focus);
  console.log("received focus!");
  function handleKey(e) {
    console.log("added keydown listener!");

    if (numInputs.includes(e.key)) {
      displayArray.push(parseInt(e.key));
      console.log(displayArray);
      display.value += e.key;
    } else if (
      opInputs.includes(e.key) &&
      !isNaN(displayArray[displayArray.length - 1])
    ) {
      displayArray.push(e.key);
      display.value += " " + e.key + " ";
    } else if (e.key === "Backspace") {
      let newValue = display.value.slice(0, -1);
      display.value = newValue;
      displayArray.pop();
      console.log(display.value);
      console.log(display.value.length);
      console.log(displayArray);
      console.log("backspace!");
    } else {
      display.innerText += "";
    }
  }

  display.addEventListener("blur", () => {
    display.removeEventListener("keydown", handleKey);
    console.log("lost focus");
  });
  display.addEventListener("keydown", handleKey);
});

numButtons.map((e) => {
  e.addEventListener("click", (e) => {
    console.log(`clicked ${e.target.innerText}!`);
    display.value += e.target.innerText;
  });
});

opButtons.map((e, i) => {
  if (i === 4) {
    e.addEventListener("click", (e) => {
      let ans = eval(display.value);
      display.value = ans;
      console.log("evaluated!");
    });
  } else if (i === 5) {
    e.addEventListener("click", (e) => {
      let newValue = display.value.slice(0, -1);
      display.value = newValue;
      console.log(display.value);
      console.log(display.value.length);
      console.log("backspace!");
    });
  } else {
    e.addEventListener("click", (e) => {
      if (
        opInputs.includes(e.key) &&
        !isNaN(displayArray[displayArray.length - 1])
      ) {
        console.log(`clicked ${e.target.innerText}!`);
        display.value += ` ${e.target.innerText} `;
      } else {
        return;
      }
    });
  }
});
