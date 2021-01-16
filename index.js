// General Appearance
$("button").css("outline", "none");

$("#navbarContent").hide();
$(".navbar-toggler").click(function() {
  $("#navbarContent").slideToggle();
});

// Initial Variables
var stringSet = [];
var numString = "";
var memorySet = [];
var ms = 0;
var textHeight = parseInt($("#display h1").css("height"), 10);
var displayHeight = parseInt($("#display").css("height"), 10);
var int = 0;


// Click Buttons
$(document).keydown(function(e) {
  flash(e.key);
  if (e.key === "Enter" || e.keycode === 32) {
    e.preventDefault();
    if (isValid(stringSet)) {
      makeCalSet(stringSet);
      eliminateParantheses(stringSet);
      numString = eliminateLists(stringSet);
    } else {
      numString = "Syntax Error (Clear to continue)";
    }
    displayNumString(numString);
    stringSet = [numString];
  } else {
    if (stringSet.length === 1) {
      if (Number.isInteger(numString)) {
        if (Number.isInteger(Number(e.key)) || e.key === "(" || e.key === ")" || e.key === "Backspace") {
          numString = "";
          stringSet = [];
        } else {
          var tempArray = stringSet[0].toString().split("");
          stringSet.pop();
          for (var i = 0; i < tempArray.length; i++) {
            stringSet.push(tempArray[i]);
          }
          console.log(stringSet[0]);
        }
      }
    }
    stringSet.push(e.key);
    display();
  }
});

$("#main button").click(function() {
  flash($(this).val());
  if ($(this).val() === "Enter") {
    if (isValid(stringSet)) {
      makeCalSet(stringSet);
      eliminateParantheses(stringSet);
      numString = eliminateLists(stringSet);
    } else {
      numString = "Syntax Error (Clear to continue)";
    }
    displayNumString(numString);
    stringSet = [numString];
  } else if ($(this).val() === "mr") {
    var tempMS = ms.toString().split("");
    for (var i = 0; i < tempMS.length; i++) {
      stringSet.push(tempMS[i]);
      numString += tempMS[i];
    }
    console.log(numString);
    console.log(stringSet);
    displayNumString(numString);
  } else if ($(this).val() === "mc") {
    ms = 0;
  } else if ($(this).val() === "m") {
    memorySet = stringSet.slice(0);
    if (isValid(memorySet)) {
      makeCalSet(memorySet);
      eliminateParantheses(memorySet);
      ms += eliminateLists(memorySet);
    }
    console.log(ms);
  } else if ($(this).val() === "m-") {
    memorySet = stringSet.slice(0);
    if (isValid(memorySet)) {
      makeCalSet(memorySet);
      eliminateParantheses(memorySet);
      ms -= eliminateLists(memorySet);
    }
    console.log(ms);
  } else {
    if (stringSet.length === 1) {
      if (Number.isInteger(numString)) {
        if (Number.isInteger(Number($(this).val())) || $(this).val() === "(" || $(this).val() === ")" || $(this).val() === "del") {
          numString = "";
          stringSet = [];
        } else {
          var tempArray = stringSet[0].toString().split("");
          stringSet.pop();
          for (var i = 0; i < tempArray.length; i++) {
            stringSet.push(tempArray[i]);
          }
          console.log(stringSet[0]);
        }
      }
    }
    stringSet.push($(this).val());
    display();
  }
});

// Display Numbers
function display() {
  int = stringSet.length - 1;
  if (stringSet[int] == "Shift" || stringSet[int] == "Alt") {
    stringSet.pop();
  } else if (stringSet[int] === "Backspace" || stringSet[int] === "del") {
    numString = numString.slice(0, int - 1);
    stringSet = stringSet.slice(0, int - 1);
  } else if (stringSet[int] === "clear" || stringSet[int] === "Delete") {
    numString = "";
    stringSet = [];
  } else if (stringSet[int] === " ") {} else {
    numString += stringSet[int];
  }
  console.log(numString);
  console.log(stringSet);
  displayNumString(numString);
}

// Display numString
function displayNumString(string) {
  if (string === "") {
    $("#display h1").html("<em>Enter your calculation</em>");
    textHeight = parseInt($("#display h1").css("height"), 10);
    displayHeight = 75;
    $("#display").css("height", displayHeight + "px");
  } else {
    $("#display h1").text(string);
  }
  if (parseInt($("#display h1").css("height"), 10) > textHeight) {
    textHeight = parseInt($("#display h1").css("height"), 10);
    displayHeight += 48;
    $("#display").css("height", displayHeight + "px");
  } else if (parseInt($("#display h1").css("height"), 10) < textHeight) {
    textHeight = parseInt($("#display h1").css("height"), 10);
    displayHeight -= 48;
    $("#display").css("height", displayHeight + "px");
  }
}

// Check Valid
function isValid(list) {
  var paranthesisMap = new Map();
  for (var i = 0; i < list.length; i++) {
    if (list[i] !== "x" && list[i] !== "*" && list[i] !== "/" && list[i] !== "÷" && list[i] !== "+" && list[i] !== "-" && list[i] !== "(" && list[i] !== ")" &&
      list[i] !== "." && !(Number.isInteger(Number(list[i])))) {
      return false;
    }
    if (i === 0) {
      if (list[0] === "x" || list[0] === "*" || list[0] === "÷" || list[0] === "/" || list[0] === ")" || list[0] === ".") {
        return false;
      } else if (list[0] === "+" || list[0] === "-" && list[1] === "(") {
        return false;
      }
    } else if (i === list.length - 1) {
      if (list[list.length - 1] === "x" || list[list.length - 1] === "*" || list[list.length - 1] === "÷" || list[list.length - 1] === "/" ||
        list[list.length - 1] === "+" || list[list.length - 1] === "-" || list[list.length - 1] === "(" || list[list.length - 1] === ".") {
        return false;
      }
    } else {
      if (list[i] === "x" || list[i] === "*" || list[i] === "÷" || list[i] === "/" || list[i] === "+" || list[i] === "-" || list[i] === ".") {
        if (list[i + 1] === "x" || list[i + 1] === "*" || list[i + 1] === "÷" || list[i + 1] === "/" || list[i + 1] === "+" || list[i + 1] === "-" || list[i + 1] === ".") {
          return false;
        }
      }
    }
    if (list[i] === "(") {
      if (list[i + 1] === ")" || list[i + 1] === "x" || list[i + 1] === "*" || list[i + 1] === "÷" || list[i + 1] === "/" || list[i + 1] === "+" || list[i + 1] === "-" || list[i + 1] === ".") {
        return false;
      } else if (list[i - 1] !== "x" && list[i - 1] !== "*" && list[i - 1] !== "/" && list[i - 1] !== "÷" && list[i - 1] !== "+" && list[i - 1] !== "-" && list[i - 1] !== "(" && i > 0) {
        return false;
      }
      if (!(paranthesisMap.has("("))) {
        paranthesisMap.set("(", 1);
      } else {
        paranthesisMap.set("(", paranthesisMap.get("(") + 1);
      }
    } else if (list[i] === ")") {
      if (list[i - 1] === "(" || list[i - 1] === "x" || list[i - 1] === "*" || list[i - 1] === "÷" || list[i - 1] === "/" || list[i - 1] === "+" || list[i - 1] === "-" || list[i - 1] === ".") {
        return false;
      } else if (list[i + 1] !== "x" && list[i + 1] !== "*" && list[i + 1] !== "/" && list[i + 1] !== "÷" && list[i + 1] !== "+" && list[i + 1] !== "-" && list[i + 1] !== ")" && i < list.length - 1) {
        return false;
      }
      if (!(paranthesisMap.has(")"))) {
        paranthesisMap.set(")", 1);
      } else {
        paranthesisMap.set(")", paranthesisMap.get(")") + 1);
      }
    }
    if (paranthesisMap.get("(") < paranthesisMap.get(")")) {
      return false;
    }
  }
  if (!(paranthesisMap.get("(") === paranthesisMap.get(")"))) {
    paranthesisMap.clear();
    return false;
  }
  paranthesisMap.clear();
  return true;
}

// Make calSet
function makeCalSet(list) {
  var pos = 0;
  var element = "";
  for (var i = 0; i < list.length; i++) {
    if (list[i] === "(") {
      pos = i + 1;
    } else if (i - pos > 0 && pos < list.length - 1) {
      if (list[i] === "x" || list[i] === "*" || list[i] === "÷" || list[i] === "/" || list[i] === "+" || list[i] === "-" || list[i] === ")") {
        element = "";
        for (var j = pos; j < i; j++) {
          element += list[j];
        }
        list[pos] = Number(element);
        list.splice(pos + 1, i - pos - 1);
        i = i - (i - pos - 1);
        for (var j = i+1; j < list.length; j++) {
          if (list[j] !== "x" && list[j] !== "*" && list[j] !== "/" && list[j] !== "÷" && list[j] !== "+" && list[j] !== "-" && list[j] !== "(" && list[j] !== ")" &&
            list[j] !== ".") {
            pos = j;
            break;
          } else if (j === list.length - 1) {
            pos = list.length;
          }
        }
      } else if (i === list.length - 1) {
        element = "";
        for (var k = pos; k <= i; k++) {
          element += list[k];
        }
        list[pos] = Number(element);
        list.splice(pos + 1, i - pos);
      }
    } else if (pos === list.length - 1 && Number.isInteger(Number(list[pos]))) {
      list[pos] = Number(list[pos]);
    } else if (pos === list.length) {
      break;
    }
  }
  return list;
}

// Calculator
var listInside = [];
var count = 0;
var bool = false;

function eliminateParantheses(list) {
  count = 0;
  if (!(list.includes("(")) && !(list.includes(")"))) {
    return list;
  }
  for (var i = 0; i < list.length; i++) {
    if (list[i] === "(") {
      count++;
      for (var j = i + 1; j < list.length; j++) {
        if (list[j] === "(") {
          count++;
        } else if (list[j] === ")") {
          count--;
        }
        if (count === 0) {
          listInside = list.slice(i + 1, j);
          list[i] = listInside;
          list.splice(i + 1, j - i);
          list[i] = eliminateParantheses(list[i]);
          return eliminateParantheses(list);
        }
      }
    }
  }
}

function eliminateLists(list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].length > 1) {
      bool = false;
      break;
    }
    bool = true;
  }
  if (bool) {
    return calculator(list);
  } else {
    for (var i = 0; i < list.length; i++) {
      if (list[i].length > 1) {
        list[i] = eliminateLists(list[i]);
      }
    }
    return eliminateLists(list);
  }
}

function calculator(list) {
  for (var i = 0; i < list.length - 1; i++) {
    CalculateMD(list);
  }
  for (var i = 0; i < list.length - 1; i++) {
    CalculateAS(list);
  }
  return list[0];
}

function CalculateMD(list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === "x" || list[i] === "*") {
      list[i - 1] = calculate(list, i, multiply);
      list.splice(i, 2);
      i--;
    } else if (list[i] === "/" || list[i] === "÷") {
      list[i - 1] = calculate(list, i, divide);
      list.splice(i, 2);
      i--;
    }
  }
}

function CalculateAS(list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] === "+") {
      list[i - 1] = calculate(list, i, add);
      list.splice(i, 2);
      i--;
    } else if (list[i] === "-") {
      list[i - 1] = calculate(list, i, subtract);
      list.splice(i, 2);
      i--;
    }
  }
}

function calculate(li, int, operator) {
  return operator(li[int - 1], li[int + 1]);
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function flash (key) {
  if (key === "0") $("#zero").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "1") $("#one").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "2") $("#two").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "3") $("#three").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "4") $("#four").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "5") $("#five").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "6") $("#six").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "7") $("#seven").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "8") $("#eight").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "9") $("#nine").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "+") $("#plus").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "-") $("#minus").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "x") $("#multiply").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "÷") $("#divide").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "*") $("#multiply").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "/") $("#divide").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "mc") $("#mc").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "mr") $("#mr").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "m") $("#m").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "m-") $("#m-").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "del") $("#del").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "clear") $("#clear").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "Backspace") $("#del").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "Delete") $("#clear").fadeIn(50).fadeOut(50).fadeIn(50);
  if (key === "Enter") $("#Enter").fadeIn(50).fadeOut(50).fadeIn(50);
}
