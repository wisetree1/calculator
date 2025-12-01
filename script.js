"use strict";

const screenContentLengthLimit = 16;
const nodeScreen = document.body.querySelector(".screen");

const nodePrevContent = nodeScreen.querySelector(".previous-content");
const nodePrevOperand = nodePrevContent.querySelector(".previous-operand");
const nodeOperator = nodePrevContent.querySelector(".operator");
const nodeCurrOperand = nodeScreen.querySelector(".current-operand");

let newHistoryEquation = "";
let operationNumber = 0;
const nodeHistory = document.querySelector(".history");

const nodeKeyboard = document.body.querySelector(".keyboard");

for (let numberBtn of nodeKeyboard.querySelectorAll(".number")) {
    numberBtn.onclick = () => nodeCurrOperand.textContent = insertNumberIntoNode(nodeCurrOperand, numberBtn.textContent);
}

const labelDecimalPlaces = nodeKeyboard.querySelector("#decimal-places-label");
const inputDecimalPlaces = nodeKeyboard.querySelector("#decimal-places-range");
let currDecimalPlaces = inputDecimalPlaces.value;
inputDecimalPlaces.oninput = (e) => currDecimalPlaces = changeCurrentDecimalPlaces(labelDecimalPlaces, e.target.value);

const keyCE = nodeKeyboard.querySelector(".key-CE");
keyCE.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = clearScreen(nodeCurrOperand, nodePrevOperand, nodeOperator);

const keySqrt = nodeKeyboard.querySelector(".key-sqrt");
keySqrt.onclick = () => nodeCurrOperand.textContent = sqrtValue(nodeCurrOperand.textContent, currDecimalPlaces);

const keyPercent = nodeKeyboard.querySelector(".key-percent");
keyPercent.onclick = () => nodeCurrOperand.textContent = divideValue(nodeCurrOperand.textContent, 100, currDecimalPlaces);

const keyRecip = nodeKeyboard.querySelector(".key-recip");
keyRecip.onclick = () => nodeCurrOperand.textContent = recipNodeValue(nodeCurrOperand);

const keyDiv = nodeKeyboard.querySelector(".key-div");
keyDiv.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "/");

const keyMult = nodeKeyboard.querySelector(".key-mult");
keyMult.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "*");

const keySub = nodeKeyboard.querySelector(".key-sub");
keySub.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "-");

const keyAdd = nodeKeyboard.querySelector(".key-add");
keyAdd.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "/");

const keyEquals = nodeKeyboard.querySelector(".key-equals");
keyEquals.onclick = () => {
    [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent, newHistoryEquation] = completeOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, currDecimalPlaces);
    if (newHistoryEquation !== "") {
        nodeHistory.insertBefore(getNewHistoryChild(newHistoryEquation), nodeHistory.firstChild);
    }
};

const keyE = nodeKeyboard.querySelector(".key-e");
keyE.onclick = () => nodeCurrOperand.textContent = insertNumberIntoNode(nodeCurrOperand, String(Math.E), true, currDecimalPlaces);

const keyPi = nodeKeyboard.querySelector(".key-pi");
keyPi.onclick = () => nodeCurrOperand.textContent = insertNumberIntoNode(nodeCurrOperand, String(Math.PI), true, currDecimalPlaces);

const keyPow = nodeKeyboard.querySelector(".key-pow");
keyPow.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "^");

const keyRound2 = nodeKeyboard.querySelector(".key-round2");
keyRound2.onclick = () => nodeCurrOperand.textContent = roundNodeValue(nodeCurrOperand.textContent, 2);

const keyRound0 = nodeKeyboard.querySelector(".key-round0");
keyRound0.onclick = () => nodeCurrOperand.textContent = roundNodeValue(nodeCurrOperand.textContent, 0);

const keyDecimal = nodeKeyboard.querySelector(".key-decimal");
keyDecimal.onclick = () => nodeCurrOperand.textContent = insertNumberIntoNode(nodeCurrOperand, ".");

const keySign = nodeKeyboard.querySelector(".key-sign");
keySign.onclick = () => nodeCurrOperand.textContent = multiplyValue(nodeCurrOperand.textContent, -1, currDecimalPlaces);

document.addEventListener("keydown", (e) => {
    // console.log(e);

    switch (e.key) {
        case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
            nodeCurrOperand.textContent = insertNumberIntoNode(nodeCurrOperand, e.key); 
            break;
        case "c": case "Backspace":
            [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = clearScreen(nodeCurrOperand, nodePrevOperand, nodeOperator); 
            break;
        case "S":
            nodeCurrOperand.textContent = sqrtValue(nodeCurrOperand.textContent, currDecimalPlaces); 
            break;
        case "p":
            nodeCurrOperand.textContent = divideValue(nodeCurrOperand.textContent, 100, currDecimalPlaces); 
            break;
        case "r":
            nodeCurrOperand.textContent = recipNodeValue(nodeCurrOperand);
            break;
        case "/":
            [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "/"); 
            break;
        case "*":
            [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "*"); 
            break;
        case "-":
            [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "-"); 
            break;
        case "+":
            [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "+"); 
            break;
        case "=":
            [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent, newHistoryEquation] = completeOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, currDecimalPlaces); 
            if (newHistoryEquation !== "") {
                nodeHistory.insertBefore(getNewHistoryChild(newHistoryEquation), nodeHistory.firstChild);
            }
            break;
        case "E":
            nodeCurrOperand.textContent = insertNumberIntoNode(nodeCurrOperand, String(Math.E), true, currDecimalPlaces); 
            break;
        case "P":
            nodeCurrOperand.textContent = insertNumberIntoNode(nodeCurrOperand, String(Math.PI), true, currDecimalPlaces); 
            break;
        case "^":
            [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "^");
            break;
        case ".":
            nodeCurrOperand.textContent = insertNumberIntoNode(nodeCurrOperand, ".");
            break;
        case "s":
            nodeCurrOperand.textContent = multiplyValue(nodeCurrOperand.textContent, -1, currDecimalPlaces);
            break;
        
        // debug
        case "D":
            console.log(`nodeCurrOperand: ${nodeCurrOperand.textContent}, nodePrevOperand: ${nodePrevOperand.textContent}, nodeOperator: ${nodeOperator.textContent},`);
            break;
    }
});

function insertNumberIntoNode(nodeCurrOperand, number, withClear = false, decimalPlaces = 0) {   
    let newTextContent = nodeCurrOperand.textContent;

    if (number === "." && newTextContent.length === 0) {
        return "0.";
    }

    if (number === "." && newTextContent.includes(number) || newTextContent.length === 1 && newTextContent[0] === "0" && number !== ".") {
        return newTextContent;
    } 

    if (withClear) {
        return roundNodeValue(number, decimalPlaces);
    }
    
    if (newTextContent.length < screenContentLengthLimit) {
        newTextContent += number;
    }
    return newTextContent;
}

function clearScreen(nodeCurrOperand, nodePrevOperand, nodeOperator) {
    let newTextContent = nodeCurrOperand.textContent;
    if (newTextContent.length === 0) {
        return newTextContent, "", "";
    }

    if (newTextContent.includes("Error") ||  newTextContent.includes("Infinity") || newTextContent.includes("NaN")) {
        return "", "", "";
    }

    let leftOffset = 1;
    if (newTextContent.length > 2 && newTextContent[newTextContent.length - 2] === "+") {
        leftOffset = 3;
    }

    return [newTextContent.substring(0, newTextContent.length - leftOffset), nodePrevOperand.textContent, nodeOperator.textContent];
}

function sqrtValue(value, currDecimalPlaces) {
    if (value.length === 0) {
        return value;
    }
    value = Math.sqrt(+value);

    return roundNodeValue(value, currDecimalPlaces);
}

function addValue(value, other, currDecimalPlaces) {
    if (value.length === 0) {
        return value;
    }
    value = (+value) + other;

    return roundNodeValue(value, currDecimalPlaces);
}

function subtractValue(value, other, currDecimalPlaces) {
    if (value.length === 0) {
        return value;
    }
    value = (+value) - other;

    return roundNodeValue(value, currDecimalPlaces);
}

function multiplyValue(value, other, currDecimalPlaces) {
    if (value.length === 0) {
        return value;
    }
    value = (+value) * other;

    return roundNodeValue(value, currDecimalPlaces);
}

function divideValue(value, other, decimalPlaces) {
    if (value.length === 0) {
        return value;
    }

    value = (+value) / other; 
    if (value === Infinity) {
        return "Error: can't divide by 0!";
    }
    return roundNodeValue(value, decimalPlaces);
}

function raiseValueToPower(value, other, decimalPlaces) {
    if (value.length === 0) {
        return value;
    }

    value = Math.pow(+value, other);
    return roundNodeValue(value, decimalPlaces);
}

function recipNodeValue(nodeCurrOperand) {
    let newTextContent = nodeCurrOperand.textContent;
    if (newTextContent.length === 0 || newTextContent === "0") {
        return newTextContent;
    }
    return 1 / newTextContent;
}

function enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, newOperator) {
    if (nodeCurrOperand.textContent.length === 0 || nodePrevOperand.textContent.length !== 0 ||
        nodeCurrOperand.textContent[nodeCurrOperand.textContent.length - 1] === "." ||
        nodeCurrOperand.textContent.includes("Error") ||  nodeCurrOperand.textContent.includes("Infinity") || nodeCurrOperand.textContent.includes("NaN")
    ) {
        return [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent];
    }

    return ["", nodeCurrOperand.textContent, newOperator];
}

function completeOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, currDecimalPlaces) {
    let newTextContent = nodeCurrOperand.textContent;
    if (newTextContent.length === 0 || nodePrevOperand.textContent.length === 0 ||
        newTextContent[newTextContent.length - 1] === "."
    ) {
        return [newTextContent, nodePrevOperand.textContent, nodeOperator.textContent, ""];
    }

    switch (nodeOperator.textContent) {
        case "+":
            newTextContent = addValue(nodePrevOperand.textContent, +newTextContent, currDecimalPlaces);
            break;
        case "-":
            newTextContent = subtractValue(nodePrevOperand.textContent, +newTextContent, currDecimalPlaces);
            break
        case "*":
            newTextContent = multiplyValue(nodePrevOperand.textContent, +newTextContent, currDecimalPlaces);
            break;
        case "/":
            newTextContent = divideValue(nodePrevOperand.textContent, +newTextContent, currDecimalPlaces);
            break;
        case "^":
            newTextContent = raiseValueToPower(nodePrevOperand.textContent, +newTextContent, currDecimalPlaces);
            break;
    }

    let resultEquation = getResultEquation(++operationNumber, nodePrevOperand.textContent, nodeCurrOperand.textContent, nodeOperator.textContent, newTextContent);

    return [newTextContent, "", "", resultEquation];
}

function changeCurrentDecimalPlaces(decimalPlacesLabel, newValue) {
    decimalPlacesLabel.textContent = newValue;
    return newValue;
}

function roundNodeValue(value, decimalPlaces) {
    let fixed = (+value).toFixed(decimalPlaces);
    if (!fixed.includes(".")) {
        return fixed;
    }

    let split = String(fixed).split("."); 
    if (split[1] == 0) {
        return split[0];
    }

    if (split[1].includes("e")) {
        let decimalApprox = split[1].substring(0, decimalPlaces);

        return split[0] + (decimalApprox != "" ? "." + decimalApprox : "") + "e" + split[1].split("e")[1];
    }
    return fixed;
}

function getResultEquation(operationNumber, prevOperand, currOperand, operator, result) {
    return `${operationNumber}: ${prevOperand} ${operator} ${currOperand} = ${result}`;
}

function getNewHistoryChild(equation) {
    let newElement = document.createElement("p");
    newElement.textContent = equation;
    newElement.style.border = `3px dashed ${getRandomColor()}`;
    return newElement;
}

function getRandomColor() {
    const rand = () => Math.floor(Math.random() * 256);
    return `rgb(${rand()}, ${rand()}, ${rand()})`;  
}