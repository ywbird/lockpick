"use strict";
var resetBtn = document.createElement("button");
resetBtn.className = "reset";
resetBtn.innerText = "reset";
var remainTxt = document.createElement("span");
remainTxt.innerText = "press remain: 3";
var tryTxt = document.createElement("div");
tryTxt.className = "try";
// tryTxt.innerText = `try remain: 3`;
for (var i = 0; i < 3; i++) {
    var a = document.createElement("span");
    a.className = "tryLight remain";
    tryTxt.appendChild(a);
}
var submitBtn = document.createElement("button");
submitBtn.className = "submit";
submitBtn.disabled = true;
// submitBtn.innerText = "submit";
var lockpad = document.createElement("div");
lockpad.className = "lockpad";
var container = document.querySelector(".container");
var lockRing = document.querySelector(".lockRing");
var lockRingBottomA = document.querySelector(".lockRingBottom.a");
var lockRingBottomB = document.querySelector(".lockRingBottom.b");
//functions
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function newLockValue() {
    var lockValue = [];
    for (var i = 0; i < 5; i++) {
        lockValue.push(getRandomNumber(1, 5));
    }
    return lockValue;
}
function setRemainTxt(number) {
    remainTxt.innerText = "use remain: ".concat(number);
}
function setTryTxt(number) {
    tryCount = number;
    // tryTxt.innerText = `try remain: ${number}`;
    tryTxt.innerHTML = "";
    for (var i = 0; i < tryCount; i++) {
        var a = document.createElement("span");
        a.className = "tryLight remain";
        tryTxt.appendChild(a);
    }
    for (var i = 0; i < 3 - tryCount; i++) {
        var a = document.createElement("span");
        a.className = "tryLight used";
        tryTxt.appendChild(a);
    }
}
function resetBtns() {
    var btns = document.querySelectorAll(".lockBtn");
    btns.forEach(function (el) {
        el.classList.remove("wrong");
        el.classList.remove("right");
        el.classList.add("default");
    });
}
function resetAll() {
    lockValue = newLockValue();
    lockPickUseRemain = 5;
    // setRemainTxt(lockPickUseRemain);
    resetBtns();
    console.log(lockValue);
    result = [];
    setTryTxt(3);
}
var lockPickUseRemain = 5;
var lockValue = newLockValue();
var result = [];
var tryCount = 3;
resetBtn === null || resetBtn === void 0 ? void 0 : resetBtn.addEventListener("click", resetAll);
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", function () {
    if (result.length < 5)
        return;
    if (tryCount <= 0) {
        resetAll();
    }
    if (result.indexOf(false) === -1 && result.length === 5) {
        console.log("Click!");
        lockRing === null || lockRing === void 0 ? void 0 : lockRing.classList.add("unlocked");
        lockRingBottomA === null || lockRingBottomA === void 0 ? void 0 : lockRingBottomA.classList.add("unlocked");
        lockRingBottomB === null || lockRingBottomB === void 0 ? void 0 : lockRingBottomB.classList.add("unlocked");
    }
    else {
        setTryTxt(tryCount - 1);
    }
    if (lockPickUseRemain === 0) {
        resetBtns();
        lockPickUseRemain = 5;
        submitBtn.disabled = true;
        // setRemainTxt(lockPickUseRemain);
        result = [];
    }
    if (tryCount === 0) {
        resetAll();
    }
});
function btnClick(ev) {
    var _a;
    if (lockPickUseRemain === 0)
        return;
    if (this.classList.contains("wrong") || this.classList.contains("right"))
        return;
    var value = (_a = this.getAttribute("value")) === null || _a === void 0 ? void 0 : _a.split("-").map(function (s) { return parseInt(s); });
    if (value && lockValue[value[0]] === value[1] + 1) {
        console.log("Successed!");
        this.classList.remove("default");
        this.classList.add("right");
        result.push(true);
    }
    else {
        console.log("Failed!");
        this.classList.remove("default");
        this.classList.add("wrong");
        result.push(false);
    }
    lockPickUseRemain--;
    if (lockPickUseRemain !== 0) {
        submitBtn.disabled = true;
    }
    else if (lockPickUseRemain === 0) {
        submitBtn.disabled = false;
    }
    // setRemainTxt(lockPickUseRemain);
    console.log(result);
    console.log(value);
}
for (var i = 0; i < 5; i++) {
    var b = document.createElement("div");
    b.className = "lockBtnColumn";
    for (var j = 0; j < 5; j++) {
        var a = document.createElement("div");
        a.classList.add("lockBtn");
        a.classList.add("default");
        a.setAttribute("value", "".concat(i, "-").concat(j));
        a.addEventListener("click", btnClick);
        b.appendChild(a);
    }
    lockpad.appendChild(b);
}
document.body.appendChild(resetBtn);
container === null || container === void 0 ? void 0 : container.appendChild(tryTxt);
container === null || container === void 0 ? void 0 : container.appendChild(lockpad);
container === null || container === void 0 ? void 0 : container.appendChild(submitBtn);
