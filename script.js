"use strict";

const screenContentLengthLimit = 16;
const screen = document.body.querySelector(".screen");

const prevContentNode = screen.querySelector(".previous-content");
const prevOperandNode = prevContentNode.querySelector(".previous-operand");
const operatorNode = prevContentNode.querySelector(".operator");
const currOperandNode = screen.querySelector(".current-operand");

const keyboard = document.body.querySelector(".keyboard");

for (let numberBtn of keyboard.querySelectorAll(".number")) {
    numberBtn.onclick = () => currOperandNode.textContent = insertNumberIntoNode(currOperandNode, numberBtn.textContent);
}

const keyCE = keyboard.querySelector(".key-CE");
keyCE.onclick = () => [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = clearScreen(currOperandNode, prevOperandNode, operatorNode);

const keySqrt = keyboard.querySelector(".key-sqrt");
keySqrt.onclick = () => currOperandNode.textContent = sqrtNodeValue(currOperandNode);

const keyPercent = keyboard.querySelector(".key-percent");
keyPercent.onclick = () => currOperandNode.textContent = divideNodeValue(currOperandNode, 100);

const keyRecip = keyboard.querySelector(".key-recip");
keyRecip.onclick = () => currOperandNode.textContent = recipNodeValue(currOperandNode);

const keyDiv = keyboard.querySelector(".key-div");
keyDiv.onclick = () => [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = enterOperation(currOperandNode, prevOperandNode, operatorNode, "/");

const keyMult = keyboard.querySelector(".key-mult");
keyMult.onclick = () => [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = enterOperation(currOperandNode, prevOperandNode, operatorNode, "*");

const keySub = keyboard.querySelector(".key-sub");
keySub.onclick = () => [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = enterOperation(currOperandNode, prevOperandNode, operatorNode, "-");

const keyAdd = keyboard.querySelector(".key-add");
keyAdd.onclick = () => [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = enterOperation(currOperandNode, prevOperandNode, operatorNode, "/");

const keyEquals = keyboard.querySelector(".key-equals");
keyEquals.onclick = () => [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = completeOperation(currOperandNode, prevOperandNode, operatorNode);

const keyE = keyboard.querySelector(".key-e");
keyE.onclick = () => currOperandNode.textContent = insertNumberIntoNode(currOperandNode, Math.E, true);

const keyPi = keyboard.querySelector(".key-pi");
keyPi.onclick = () => currOperandNode.textContent = insertNumberIntoNode(currOperandNode, Math.PI, true);

const keyPow = keyboard.querySelector(".key-pow");
keyPow.onclick = () => [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = enterOperation(currOperandNode, prevOperandNode, operatorNode, "^");

const keyRound2 = keyboard.querySelector(".key-round2");
keyRound2.onclick = () => currOperandNode.textContent = roundNodeValue(currOperandNode, 2);

const keyRound0 = keyboard.querySelector(".key-round0");
keyRound0.onclick = () => currOperandNode.textContent = roundNodeValue(currOperandNode, 0);

const keyDecimal = keyboard.querySelector(".key-decimal");
keyDecimal.onclick = () => currOperandNode.textContent = insertNumberIntoNode(currOperandNode, ".");

document.addEventListener("keydown", (e) => {
    // console.log(e);

    switch (e.key) {
        case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
            currOperandNode.textContent = insertNumberIntoNode(currOperandNode, e.key); 
            break;
        case "c": case "Backspace":
            [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = clearScreen(currOperandNode, prevOperandNode, operatorNode); 
            break;
        case "s":
            currOperandNode.textContent = sqrtNodeValue(currOperandNode); 
            break;
        case "p":
            currOperandNode.textContent = divideNodeValue(currOperandNode, 100); 
            break;
        case "r":
            currOperandNode.textContent = recipNodeValue(currOperandNode);
            break;
        case "/":
            [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = enterOperation(currOperandNode, prevOperandNode, operatorNode, "/"); 
            break;
        case "*":
            [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = enterOperation(currOperandNode, prevOperandNode, operatorNode, "*"); 
            break;
        case "-":
            [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = enterOperation(currOperandNode, prevOperandNode, operatorNode, "-"); 
            break;
        case "+":
            [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = enterOperation(currOperandNode, prevOperandNode, operatorNode, "+"); 
            break;
        case "=":
            [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = completeOperation(currOperandNode, prevOperandNode, operatorNode); 
            break;
        case "E":
            currOperandNode.textContent = insertNumberIntoNode(currOperandNode, String(Math.E), true); 
            break;
        case "P":
            currOperandNode.textContent = insertNumberIntoNode(currOperandNode, String(Math.PI), true); 
            break;
        case "w":
            [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent] = enterOperation(currOperandNode, prevOperandNode, operatorNode, "^");
            break;

        case ".":
            currOperandNode.textContent = insertNumberIntoNode(currOperandNode, ".");
            return
        
        // debug
        case "D":
            console.log(`currOperandNode: ${currOperandNode.textContent}, prevOperandNode: ${prevOperandNode.textContent}, operatorNode: ${operatorNode.textContent},`);
            break;
    }
});

function insertNumberIntoNode(currOperandNode, number, clear = false) {   
    let newTextContent = currOperandNode.textContent;

    if (number === "." && newTextContent.length === 0) {
        return "0.";
    }

    if (number === "." && newTextContent.includes(number) || newTextContent.length === 1 && newTextContent[0] === "0" && number !== ".") {
        return newTextContent;
    } 

    if (clear) {
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

    return [newTextContent.substring(0, newTextContent.length - 1), prevOperandNode.textContent, operatorNode.textContent];
}

function sqrtNodeValue(currOperandNode) {
    let newTextContent = currOperandNode.textContent;
    if (newTextContent.length === 0) {
        return newTextContent;
    }

    return Math.sqrt(+newTextContent);
}

function addNodeValue(currOperandNode, value) {
    let newTextContent = currOperandNode.textContent;
    if (newTextContent.length === 0) {
        return newTextContent;
    }

    return +newTextContent + value;
}

function subtractNodeValue(currOperandNode, value) {
    let newTextContent = currOperandNode.textContent;
    if (newTextContent.length === 0) {
        return newTextContent;
    }

    return +newTextContent - value;
}

function multiplyNodeValue(currOperandNode, value) {
    let newTextContent = currOperandNode.textContent;
    if (newTextContent.length === 0) {
        return newTextContent;
    }

    return +newTextContent * value;
}

function divideNodeValue(currOperandNode, value) {
    let newTextContent = currOperandNode.textContent;
    if (newTextContent.length === 0) {
        return newTextContent;
    }

    newTextContent = +currOperandNode.textContent / value; 
    if (newTextContent === Infinity) {
        newTextContent = "Error: can't divide by 0!";
    }
    return newTextContent;
}

function recipNodeValue(currOperandNode) {
    let newTextContent = currOperandNode.textContent;
    if (newTextContent.length === 0 || newTextContent === "0") {
        return newTextContent;
    }
    return 1 / newTextContent;
}

function enterOperation(currOperandNode, prevOperandNode, operatorNode, newOperator) {
    if (currOperandNode.textContent.length === 0 || prevOperandNode.textContent.length != 0 ||
        currOperandNode.textContent[currOperandNode.textContent.length-1] === "."
    ) {
        return [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent];
    }

    return ["", currOperandNode.textContent, newOperator];
}

function completeOperation(currOperandNode, prevOperandNode, operatorNode) {
    let newTextContent = currOperandNode.textContent;
    if (newTextContent.length === 0 || currOperandNode.textContent[currOperandNode.textContent.length-1] === ".") {
        return [currOperandNode.textContent, prevOperandNode.textContent, operatorNode.textContent];
    }

    switch (operatorNode.textContent) {
        case "+":
            newTextContent = addNodeValue(prevOperandNode, +newTextContent);
            break;
        case "-":
            newTextContent = subtractNodeValue(prevOperandNode, +newTextContent);
            break
        case "*":
            newTextContent = multiplyNodeValue(prevOperandNode, +newTextContent);
            break;
        case "/":
            newTextContent = divideNodeValue(prevOperandNode, +newTextContent);
            break;
        case "^":
            newTextContent = Math.pow(+prevOperandNode.textContent, +newTextContent);
            break;
    }
    
    return [newTextContent, "", ""];
}

function roundNodeValue(currOperandNode, decimalPlaces) {
    return (+currOperandNode.textContent).toFixed(decimalPlaces);
}