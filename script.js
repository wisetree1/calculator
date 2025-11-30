"use strict";

const screenContentLengthLimit = 16;
const screen = document.body.querySelector(".screen");

const prevContentNode = screen.querySelector(".previous-content");
const prevOperandNode = prevContentNode.querySelector(".previous-operand");
const operatorNode = prevContentNode.querySelector(".operator");
const currOperandNode = screen.querySelector(".current-operand");

const keyboard = document.body.querySelector(".keyboard");

for (let numberBtn of keyboard.querySelectorAll(".number")) {
    numberBtn.onclick = () => currOperandNode.textContent = insertNumberIntoNode(currOperandNode, +numberBtn.textContent);
}

const keyCE = keyboard.querySelector(".key-CE");
keyCE.onclick = () => [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = clearScreen(currOperandNode, prevOperandNode, operatorNode);

const keySqrt = keyboard.querySelector(".key-sqrt");
keySqrt.onclick = () => sqrtContent(currOperandNode);

const keyPercent = keyboard.querySelector(".key-percent");
keyPercent.onclick = () => currOperandNode.textContent = divideNodeValue(currOperandNode, 100);

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

const keyE = keyboard.querySelector(".key-e");
keyE.onclick = () => currOperandNode.textContent = insertNumberIntoNode(currOperandNode, Math.E, true);

const keyPi = keyboard.querySelector(".key-pi");
keyPi.onclick = () => currOperandNode.textContent = insertNumberIntoNode(currOperandNode, Math.PI, true);

const keyPow = keyboard.querySelector(".key-pow");
keyPow.onclick = () => enterOperation(currOperandNode, prevOperandNode, operatorNode, "^");

const keyRound2 = keyboard.querySelector(".key-round2");
keyRound2.onclick = () => roundContent(currOperandNode, 2);

const keyRound0 = keyboard.querySelector(".key-round0");
keyRound0.onclick = () => roundContent(currOperandNode, 0);


document.addEventListener("keydown", (e) => {
    console.log(e);

    switch (e.key) {
        case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
            currOperandNode.textContent = insertNumberIntoNode(currOperandNode, +e.key); 
            break;
        case "c": case "Backspace":
            [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = clearScreen(currOperandNode, prevOperandNode, operatorNode); 
            break;
        case "s":
            sqrtContent(currOperandNode); 
            break;
        case "p":
            currOperandNode.textContent = divideNodeValue(currOperandNode, 100); 
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
        case "E":
            currOperandNode.textContent = insertNumberIntoNode(currOperandNode, Math.E, true); 
            break;
        case "P":
            currOperandNode.textContent = insertNumberIntoNode(currOperandNode, Math.PI, true); 
            break;
        case "w":
            enterOperation(currOperandNode, prevOperandNode, operatorNode, "^");
            break;
    }
});

function insertNumberIntoNode(currOperandNode, number, clear = false) {   
    let newTextContent = currOperandNode.textContent;
    if (clear || currOperandNode.textContent.length === 1 && currOperandNode.textContent[0] === "0") {
        newTextContent = "";
    }
    
    if (newTextContent.length < screenContentLengthLimit) {
        newTextContent += number;
    }
    return newTextContent;
}

function clearScreen(currOperandNode, prevOperandNode, operatorNode) {
    let newTextContent = currOperandNode.textContent;
    if (newTextContent.length === 0) {
        return newTextContent, "", "";
    }

    let offset = 1;
    if (newTextContent.length > 2 && newTextContent[newTextContent.length - 2] === ".") {
        offset = 2;
    }
    return [newTextContent.substring(0, newTextContent.length - offset), prevOperandNode.textContent, operatorNode.textContent];
}

function sqrtContent(currOperandNode) {
    if (currOperandNode.textContent.length > 0) {
        currOperandNode.textContent = Math.sqrt(+currOperandNode.textContent);
    }
}

function divideNodeValue(currOperandNode, value) {
    if (currOperandNode.textContent.length == 0) {
        return;
    }

    let newTextContent = +currOperandNode.textContent / value; 
    if (newTextContent === Infinity) {
        newTextContent = "Error: can't divide by 0!";
    }
    return newTextContent;
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
            currOperandNode.textContent = divideNodeValue(prevOperandNode, +currOperandNode.textContent);
            break;
        case "^":
            currOperandNode.textContent = Math.pow(+prevOperandNode.textContent, +currOperandNode.textContent);
            break;
    }
    prevOperandNode.textContent = "";
    operatorNode.textContent = "";
}

function roundContent(currOperandNode, places) {
    currOperandNode.textContent = (+currOperandNode.textContent).toFixed(places);
}