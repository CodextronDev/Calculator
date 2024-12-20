document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display input');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let resultDisplayed = false;  // Flag to detect if result is displayed

    // Function to update the display
    function updateDisplay(value) {
        display.value = value;
    }

    // Function to handle button clicks
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.innerText;

            if (buttonText === 'AC') {
                // Clear everything
                currentInput = '';
                previousInput = '';
                operator = '';
                resultDisplayed = false;
                updateDisplay('0');
            } else if (buttonText === 'backspace') {
                // Handle delete (backspace)
                currentInput = currentInput.slice(0, -1);
                updateDisplay(currentInput || '0');
            } else if (buttonText === '=') {
                // Handle calculation
                if (previousInput && currentInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    updateDisplay(currentInput);
                    previousInput = '';
                    operator = '';
                    resultDisplayed = true;  // Mark that result has been displayed
                }
            } else if (['+', '−', '×', '÷', '%'].includes(buttonText)) {
                // Handle operators
                if (currentInput !== '') {
                    if (previousInput && operator) {
                        currentInput = calculate(previousInput, currentInput, operator);
                        updateDisplay(currentInput);
                    }
                    operator = buttonText;
                    previousInput = currentInput;
                    currentInput = '';
                    resultDisplayed = false;  // Reset after an operator is clicked
                    updateDisplay(previousInput + ' ' + operator); // Show the operator on screen
                }
            } else if (buttonText === '.') {
                // Handle decimal point
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                    updateDisplay(currentInput);
                }
            } else {
                // Handle number buttons
                if (resultDisplayed) {
                    // If result was displayed, start fresh
                    currentInput = buttonText;
                    resultDisplayed = false;
                } else {
                    if (currentInput === '0') {
                        currentInput = buttonText; // Replace '0' with the number clicked
                    } else {
                        currentInput += buttonText; // Append to current input
                    }
                }
                updateDisplay(previousInput + ' ' + operator + ' ' + currentInput); // Show numbers and operator
            }
        });
    });

    // Function to calculate the result
    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        let result;

        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '−':
                result = a - b;
                break;
            case '×':
                result = a * b;
                break;
            case '÷':
                result = b !== 0 ? a / b : 'Error'; // Prevent division by zero
                break;
            case '%':
                result = (a * b) / 100;
                break;
            default:
                result = b;
                break;
        }

        // Format the result to 2 decimal places
        if (typeof result === 'number' && !Number.isInteger(result)) {
            result = result.toFixed(2); // Round to two decimal places
        }

        return result;
    }
});
