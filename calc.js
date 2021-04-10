let inputScreen = document.querySelector(".inputScreen");
let outputScreen = document.querySelector(".outputScreen");

function getHistory () {
    return inputScreen.innerText;
}

function printHistory(num) {
    inputScreen.innerText = num;
}

function getOutput() {
    return outputScreen.innerText;
}

function printOutput (num) {
    outputScreen.innerText = getFormattedNumber(num);
}

function getFormattedNumber (num) {
    if (num == "" ) {
        return "";
    }

    else if (num == "-") {
        return "-";
    }

    else if (num.includes(".")) {
        var n = num.split(".");
        var num1 = Number(n[0]);
        var value = num1.toLocaleString("en");
        return value + "." + n[1];
    }
    else{
        var n = Number(num);
        var value = n.toLocaleString("en");
        return value;
    }   
    
}

function reverseFormattedNumber(num) {
    if (num.includes(".")) {
        var n = num.split(".")
        return Number(n[0].replace(/,/g, ""))  + "." + n[1];
    }
    else if (num == "-") {
        return "-";
    }
    else {
        return Number(num.replace(/,/g, ""));
    }
    
}

let operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function () {
        if (this.id == 'clear') {
            printOutput("");
            printHistory(""); 
        }

        else if (this.id == "backspace") {
            var output = reverseFormattedNumber(getOutput()).toString();
            if (output) {
                output = output.substr(0,output.length-1);
                printOutput(output)
            }
        }

        else if (getOutput() == "" && this.id == "subtraction" && getHistory()=="") {
            output = "-";
            printOutput(output);
        }

        else {
            var output = getOutput()
            var history = getHistory()
            if(history != "" && output == "") {
                if(isNaN(history[history.length-1])) {
                    history = history.substr(0, history.length-1);
                }
            }
            if(output != "" || history != "") {
                output = output==""?output:reverseFormattedNumber(output);    
                history = history + output;
                if (this.id == "equals") {
                    let result = eval(history);
                    printOutput(result.toString());
                    printHistory("");
            
                }

                else {
                    history = history + this.value;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}

let numbers = document.getElementsByClassName("number");
for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
        var output = reverseFormattedNumber(getOutput());
        if (output != NaN) {
            output = output + this.value;
            printOutput(output);
        }

        else if (output.endsWith(".")) {
            output = output + this.value;
            printOutput(output);
        }
        
    });
}