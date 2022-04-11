let binNumOne = document.getElementById("bin-input-one");
let binNumTwo = document.getElementById("bin-input-two");
let addBtn = document.getElementById("add-btn");

binNumOne.focus();

addBtn.addEventListener("click", displayAnswer);
document.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    displayAnswer();
  }
});

/**
 * Diaplays the answer to the screen, clears the input
 * fields and sets the focus to the first input field
 */
function displayAnswer() {
  let answerElement = document.createElement("h1");
  answerElement.setAttribute("id", "answer-display");
  let answer = add(binNumOne.value, binNumTwo.value);

  if (isBin(answer)) {
    answerElement.textContent = `Answer: ${answer}`;
  } else {
    answerElement.textContent = "Invalid input";
  }

  document.getElementById("answer-display")?.remove();
  document.body.appendChild(answerElement);

  binNumOne.value = "";
  binNumTwo.value = "";
  binNumOne.focus();
}

/**
 * Adds the given binary numbers
 * @param {*} numOne
 * @param {*} numTwo
 * @returns the answer as a string
 */
function add(numOne, numTwo) {
  let n1 = String(numOne);
  let n2 = String(numTwo);

  if (!isBin(n1) || !isBin(n2)) {
    return "invalid";
  }

  let length = n1.length > n2.length ? n1.length : n2.length;
  let answer = "";

  n1 = n1.padStart(length, "0");
  n2 = n2.padStart(length, "0");
  let carry = 0;

  for (let i = length; i > 0; i--) {
    let n1Digit = Number(n1.charAt(i - 1));
    let n2Digit = Number(n2.charAt(i - 1));
    let currentSum = n1Digit + n2Digit + carry;

    switch (currentSum) {
      case 0:
        answer += "0";
        carry = 0;
        break;
      case 1:
        answer += "1";
        carry = 0;
        break;
      case 2:
        answer += "0";
        carry = 1;
        break;
      case 3:
        answer += "1";
        carry = 1;
        break;
    }
  }

  if (carry === 1) {
    answer += "1";
  }

  return answer.split("").reverse().join("");
}

/**
 * @param {String} num
 * @returns whether the given value is a valid
 * binary number or not
 */
function isBin(num) {
  for (const c of num) {
    if (c != "0" && c != "1") {
      return false;
    }
  }
  return true;
}
