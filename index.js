        let display = document.getElementById('display');
        let currentInput = '0';
        let shouldResetDisplay = false;
        
        function updateDisplay() {
            display.textContent = currentInput;
        }
        
        function appendToDisplay(value) {
            if (currentInput === '0' || shouldResetDisplay) {
                currentInput = value;
                shouldResetDisplay = false;
            } else {
                currentInput += value;
            }
            updateDisplay();
        }
        
        function clearDisplay() {
            currentInput = '0';
            updateDisplay();
        }
        
        function backspace() {
            if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);
            } else {
                currentInput = '0';
            }
            updateDisplay();
        }
        
        function calculate() {
            try {
                let expression = currentInput.replace(/×/g, '*');
                let result = eval(expression);
                
                if (!isFinite(result)) {
                    currentInput = 'Error';
                } else {
                    currentInput = result.toString();
                    shouldResetDisplay = true;
                }
            } catch (error) {
                currentInput = 'Error';
            }
            updateDisplay();
        }
        
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                appendToDisplay(key);
            } else if (key === '.') {
                appendToDisplay('.');
            } else if (key === '+' || key === '-' || key === '*') {
                appendToDisplay(key);
            } else if (key === '/') {
                event.preventDefault();
                appendToDisplay('/');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                clearDisplay();
            } else if (key === 'Backspace') {
                backspace();
            }
        });
        
        updateDisplay();
