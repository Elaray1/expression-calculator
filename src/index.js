function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] == " ") expr = expr.substring(0, i) + expr.substring(i+1);
    }
    let stack = [];
    let str = "";
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] >= '0' && expr[i] <= '9') {
        while (expr[i] >= '0' && expr[i] <= '9') {
          str += expr[i];
          i++;
        }
        i--;
        str += " ";
        continue;
      }
      if (expr[i] == "*" || expr[i] == "/") {
        if (stack.length == 0 || stack[stack.length-1] == "+"
        || stack[stack.length-1] == "-" || stack[stack.length-1] == "(") {
          stack.push(expr[i]);
          continue;
        } else {
          while (stack[stack.length-1] != "+" && stack[stack.length-1] != "-"
          && stack[stack.length-1] != "(" && stack.length != 0) {
            str += stack[stack.length-1];
            stack.pop();
          }
          stack.push(expr[i]);
          continue;
        }
      }
      if (expr[i] == "+" || expr[i] == "-") {
        if (stack.length == 0 || stack[stack.length-1] == "(") {
          stack.push(expr[i]);
          continue;
        } else {
          while (stack[stack.length-1] != "(" && stack.length != 0) {
            str += stack[stack.length-1];
            stack.pop();
          }
          stack.push(expr[i]);
          continue;
        }
      }
      if (expr[i] == "(") {
        stack.push(expr[i]);
        continue;
      }
      if (expr[i] == ")") {
        while (stack[stack.length-1] != "(" && stack.length != 0) {
          str += stack[stack.length-1];
          stack.pop();
        }
        if (stack.length == 0) throw "ExpressionError: Brackets must be paired"
        stack.pop();
      }
    }
    while (stack.length != 0) {
      if (stack[stack.length-1] == "(") throw "ExpressionError: Brackets must be paired";
      str += stack[stack.length-1];
      stack.pop();
    }
    stack = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] == " ") continue;
      if (str[i] >= '0' && str[i] <= '9') {
        let number = '';
        while (str[i] >= '0' && str[i] <= '9') {
          number += str[i];
          i++;
        }
        stack.push(number);
        i--;
      } else {
        let a, b;
        a = +stack[stack.length-2];
        b = +stack[stack.length-1];
        stack.pop();
        stack.pop();
        if (str[i] == "*") {
          stack.push(a * b);
          continue;
        }
        if (str[i] == "/") {
          if (b == 0) throw "TypeError: Division by zero.";
        stack.push(a / b);
        continue;
        }
        if (str[i] == "+") {
        stack.push(a + b);
        continue;
        }
        if (str[i] == "-") {
        stack.push(a - b);
        continue;
        }
      }
    }
    return stack[0];
}

module.exports = {
    expressionCalculator
}
