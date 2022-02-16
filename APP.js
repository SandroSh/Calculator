

class Calculator{

    constructor(previousOpperandTextElement, currentOpperandTextElement){
        this.previousOpperandTextElement = previousOpperandTextElement;
        this.currentOpperandTextElement = currentOpperandTextElement;
        this.clear();

    }

    addNumber(number){
        if( number === "." && this.currentOpperand.includes('.')) return
        this.currentOpperand = this.currentOpperand.toString() + number.toString() ;

    }

    chooseOperation(operation){
        if(this.currentOpperand === '') return
        if(this.previousOpperand !== ''){
            this.calculate();
        }
        this.operation = operation;
        this.previousOpperand = this.currentOpperand;
        this.currentOpperand = "";
    }

    delete(){

        this.currentOpperand =  this.currentOpperand.toString().slice(0, -1);
    }

    calculate(){
        let numer = 0;
        const previous = parseFloat(this.previousOpperand);
        const current = parseFloat(this.currentOpperand);
        if( isNaN(previous) || isNaN(current))return
            
        switch(this.operation){
            case '+': 
                numer = previous + current;
                break;
            case '-':
                numer = previous - current;
                break;
            case '*':
                numer = previous * current;
                break;
            case '/':
                numer = previous / current;
                break;
            default:
                return
           
        } 
        this.currentOpperand = numer;
        this.previousOpperand = "";
        this.operation = undefined;
    }
    newNumber(number){
        const stringNumber = number.toString();
        const floatNumber = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(floatNumber)){
            integerDisplay = "";
        }else{
            integerDisplay = floatNumber.toLocaleString('ge', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay;
        }
    }
    updateDisplay(){
        this.currentOpperandTextElement.innerText = this.newNumber(this.currentOpperand);
        if(this.operation != null){
            this.previousOpperandTextElement.innerText = `${this.newNumber(this.previousOpperand)} ${this.operation}`
        }else{
            this.previousOpperandTextElement.innerText = '';
        }
        
        if(this.currentOpperandTextElement.innerText.toString().length > 15){
            currentNum.style.fontSize = "1.5em";
        }else{
            currentNum.style.fontSize = "3em";
        }
       
    }

    clear(){
        this.currentOpperand = "";
        this.previousOpperand = "";
        this.operation = undefined;
    }
    clearPrev(){
        
        this.previousOpperand = "";
        
    }


}

const numberButtons = document.querySelectorAll('[data-number]');
const mpmdButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const resetButton = document.querySelector('[data-all-clear]');
const equalButton = document.querySelector('[data-equals]');
const previousNum = document.querySelector('[data-previous-operand]');
const currentNum = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousNum, currentNum);



numberButtons.forEach( button =>{
    button.addEventListener( "click", ()=>{
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    })
});

mpmdButtons.forEach(button =>{
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});


equalButton.addEventListener("click",  button=>{
    calculator.calculate();
    calculator.updateDisplay();
    
})

resetButton.addEventListener('click', button=>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button=>{
    calculator.delete();
    calculator.updateDisplay();
})