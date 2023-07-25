/*Color:
-yellow: #EEDF2C
-blue: #0d6efd
-green: #36DE7D rgba(0, 255, 42, 0.7)
-pink: #FF69B4  rgba(255, 105, 180, 1)*/
//set a random number for input add a number

document
  .getElementById("getNumber")
  .setAttribute("value", Math.floor(Math.random() * 30) + 1);

var formNum = document.forms["frm-add-number"];
var number = formNum.getNumber;
var formString = document.forms["frm-add-string"];
var input = formString.getString;
var board = document.getElementById("board");
var maxChild = 10;
var arrayNum = [];
var speed = 2;
var partnerHeight = 400;
var pause = false;
//responsive in screen'mobile phone
var swidth = $(window).width();
if (swidth < 576) {
  partnerHeight = 200;
  maxChild = 6;
  document.getElementById("prestep").innerHTML = "<i class=\"d-xl-none fa fa-solid fa-arrow-left\"></i>";
  document.getElementById("nextstep").innerHTML = "<i class=\"d-xl-none fa fa-solid fa-arrow-right\"></i>";
}

//Init 10 random collumn
function init() {
  for (v = 1; v <= maxChild; v++) {
    var mem = Math.floor(Math.random() * 30) + 1;
    arrayNum[v] = mem;
    var initcol = createBubble(mem);
    board.appendChild(initcol);
  }
}

//Call function Init
init();
//Add a number
function addNumber() {
  if (board.childElementCount++ >= maxChild) {
    document.getElementById("warning1").innerText =
      "You can't have more than " + maxChild + " elements";
    setTimeout(()=>{document.getElementById("warning1").innerText = "";},3000);
    return false;
  }
  arrayNum[arrayNum.length] = Number(number.value);
  var box = createBubble(number.value);
  board.appendChild(box);
  return false;
}

//Add a number string

function check(data) {
  for (i = 0; i < data.length; i++) {
    if (data[i] > 30) return false;
  }
  return true;
}

function checkFormat(data) {
  var format = /^\d+(\,\d+)*$/;
  if (input.value.length == 0) {
    document.getElementById("warning2").innerText = "Please fill in the value";
    setTimeout(()=>{document.getElementById("warning2").innerText = "";},3000);
    return false;
  } else if (!format.test(input.value)) {
    document.getElementById("warning2").innerText = "Input is not valid";
    setTimeout(()=>{document.getElementById("warning2").innerText = "";},3000);
    return false;
  } else if (!check(data)) {
    document.getElementById("warning2").innerText = "There is one or more numbers greater than 30";
    setTimeout(()=>{document.getElementById("warning2").innerText = "";},3000);
    return false;
  } else {
    document.getElementById("warning2").innerText = "";
    return true;
  }
}

//Add a string number
function addString() {
  var numString = input.value.split(",");
  if (!checkFormat(numString)) return false;
  var board = document.getElementById("board");
  var i = 0;
  while (board.childElementCount < maxChild && i < numString.length) {
    arrayNum[arrayNum.length] = Number(numString[i]);
    var box = createBubble(numString[i]);
    board.appendChild(box);
    i++;
  }
  if (i < numString.length)
    document.getElementById("warning2").innerText =
      "You can't have more than " + maxChild + " elements";
      setTimeout(()=>{document.getElementById("warning2").innerText = "";},3000);
  return false;
}

var num1 = [];
var indexNum1 = [];
var num2 = [];
var indexNum2 = [];
var swapped = [];
var step = 0;
function bubbleSort(arrayNum) {
  var haveSwap = true;
  for (i = 0; i < arrayNum.length - 2; i++) {
    for (j = 1; j < arrayNum.length - i - 1; j++) {
      var change = false;
      num1[step] = arrayNum[j];
      indexNum1[step] = j;
      if (arrayNum[j] >= arrayNum[j + 1]) {
        num2[step] = arrayNum[j + 1];
        indexNum2[step] = j + 1;
        var temp = arrayNum[j];
        arrayNum[j] = arrayNum[j + 1];
        arrayNum[j + 1] = temp;
        change = true;
      } else {
        num2[step] = arrayNum[j + 1];
        indexNum2[step] = j + 1;
      }
      swapped[step] = change;
      step++;
    }
  }
}

var k = 0;
function swap(index1, index2) {
  var bubble1 = document.getElementById("bubble" + index1);
  var text1 = bubble1.lastChild;
  var bubble2 = document.getElementById("bubble" + index2);
  var text2 = bubble2.lastChild;
  var temp = text1.innerText;
  text1.innerText = text2.innerText;
  text2.innerText = temp;
  moveUp(index1);
}

function sorting(k, next) {
  if (next == -1) k -= 2;
  if (k <= step) {
    if (swapped[k] == true) swap(indexNum1[k], indexNum2[k]);
  }
  if (next == -1) k += 2;
}


function executeAStep(k, next) {
  //Caculate the percentage of execution
  percent(k / step);
  //Compare num1[k] and num2[k] then set a comfortable description
  if (num1[k] > num2[k]) {
    setDescription("Step " + (k + 1) + ": Bubble " + num1[k] + " is greater than bubble " + num2[k] 
      + ", swap them and " + num2[k] + " floating.");
  } else if (num1[k] < num2[k]) {
    setDescription("Step " + (k + 1) + ": Bubble " + num1[k] + " is not greater than bubble " + num2[k] 
      + ", cannot swap and " + num1[k] + " floating.");
  } else {
    setDescription("Step " + (k + 1) + ": Bubble " + num1[k] + " is equal to bubble " + num2[k] 
      + ", " + num1[k] + " floating.");
  }
  //Set color for 2 bubbles in the comparison
  setColorBubble(indexNum1[k], "rgba(0, 255, 42, 0.7)");
  document.getElementById("bubble" + indexNum1[k]).lastChild.style.color = "#98FF98";
  setColorBubble(indexNum2[k], "rgba(255, 105, 180, 1)");
  document.getElementById("bubble" + indexNum2[k]).lastChild.style.color = "#F9D2D3";
  //Set color for code lines in algorithm
  if (indexNum1[k] == 1) {
    setColorCode(1, "#36DE7D");
    setTimeout(setColorCode, speed * 100, 1, "white");
    setTimeout(setColorCode, speed * 100, 2, "#36DE7D");
    setTimeout(setColorCode, speed * 200, 2, "white");
  } else {
    setColorCode(2, "#36DE7D");
    setTimeout(setColorCode, speed * 100, 2, "white");
  }
  if (swapped[k] == true) {
    setTimeout(setColorCode, speed * 300, 3, "#36DE7D");
    setTimeout(setColorCode, speed * 400, 3, "white");
    setTimeout(setColorCode, speed * 400, 4, "#36DE7D");
    setTimeout(setColorCode, speed * 1000, 4, "white");
    //Call sorting method to check and swap 2 numbers
    setTimeout(sorting, 1000, k, next);
    setTimeout(setColorBubble, speed * 1000, indexNum1[k], "rgba(255,255,255, 0.5)");
    setTimeout(setColorBubble, speed * 1000, indexNum2[k], "rgba(255,255,255, 0.5)");
  } else {
    //Call the "Moveup" method to move the bubble on the left to the "surface".
    if (num1[k] != num2[k]) moveUp(indexNum1[k]);
    setTimeout(setColorCode, speed * 500, 3, "#DE364F");
    setTimeout(setColorCode, speed * 600, 3, "white");
    setTimeout(setColorBubble, speed * 1000, indexNum1[k], "rgba(255,255,255, 0.5)");
    setTimeout(setColorBubble, speed * 1000, indexNum2[k], "rgba(255,255,255, 0.5)");
  }
  setTimeout(() => {
    document.getElementById("bubble" + indexNum1[k]).lastChild.style.color = "#FFD6FF";
    document.getElementById("bubble" + indexNum2[k]).lastChild.style.color = "#FFD6FF";
  }, speed * 1000);
}

//Function execute automatically all step of bubble sort
var process;
var maxRangeSort = arrayNum.length - 1;
var counterRange = 1;
function executeAllStep(executeFirstStep) {
  //Variable executeFirstStep=1 when it's called by pause button and 0 by sort or speed button
  if (executeFirstStep) {
    executeAStep(k, 0);
    k++;
  }
  //call executeAStep method to execute k step then increase k to 1 and repeat by setInterval
  process = setInterval(() => {
    if (pause == false) {
      //if the current step is not greater than the number of step of the algorithm
      if (k <= step) {
        executeAStep(k, 0);
        k++;
        setTimeout(() => {
          if (++counterRange == maxRangeSort - 1) {
            counterRange = 0;
            maxRangeSort--;
            var arr = [];
            for (i = 1; i <= board.childElementCount; i++)
              arr[i] = Number(document.getElementById("bubble" + i).lastChild.innerText);
            //Create a new row in data table
            createRowTable(arr);
          }
        }, speed * 1000);
      } 
      //if the current step is greater than the maximum step, we can infer to it's over
      else {
        setTimeout(setColorCode, 0, 7, "#36DE7D");
        setTimeout(setColorCode, speed * 500, 7, "white");
        setTimeout(() => {
          document.getElementById("sorting").disabled = true;
          document.getElementById("random").disabled = false;
          document.getElementById("clearing").disabled = false;
          setTimeout(setDescription, speed * 250, "Array sorted in ascending order after " 
          + (step + 1) + (step == 0 || step == 1 ? " step." : " steps."));
          clearInterval(process);
        }, speed * 300);
      }
    } else {
      setColorBubble(indexNum1[k], "rgba(0, 255, 42, 0.7)");
      setColorBubble(indexNum2[k], "rgba(255, 105, 180, 1)");
    }
  }, speed * 1500);
  return false;
}

//Install function for "sort" button
document.getElementById("sorting").onclick = () => {
  pause=false;
  if(k == 0){
    createHeadLineTable();
    createRowTable(arrayNum);
    maxRangeSort = arrayNum.length - 1;
    step=0;
    bubbleSort(arrayNum);
    step--;
  }
  document.getElementById("sorting").disabled = true;
  document.getElementById("random").disabled = true;
  document.getElementById("prestep").disabled = false;
  document.getElementById("clearing").disabled = true;
  document.getElementById("paucon").disabled = false;
  document.getElementById("paucon").innerText = "Pause";
  counter = 0;
  executeAllStep(1);
};

//Install function for "previous" button
if (k == 0) document.getElementById("prestep").disabled = true;
document.getElementById("prestep").onclick = () => {
  clearInterval(process);
  document.getElementById("paucon").innerText = "Continue";
  counter = 1;
  pause = true;
  k--;
  counterRange--;
  console.log(counterRange);
  if(counterRange == 0) {
    maxRangeSort++;
    if(maxRangeSort > arrayNum.length) maxRangeSort--;
    counterRange = maxRangeSort-1;
    var datatable = document.getElementById("data-table");
    datatable.removeChild(datatable.lastChild);
    timesLoop--;
  }
  percent(k/step);
  pause = true;
  var oldHeight = document.getElementById("partner" + indexNum1[k]).style.height;
  var newHeight = (Number(oldHeight.substring(0, oldHeight.indexOf("px"))) + 40) + "px";
  document.getElementById("partner" + indexNum1[k]).style.height = newHeight;
  if(swapped[k] == true){
    var bubble1 = document.getElementById("bubble" + indexNum1[k]);
    var text1 = bubble1.lastChild;
    var bubble2 = document.getElementById("bubble" + indexNum2[k]);
    var text2 = bubble2.lastChild;
    var temp = text1.innerText;
    text1.innerText = text2.innerText;
    text2.innerText = temp;
  }
  if(k == 0) setDescription("");
  else if (num1[k] > num2[k]) {
    setDescription("Step " + (k) + ": Bubble " + num1[k] + " is greater than bubble " + num2[k] 
      + ", swap them and " + num2[k] + " floating.");
  } else if (num1[k] < num2[k]) {
    setDescription("Step " + (k) + ": Bubble " + num1[k] + " is not greater than bubble " + num2[k] 
      + ", cannot swap and " + num1[k] + " floating.");
  } else {
    setDescription("Step " + (k) + ": Bubble " + num1[k] + " is equal to bubble " + num2[k] 
      + ", " + num1[k] + " floating.");
  }
  if (k == 0) {
    document.getElementById("prestep").disabled = true;
    document.getElementById("sorting").disabled = false;
    document.getElementById("random").disabled = false;
    document.getElementById("clearing").disabled = false;
  }
};

//Install function for "next" button
document.getElementById("nextstep").onclick = () => {
  clearInterval(process);
  counterRange++;
  if (counterRange == maxRangeSort) {
    counterRange = 0;
    console.log(counterRange);
    maxRangeSort--;
    var arr = [];
    for (i = 1; i <= board.childElementCount; i++)
      arr[i] = Number(document.getElementById("bubble" + i).lastChild.innerText);
    //Create a new row in data table
    createRowTable(arr);
  }
  if (k == step) document.getElementById("nextstep").disabled = true;
  executeAStep(k, 1);
  k++;
  document.getElementById("prestep").disabled = false;
};

//Install function for "pause" and "continue" button
document.getElementById("paucon").disabled = true;
var counter = 0;
document.getElementById("paucon").onclick = () => {
  if (counter == 0) {
    //pause sorting
    pause = true;
    document.getElementById("paucon").innerHTML = "Continue";
    counter++;
    clearInterval(process);
    document.getElementById("sorting").disabled = false;
    document.getElementById("random").disabled = false;
    document.getElementById("clearing").disabled = false;
  } else {
    //continue sorting
    pause = false;
    document.getElementById("sorting").disabled = true;
    document.getElementById("random").disabled = true;
    document.getElementById("clearing").disabled = true;
    document.getElementById("paucon").innerHTML = "Pause";
    counter--;
    executeAllStep(0);
  }
};

//Install function for "Random" button
document.getElementById("random").onclick = () => {
  percent(0);
  //reset status of pause button
  document.getElementById("paucon").disabled = true;
  document.getElementById("sorting").disabled = false;
  document.getElementById("paucon").innerText = "Pause";
  counter = 0;
  //Delete description
  setDescription("");
  //delete all col
  while (board.firstChild) {
    board.removeChild(board.lastChild);
  }
  //reset index to count
  k = 0;
  step = 0;
  timesLoop = 0;
  arrrayNum = [];
  init();
  //clear datatable
  var table = document.getElementById("data-table");
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
  //sort array
  bubbleSort(arrayNum);
};

//Install function for "clear" button
document.getElementById("clearing").onclick = () => {
  percent(0);
  //clear data table
  var table = document.getElementById("data-table");
  while (table.firstChild) {
    table.removeChild(table.lastChild);
  }
  document.getElementById("paucon").disabled = true;
  document.getElementById("sorting").disabled = false;
  //reset status of pause button
  document.getElementById("paucon").innerText = "Pause";
  //Delete description
  setDescription("");
  while (board.firstChild) board.removeChild(board.lastChild);
  arrayNum.length = 1; k = 0; step = 0; counter = 0;
};

//Install function for "import" button
document.getElementById("importing").onclick = () => {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.accept = ".txt"; // Include both the file extension and the mime type
  inputElement.addEventListener("change", (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      var numString = reader.result.split(",");
      var format = /^\d+(\,\d+)*$/;
      if (format.test(numString)) {
        var i = 0;
        while (board.childElementCount < maxChild && i < numString.length) {
          arrayNum[arrayNum.length] = Number(numString[i]);
          var box = createBubble(numString[i]);
          board.appendChild(box);
          i++;
        }
        if (i < numString.length) {
          document.getElementById("warning4").innerText = "You can't have more than " + maxChild + " elements";
          setTimeout(()=>{document.getElementById("warning4").innerText = "";}, 2000);
        }
      } else {
        document.getElementById("warning4").innerText = "The content of the imported file is incorrect.";
        setTimeout(()=>{document.getElementById("warning4").innerText = "";}, 2000);
      }
    };
  });
  inputElement.dispatchEvent(new MouseEvent("click"));
};

document.getElementById("Half").style.background = "gray";
document.getElementById("Half").style.border = "gray";
document.getElementById("OneHundred").style.background = "#0dcaf0";
document.getElementById("OneHundred").style.border = "#0dcaf0";
document.getElementById("TwoHundred").style.background = "gray";
document.getElementById("TwoHundred").style.border = "gray";
//Install fuction for buttons in "speed"
document.getElementById("Half").onclick = () => {
  document.getElementById("Half").style.background = "#0dcaf0";
  document.getElementById("Half").style.border = "#0dcaf0";
  document.getElementById("OneHundred").style.background = "gray";
  document.getElementById("OneHundred").style.border = "gray";
  document.getElementById("TwoHundred").style.background = "gray";
  document.getElementById("TwoHundred").style.border = "gray";
  clearInterval(process);
  speed = 4;
  if(k!=0) executeAllStep(0);
};
document.getElementById("OneHundred").onclick = () => {
  document.getElementById("Half").style.background = "gray";
  document.getElementById("Half").style.border = "gray";
  document.getElementById("OneHundred").style.background = "#0dcaf0";
  document.getElementById("OneHundred").style.border = "#0dcaf0";
  document.getElementById("TwoHundred").style.background = "gray";
  document.getElementById("TwoHundred").style.border = "gray";
  clearInterval(process);
  speed = 2;
  if(k!=0) executeAllStep(0);
};
document.getElementById("TwoHundred").onclick = () => {
  document.getElementById("Half").style.background = "gray";
  document.getElementById("Half").style.border = "gray";
  document.getElementById("OneHundred").style.background = "gray";
  document.getElementById("OneHundred").style.border = "gray";
  document.getElementById("TwoHundred").style.background = "#0dcaf0";
  document.getElementById("TwoHundred").style.border = "#0dcaf0";
  clearInterval(process);
  speed = 1;
  if(k!=0) executeAllStep(0);
};
//Other functions
function setColorBubble(id, color) {
  document.getElementById("bubble" + id).style.boxShadow = "inset 0 0 5px " + color;
}
function setDescription(text) {
  document.getElementById("contentWrapper").innerText = text;
}
function setColorCode(id, color) {
  document.getElementById("code" + id).style.background = color;
}
//Create data table
function createHeadLineTable() {
  var table = document.getElementById("data-table");
  var tr = document.createElement("tr");
  tr.style.backgroundColor = "#5e9efd";
  var td;
  for (i = 0; i <= board.childElementCount; i++) {
    td = document.createElement("td");
    if (i == 0) td.innerText = "Loop";
    else {
      td.innerText = "A[" + i + "]";
    }
    tr.appendChild(td);
  }
  table.appendChild(tr);
}
var timesLoop = 0;
function createRowTable(tempArray) {
  var table = document.getElementById("data-table");
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  td.style.fontWeight = "1000";
  td.style.backgroundColor = "#5e9efd";
  td.innerHTML = timesLoop++;
  tr.appendChild(td);
  for (i = 1; i < tempArray.length; i++) {
    var td = document.createElement("td");
    td.innerText = tempArray[i];
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

//Set event for table button
var turnOn = true;
var buttonTable = document.getElementById("swap-button");
var icon = document.getElementById("icon");
var wrapperChild = document.getElementById("slider");
buttonTable.onclick = () => {
  if (turnOn) {
    buttonTable.style.transform = "rotateY(180deg)";
    buttonTable.style.transition = "1s transform";
    wrapperChild.style.transform = "translateX(0%)";
    wrapperChild.style.transition = "1s transform";
    setTimeout(() => {
      icon.setAttribute("class", "fa fa-close");
    }, 300);
    turnOn = false;
  } else {
    buttonTable.style.transform = "rotateY(0deg)";
    buttonTable.style.transition = "1s transform";
    wrapperChild.style.transform = "translateX(110%)";
    wrapperChild.style.transition = "1s transform";
    setTimeout(() => {
      icon.setAttribute("class", "fa fa-table");
    }, 300);
    turnOn = true;
  }
};

//Code for bubble
function createBubble(num) {
  //Tạo ra thẻ frame
  var frame = document.createElement("div");
  frame.setAttribute("id", "frame" + (board.childElementCount + 1));
  frame.setAttribute("class", "position-relative");
  frame.style.marginRight = "20px";
  //Tạo ra thẻ partner
  var partner = document.createElement("div");
  partner.setAttribute("id", "partner" + (board.childElementCount + 1));
  partner.style.height = partnerHeight + "px";
  //Tạo ra thẻ bubble
  var bubble = document.createElement("div");
  bubble.setAttribute("class", "bubble");
  bubble.setAttribute("id", "bubble" + (board.childElementCount + 1));
  for (i = 1; i <= 5; i++) {
    var span = document.createElement("span");
    bubble.appendChild(span);
  }
  //Đặt num là văn bản của bubble
  var p = document.createElement("p");
  p.innerText = num;
  bubble.appendChild(p);
  //Tạo thẻ section
  var section = document.createElement("section");
  section.setAttribute("id", "section" + (board.childElementCount + 1));
  section.setAttribute("class", "section mt-1 d-flex justify-content-center");
  section.style.height = "150px";
  //Thêm các thẻ bubble, partner và section và frame
  frame.appendChild(partner);
  frame.appendChild(bubble);
  frame.appendChild(section);
  return frame;
}

function moveUp(id) {
  var partner = document.getElementById("partner" + id);
  var heightP = partner.style.height;
  var index = heightP.indexOf("px");
  var num = heightP.substring(0, index);
  var goal = num - 40;
  const mini = setInterval(MiniBubble, 50, id);
  const moveonAnimate = setInterval(() => {
    if (num > goal) {
      partner.style.height = num-- + "px";
    } else {
      clearInterval(moveonAnimate);
      clearInterval(mini);
    }
  }, 10);
}

function MiniBubble(id) {
  const section = document.getElementById("section" + id);
  const createElement = document.createElement("span");
  var size = Math.random() * 10 + 5;

  createElement.style.width = size + "px";
  createElement.style.height = size + "px";
  createElement.style.left = size + "px";
  section.appendChild(createElement);
  setTimeout(() => {
    createElement.remove();
  }, 1000);
}

function percent(value) {
  document.getElementById("percent").style.width = value * 100 + "%";
}

