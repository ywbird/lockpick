const resetBtn: HTMLButtonElement = document.createElement("button");
resetBtn.className = "reset";
resetBtn.innerText = "reset";
const remainTxt: HTMLSpanElement = document.createElement("span");
remainTxt.innerText = `press remain: 3`;
const tryTxt: HTMLDivElement = document.createElement("div");
tryTxt.className = "try";
// tryTxt.innerText = `try remain: 3`;
for (let i: number = 0; i < 3; i++) {
  const a: HTMLSpanElement = document.createElement("span");
  a.className = "tryLight remain";
  tryTxt.appendChild(a);
}
const submitBtn: HTMLButtonElement = document.createElement("button");
submitBtn.className = "submit";
submitBtn.disabled = true;
// submitBtn.innerText = "submit";
const lockpad: HTMLDivElement = document.createElement("div");
lockpad.className = "lockpad";
const container: HTMLDivElement | null = document.querySelector(".container");
const lockRing: HTMLDivElement | null = document.querySelector(".lockRing");
const lockRingBottomA: HTMLDivElement | null =
  document.querySelector(".lockRingBottom.a");
const lockRingBottomB: HTMLDivElement | null =
  document.querySelector(".lockRingBottom.b");

//functions
function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function newLockValue() {
  const lockValue: number[] = [];
  for (let i: number = 0; i < 5; i++) {
    lockValue.push(getRandomNumber(1, 5));
  }
  return lockValue;
}
function setRemainTxt(number: number) {
  remainTxt.innerText = `use remain: ${number}`;
}
function setTryTxt(number: number) {
  tryCount = number;
  // tryTxt.innerText = `try remain: ${number}`;
  tryTxt.innerHTML = "";
  for (let i: number = 0; i < tryCount; i++) {
    const a: HTMLSpanElement = document.createElement("span");
    a.className = "tryLight remain";
    tryTxt.appendChild(a);
  }
  for (let i: number = 0; i < 3 - tryCount; i++) {
    const a: HTMLSpanElement = document.createElement("span");
    a.className = "tryLight used";
    tryTxt.appendChild(a);
  }
}
function resetBtns() {
  const btns = document.querySelectorAll(".lockBtn");
  btns.forEach((el) => {
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

let lockPickUseRemain: number = 5;
let lockValue: number[] = newLockValue();
let result: boolean[] = [];
let tryCount: number = 3;

resetBtn?.addEventListener("click", resetAll);

submitBtn?.addEventListener("click", () => {
  if (result.length < 5) return;
  if (tryCount <= 0) {
    resetAll();
  }
  if (result.indexOf(false) === -1 && result.length === 5) {
    console.log("Click!");
    lockRing?.classList.add("unlocked");
    lockRingBottomA?.classList.add("unlocked");
    lockRingBottomB?.classList.add("unlocked");
  } else {
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

function btnClick(this: HTMLElement, ev: Event) {
  if (lockPickUseRemain === 0) return;
  if (this.classList.contains("wrong") || this.classList.contains("right"))
    return;
  const value = this.getAttribute("value")
    ?.split("-")
    .map((s) => parseInt(s));
  if (value && lockValue[value[0]] === value[1] + 1) {
    console.log("Successed!");
    this.classList.remove("default");
    this.classList.add("right");
    result.push(true);
  } else {
    console.log("Failed!");
    this.classList.remove("default");
    this.classList.add("wrong");
    result.push(false);
  }
  lockPickUseRemain--;
  if (lockPickUseRemain !== 0) {
    submitBtn.disabled = true;
  } else if (lockPickUseRemain === 0) {
    submitBtn.disabled = false;
  }
  // setRemainTxt(lockPickUseRemain);

  console.log(result);
  console.log(value);
}

for (let i: number = 0; i < 5; i++) {
  const b = document.createElement("div");
  b.className = "lockBtnColumn";
  for (let j: number = 0; j < 5; j++) {
    const a = document.createElement("div");
    a.classList.add("lockBtn");
    a.classList.add("default");
    a.setAttribute("value", `${i}-${j}`);
    a.addEventListener("click", btnClick);
    b.appendChild(a);
  }
  lockpad.appendChild(b);
}

document.body.appendChild(resetBtn);
container?.appendChild(tryTxt);
container?.appendChild(lockpad);
container?.appendChild(submitBtn);
