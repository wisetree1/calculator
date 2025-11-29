"use strict";

const screenContentLengthLimit = 16;
const screen = document.body.querySelector(".screen");

const prevContentNode = screen.querySelector(".previous-content");
const prevOperandNode = prevContentNode.querySelector(".previous-operand");
const operatorNode = prevContentNode.querySelector(".operator");
const currOperandNode = screen.querySelector(".current-operand");

const keyboard = document.body.querySelector(".keyboard");

for (let numberBtn of keyboard.querySelectorAll(".number")) {
    numberBtn.onclick = () => insertNumber(currOperandNode, +numberBtn.textContent);
}


let cePressedCount = 0;
const keyCE = keyboard.querySelector(".key-CE");
keyCE.onclick = () => cePressedCount = clearScreen(currOperandNode, prevOperandNode, operatorNode, cePressedCount+1);

keyboard.addEventListener("click", (e) => {
    if (e.target.className === "key-CE") {
        cePressedCount++;
    } else if (e.target.nodeName === "BUTTON") {
        cePressedCount = 0;
    }
});

const keySqrt = keyboard.querySelector(".key-sqrt");
keySqrt.onclick = () => sqrtContent(currOperandNode);

const keyPercent = keyboard.querySelector(".key-percent");
keyPercent.onclick = () => divideContent(currOperandNode, 100);

const keyRecip = keyboard.querySelector(".key-recip");
keyRecip.onclick = () => recipContent(currOperandNode);

const keyDiv = keyboard.querySelector(".key-div");
keyDiv.onclick = () => enterOperation(currOperandNode, prevOperandNode, operatorNode, "/");

const keyMult = keyboard.querySelector(".key-mult");
keyMult.onclick = () => enterOperation(currOperandNode, prevOperandNode, operatorNode, "*");

const keySub = keyboard.querySelector(".key-sub");
keySub.onclick = () => enterOperation(currOperandNode, prevOperandNode, operatorNode, "-");

const keyAdd = keyboard.querySelector(".key-add");
keyAdd.onclick = () => enterOperation(currOperandNode, prevOperandNode, operatorNode, "/");

const keyEquals = keyboard.querySelector(".key-equals");
keyEquals.onclick = () => completeOperation(currOperandNode, prevOperandNode, operatorNode);


// const keyCE = keyboard.querySelector(".key-CE");
// keyCE.onclick = () => casdlearScreen(screen);



document.addEventListener("keydown", (e) => {
    console.log(e);

    cePressedCount = e.key === "c" ? cePressedCount+1 : 0;

    switch (e.key) {
        case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
            insertNumber(currOperandNode, +e.key);
            break;
        case "Backspace":
            removeLastNumber(currOperandNode);
            break;
        case "c":
            clearScreen(currOperandNode, prevOperandNode, operatorNode, cePressedCount);
            break;
        case "s":
            sqrtContent(currOperandNode);
            break;
        case "p":
            divideContent(currOperandNode, 100);
            break;
        case "r":
            recipContent(currOperandNode);
            break;
        case "/":
            enterOperation(currOperandNode, prevOperandNode, operatorNode, "/");
            break;
        case "*":
            enterOperation(currOperandNode, prevOperandNode, operatorNode, "*");
            break;
        case "-":
            enterOperation(currOperandNode, prevOperandNode, operatorNode, "-");
            break;
        case "+":
            enterOperation(currOperandNode, prevOperandNode, operatorNode, "+");
            break;
        case "=":
            completeOperation(currOperandNode, prevOperandNode, operatorNode);
            break;
    }
});

function insertNumber(currOperandNode, number) {
    if (number === 0 && currOperandNode.textContent.length === 1 && currOperandNode.textContent[0] === "0") {
        return;
    } else if (currOperandNode.textContent.length === 1 && currOperandNode.textContent[0] === "0") {
        currOperandNode.textContent = "";
    }

    if (currOperandNode.textContent.length < screenContentLengthLimit) {
        currOperandNode.textContent += number;
    }
}

function removeLastNumber(currOperandNode) {
    if (currOperandNode.textContent.length === 0) {
        return;
    }

    let offset = 1;
    if (currOperandNode.textContent[currOperandNode.textContent.length-2] === ".") {
        offset = 2;
    }
    currOperandNode.textContent = currOperandNode.textContent.substring(0, currOperandNode.textContent.length-offset);
}

function clearScreen(currOperandNode, prevOperandNode, operatorNode, cePressedCount) {
    console.log(cePressedCount);
    if (cePressedCount > 1) {
        prevOperandNode.textContent = "";
        operatorNode.textContent = "";
        return 0;
    }
    currOperandNode.textContent = "";
    return cePressedCount;
}

function sqrtContent(currOperandNode) {
    if (currOperandNode.textContent.length > 0) {
        currOperandNode.textContent = Math.sqrt(+currOperandNode.textContent);
    }
}

function divideContent(currOperandNode, value) {
    if (currOperandNode.textContent.length > 0) {
        currOperandNode.textContent /= value;
    }
}

function recipContent(currOperandNode) {
    if (currOperandNode.textContent.length === 0 || currOperandNode.textContent === "0") {
        return;
    }
    currOperandNode.textContent = 1 / currOperandNode.textContent;
}

function enterOperation(currOperandNode, prevOperandNode, operatorNode, newOperator) {
    if (currOperandNode.textContent.length === 0 || currOperandNode.textContent === "" ||
        prevOperandNode.textContent.length != 0
    ) {
        return;
    }

    prevOperandNode.textContent = currOperandNode.textContent;
    operatorNode.textContent = newOperator;
    currOperandNode.textContent = "";
}

function completeOperation(currOperandNode, prevOperandNode, operatorNode) {
    if (currOperandNode.textContent.length === 0 || currOperandNode.textContent === "") {
        return;
    }

    switch (operatorNode.textContent) {
        case "+":
            currOperandNode.textContent = +prevOperandNode.textContent + +currOperandNode.textContent;
            break;
        case "-":
            currOperandNode.textContent = +prevOperandNode.textContent - +currOperandNode.textContent;
            break
        case "*":
            currOperandNode.textContent = +prevOperandNode.textContent * +currOperandNode.textContent;
            break;
        case "/":
            let result = +prevOperandNode.textContent / +currOperandNode.textContent;
            if (result === Infinity) {
                currOperandNode.textContent = "Error: can't divide by 0!";
            } else {
                currOperandNode.textContent = result;
            }
            break;
    }
    prevOperandNode.textContent = "";
    operatorNode.textContent = "";
}