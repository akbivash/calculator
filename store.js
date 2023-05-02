export default class Store {

    constructor() {
        this.state = {
            prevValue: '',
            currentValue: '',
            prevOperator: '',
            currentOperator: '',
            computedVal: 0
        }

    }

    appendNumbers() {

    }
    calculate() {
        let a = Number(this.state.prevValue)
        let b = Number(this.state.currentValue)
        let operator = this.state.prevOperator
        switch (operator) {
            case '+': this.state.computedVal = a + b

                break;
            case '*': this.state.computedVal = a * b
                break;
            case '/': this.state.computedVal = parseFloat(a / b)
                break;
            case '-': this.state.computedVal = a - b
                break;
            case '%': this.state.computedVal = parseFloat(a % b)
                break;
        }
    }

    clear(prev, current) {
        this.state.prevValue = '',
            this.state.currentValue = '',
            this.state.prevOperator = '',
            this.state.currentOperator = '',
            this.state.computedVal = 0
        prev.textContent = 0
        current.value = 0
    }
}