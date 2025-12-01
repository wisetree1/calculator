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

let withClear = false;
for (let numberBtn of nodeKeyboard.querySelectorAll(".number")) {
    numberBtn.onclick = () => [nodeCurrOperand.textContent, withClear] = insertNumberIntoNode(nodeCurrOperand, numberBtn.textContent, withClear);
}

const labelDecimalPlaces = nodeKeyboard.querySelector("#decimal-places-label");
const inputDecimalPlaces = nodeKeyboard.querySelector("#decimal-places-range");
let currDecimalPlaces = inputDecimalPlaces.value;
inputDecimalPlaces.oninput = (e) => currDecimalPlaces = changeCurrentDecimalPlaces(labelDecimalPlaces, e.target.value);

const keyCE = nodeKeyboard.querySelector(".key-CE");
keyCE.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent, withClear] = clearScreen(nodeCurrOperand, nodePrevOperand, nodeOperator);

const keySqrt = nodeKeyboard.querySelector(".key-sqrt");
keySqrt.onclick = () => [nodeCurrOperand.textContent, withClear] = sqrtValue(nodeCurrOperand.textContent, currDecimalPlaces);

const keyPercent = nodeKeyboard.querySelector(".key-percent");
keyPercent.onclick = () => [nodeCurrOperand.textContent, withClear] = divideValue(nodeCurrOperand.textContent, 100, currDecimalPlaces);

const keyRecip = nodeKeyboard.querySelector(".key-recip");
keyRecip.onclick = () => [nodeCurrOperand.textContent, withClear] = recipValue(nodeCurrOperand, currDecimalPlaces);

const keyDiv = nodeKeyboard.querySelector(".key-div");
keyDiv.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "/");

const keyMult = nodeKeyboard.querySelector(".key-mult");
keyMult.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "*");

const keySub = nodeKeyboard.querySelector(".key-sub");
keySub.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "-");

const keyAdd = nodeKeyboard.querySelector(".key-add");
keyAdd.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "+");

const keyEquals = nodeKeyboard.querySelector(".key-equals");
keyEquals.onclick = () => {
    [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent, newHistoryEquation, withClear] = completeOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, currDecimalPlaces);
    if (newHistoryEquation !== "") {
        nodeHistory.insertBefore(getNewHistoryChild(newHistoryEquation), nodeHistory.firstChild);
    }
};

const keyE = nodeKeyboard.querySelector(".key-e");
keyE.onclick = () => [nodeCurrOperand.textContent, withClear] = insertNumberIntoNode(nodeCurrOperand, String(Math.E), true, currDecimalPlaces);

const keyPi = nodeKeyboard.querySelector(".key-pi");
keyPi.onclick = () => [nodeCurrOperand.textContent, withClear] = insertNumberIntoNode(nodeCurrOperand, String(Math.PI), true, currDecimalPlaces);

const keyPow = nodeKeyboard.querySelector(".key-pow");
keyPow.onclick = () => [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "^");

const keyRound2 = nodeKeyboard.querySelector(".key-round2");
keyRound2.onclick = () => [nodeCurrOperand.textContent, withClear] = roundNodeValue(nodeCurrOperand.textContent, 2);

const keyRound0 = nodeKeyboard.querySelector(".key-round0");
keyRound0.onclick = () => [nodeCurrOperand.textContent, withClear] = roundNodeValue(nodeCurrOperand.textContent, 0);

const keyDecimal = nodeKeyboard.querySelector(".key-decimal");
keyDecimal.onclick = () => [nodeCurrOperand.textContent, withClear] = insertNumberIntoNode(nodeCurrOperand, ".", withClear);

const keySign = nodeKeyboard.querySelector(".key-sign");
keySign.onclick = () => [nodeCurrOperand.textContent, withClear] = multiplyValue(nodeCurrOperand.textContent, -1, currDecimalPlaces);

document.addEventListener("keydown", (e) => {
    // console.log(e);

    switch (e.key) {
        case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
            [nodeCurrOperand.textContent, withClear] = insertNumberIntoNode(nodeCurrOperand, e.key, withClear); 
            break;
        case "c": case "Backspace":
            [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent, withClear] = clearScreen(nodeCurrOperand, nodePrevOperand, nodeOperator); 
            break;
        case "S":
            [nodeCurrOperand.textContent, withClear] = sqrtValue(nodeCurrOperand.textContent, currDecimalPlaces); 
            break;
        case "p":
            [nodeCurrOperand.textContent, withClear] = divideValue(nodeCurrOperand.textContent, 100, currDecimalPlaces); 
            break;
        case "r":
            [nodeCurrOperand.textContent, withClear] = recipValue(nodeCurrOperand, currDecimalPlaces);
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
            [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent, newHistoryEquation, withClear] = completeOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, currDecimalPlaces); 
            if (newHistoryEquation !== "") {
                nodeHistory.insertBefore(getNewHistoryChild(newHistoryEquation), nodeHistory.firstChild);
            }
            break;
        case "E":
            [nodeCurrOperand.textContent, withClear] = insertNumberIntoNode(nodeCurrOperand, String(Math.E), true, currDecimalPlaces); 
            break;
        case "P":
            [nodeCurrOperand.textContent, withClear] = insertNumberIntoNode(nodeCurrOperand, String(Math.PI), true, currDecimalPlaces); 
            break;
        case "^":
            [nodeCurrOperand.textContent, nodePrevOperand.textContent, nodeOperator.textContent] = enterOperation(nodeCurrOperand, nodePrevOperand, nodeOperator, "^");
            break;
        case ".":
            [nodeCurrOperand.textContent, withClear] = insertNumberIntoNode(nodeCurrOperand, ".");
            break;
        case "s":
            [nodeCurrOperand.textContent, withClear] = multiplyValue(nodeCurrOperand.textContent, -1, currDecimalPlaces);
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
        return ["0.", false];
    }

    if (number === "." && newTextContent.includes(number) || newTextContent.length === 1 && newTextContent[0] === "0" && number !== ".") {
        return [newTextContent, false];
    } 

    if (withClear) {
        if (number == Math.E || number == Math.PI) {
            return [roundNodeValue(number, decimalPlaces)[0], false];
        }

        return [number, false];
    }
    
    if (newTextContent.length < screenContentLengthLimit) {
        newTextContent += number;
    }
    return [newTextContent, false];
}

function clearScreen(nodeCurrOperand, nodePrevOperand, nodeOperator) {
    let newTextContent = nodeCurrOperand.textContent;
    if (newTextContent.length === 0) {
        return [newTextContent, "", "", false];
    }

    if (newTextContent.includes("Error") || newTextContent.includes("Infinity") || newTextContent.includes("NaN")) {
        return ["", "", "", false];
    }

    let leftOffset = 1;
    if (newTextContent.length > 2 && newTextContent[newTextContent.length - 2] === "+") {
        leftOffset = 3;
    }

    return [newTextContent.substring(0, newTextContent.length - leftOffset), nodePrevOperand.textContent, nodeOperator.textContent, false];
}

function sqrtValue(value, currDecimalPlaces) {
    if (value.length === 0) {
        return [value, false];
    }
    if (+value < 0) {
        return ["Error: can't sqrt < 0", true];
    }

    value = Math.sqrt(+value);

    return [roundNodeValue(value, currDecimalPlaces)[0], false];
}

function addValue(value, other, currDecimalPlaces) {
    if (value.length === 0) {
        return value;
    }
    value = (+value) + other;

    return roundNodeValue(value, currDecimalPlaces)[0];
}

function subtractValue(value, other, currDecimalPlaces) {
    if (value.length === 0) {
        return value;
    }
    value = (+value) - other;

    return roundNodeValue(value, currDecimalPlaces)[0];
}

function multiplyValue(value, other, currDecimalPlaces) {
    if (value.length === 0) {
        return [value, false];
    }
    value = (+value) * other;

    return [roundNodeValue(value, currDecimalPlaces)[0], false];
}

function divideValue(value, other, decimalPlaces) {
    if (value.length === 0) {
        return [value, false];
    }

    value = (+value) / other; 
    if (value === Infinity) {
        return ["Error: can't divide by 0!", true];
    }
    return [roundNodeValue(value, decimalPlaces)[0], false];
}

function raiseValueToPower(value, other, decimalPlaces) {
    if (value.length === 0) {
        return value;
    }

    value = Math.pow(+value, other);
    console.log(value);
    return roundNodeValue(value, decimalPlaces)[0];
}

function recipValue(nodeCurrOperand, decimalPlaces) {
    let newTextContent = nodeCurrOperand.textContent;
    if (newTextContent.length === 0 || newTextContent === "0") {
        return [newTextContent, false];
    }
    return [roundNodeValue(1 / newTextContent, decimalPlaces)[0], false];
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
        return [newTextContent, nodePrevOperand.textContent, nodeOperator.textContent, "", false];
    }

    switch (nodeOperator.textContent) {
        case "+":
            newTextContent = addValue(nodePrevOperand.textContent, +newTextContent, currDecimalPlaces);
            break;
        case "-":
            newTextContent = subtractValue(nodePrevOperand.textContent, +newTextContent, currDecimalPlaces);
            break
        case "*":
            newTextContent = multiplyValue(nodePrevOperand.textContent, +newTextContent, currDecimalPlaces)[0];
            break;
        case "/":
            newTextContent = divideValue(nodePrevOperand.textContent, +newTextContent, currDecimalPlaces)[0];
            break;
        case "^":
            newTextContent = raiseValueToPower(nodePrevOperand.textContent, +newTextContent, currDecimalPlaces);
            break;
        default:
            newTextContent = "Error: Unreachable";
            break;
    }

    let resultEquation = getResultEquation(++operationNumber, nodePrevOperand.textContent, nodeCurrOperand.textContent, nodeOperator.textContent, newTextContent);

    return [newTextContent, "", "", resultEquation, true];
}

function changeCurrentDecimalPlaces(decimalPlacesLabel, newValue) {
    decimalPlacesLabel.textContent = newValue;
    return newValue;
}

function roundNodeValue(value, decimalPlaces) {
    let fixed = (+value).toFixed(decimalPlaces);
    if (!fixed.includes(".")) {
        return [fixed, false];
    }

    let split = String(fixed).split("."); 
    if (split[1] == 0) {
        return [split[0], false];
    }

    if (split[1].includes("e")) {
        let decimalApprox = split[1].substring(0, decimalPlaces);
        return [split[0] + (decimalApprox != "" ? "." + decimalApprox : "") + "e" + split[1].split("e")[1], false];
    }

    return [fixed, false];
}

function getResultEquation(operationNumber, prevOperand, currOperand, operator, result) {
    return `${operationNumber}: ${prevOperand} ${operator} ${currOperand} = ${result}`;
}

function getNewHistoryChild(equation) {
    let newElement = document.createElement("p");
    newElement.textContent = equation;
    newElement.style.border = `3px dashed ${getRandomColor()}`;
    newElement.style.padding = "5px";
    return newElement;
}

function getRandomColor() {
    const rand = () => Math.floor(Math.random() * 256);
    return `rgb(${rand()}, ${rand()}, ${rand()})`;  
}