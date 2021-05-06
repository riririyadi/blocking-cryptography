let count = 1;
let countEl = document.getElementById("count");
function plus() {
  if (count < 50) {
    count++;
    countEl.value = count;
  }
  return false;
}
function minus() {
  if (count > 1) {
    count--;
    countEl.value = count;
  }
  return false;
}

let matrix = [],
  i,
  k;

function encryptHandle() {
  let dataInput = document.getElementById("input-data").value;
  if (dataInput !== "") {
    const elements = document.getElementsByClassName("output-item");
    if (elements.length < 1) {
      const encryptBtn = document.getElementById("encrypt-btn");
      encryptBtn.classList.add("active");
      const encryptIcon = document.getElementById("encrypt-icon");
      encryptIcon.classList.add("active");
      listToMatrix(dataInput, count);
      encryptWithBlockingTechnique(matrix);
      createElementOutput(ciphertext);
      document.getElementById("input-data").value = "";
      ciphertext = undefined;
      dataInput = undefined;
      matrix = [];
    }
  }
  return false;
}

function listToMatrix(list, elementsPerSubArray) {
  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
}

let ciphertext = "";

function encryptWithBlockingTechnique(matrix) {
  let arrayMatrix = matrix[0].map((_, colIndex) =>
    matrix.map((row) => row[colIndex])
  );
  for (let i = 0; i < arrayMatrix.length; i++) {
    for (let j = 0; j < arrayMatrix[i].length; j++) {
      if (arrayMatrix[i][j] === undefined) {
        arrayMatrix[i][j] = "&nbsp;";
      }
    }
  }

  ciphertext = arrayMatrix.map((a) => a.join("")).join("");
  return ciphertext;
}

function createElementOutput(output) {
  const newData = document.getElementById("output-data");
  const newOutput = document.createElement("textarea");
  const newButton = document.createElement("button");
  const newLine = document.createElement("br");
  newLine.classList.add("new-line");
  newOutput.innerHTML = output;
  newOutput.classList.add("output-item");
  newButton.innerHTML = "Copy";
  newButton.classList.add("copy");
  newButton.setAttribute("onclick", "copyText()");
  newButton.setAttribute("type", "submit");
  newData.appendChild(newOutput);
  newData.appendChild(newLine);
  newData.appendChild(newButton);
}


function decryptHandle() {
  let dataCiphertext = document.getElementById("input-data").value;
  if (dataCiphertext !== "") {
    const elements = document.getElementsByClassName("output-item");
    if (elements.length < 1) {
      const decryptBtn = document.getElementById("decrypt-btn");
      decryptBtn.classList.add("active");
      const decryptIcon = document.getElementById("decrypt-icon");
      decryptIcon.classList.add("active");
      let elementsPerSubArraybaru = Math.ceil(dataCiphertext.length / count);
      listToMatrix(dataCiphertext, elementsPerSubArraybaru);
      decryptWithBlockingTechnique(matrix);
      createElementOutput(plaintext.trim());
      document.getElementById("input-data").value = "";
      plaintext = undefined;
      dataCiphertext = undefined;
      matrix = [];
    }
  }
  return false;
}

let plaintext = "";

function decryptWithBlockingTechnique(matrixBaru) {
  let arrayMatrixBaru = matrixBaru[0].map((_, colIndex) =>
    matrixBaru.map((row) => row[colIndex])
  );
  plaintext = arrayMatrixBaru.map((a) => a.join("")).join("");
  return plaintext;
}


function clearTextArea() {
  document.getElementById("input-data").value = "";
  const encryptIcon = document.getElementById("encrypt-icon");
  encryptIcon.classList.remove("active");
  const encryptBtn = document.getElementById("encrypt-btn");
  encryptBtn.classList.remove("active");
  const decryptIcon = document.getElementById("decrypt-icon");
  decryptIcon.classList.remove("active");
  const decryptBtn = document.getElementById("decrypt-btn");
  decryptBtn.classList.remove("active");
  const copyBtn = document.querySelector(".copy");
  copyBtn.classList.remove("active");
  const elements = document.getElementsByClassName("output-item");
  while (elements.length > 0) elements[0].remove();
  const btnElements = document.getElementsByClassName("copy");
  while (btnElements.length > 0) btnElements[0].remove();
  const newLineElements = document.getElementsByClassName("new-line");
  while (newLineElements.length > 0) newLineElements[0].remove();
  ciphertext = "";
  plaintext = "";
  matrix = [];
}

function copyText() {
  let copyText = document.querySelector(".output-item");
  const btnElements = document.querySelector(".copy");
  btnElements.classList.add("active");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  btnElements.innerHTML = "Copied!";
}
