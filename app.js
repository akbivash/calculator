import Store from "./store.js"

class Calculator {

    constructor() {

        this.$ = {}

        this.$.nums = this.#qsAll('[data-id="num"]'),
            this.$.operators = this.#qsAll('[data-id="operator"]'),
            this.$.clearBtn = this.#qs('[data-id="clear"]'),
            this.$.deleteBtn = this.#qs('[data-id="delete"]'),
            this.$.calculateBtn = this.#qs('[data-id="calculate"]'),
            this.$.prevValue = this.#qs('[data-id="prev_val"]'),
            this.$.currentValue = this.#qs('[data-id="current_val"]'),
            this.$.computedVal = 0
    }

    init() {
        this.registerEventListeners()
    }

    registerEventListeners() {
        this.$.nums.forEach(n => n.addEventListener('click', () => this.handleNumber(n)))
        this.$.operators.forEach(o => o.addEventListener('click', () => this.handleOperator(o)))
        this.$.clearBtn.addEventListener('click', () => {
            store.clear(this.$.prevValue, this.$.currentValue)
        })
        this.$.calculateBtn.addEventListener('click', () => this.calculate())
        this.$.deleteBtn.addEventListener('click', () => this.delete())
    }

    #qs(items) {
        return document.querySelector(items)
    }

    #qsAll(items) {
        return document.querySelectorAll(items)
    }

    handleNumber(number) {
        store.state.currentValue += number.textContent
        this.$.currentValue.value = store.state.currentValue
    }

    handleOperator(operator) {
        if (store.state.prevOperator !== '') {
            if (store.state.currentValue !== '') {
                store.calculate()
                this.updatePrevValue(store.state.computedVal, operator)
                this.resetCurrentValue()
            } else {
                this.updatePrevValue(store.state.prevValue, operator)
            }
        }
        if (store.state.prevOperator === '') {
            this.updatePrevValue(store.state.currentValue, operator)
            this.resetCurrentValue()
        }
    }

    resetCurrentValue() {
        store.state.currentValue = ''
        this.$.currentValue.value = ''
    }

    updatePrevValue(value, operator) {
        store.state.prevOperator = operator.textContent
        store.state.prevValue = value
        this.$.prevValue.textContent = value + operator.textContent
    }

    calculate() {
        if (store.state.computedVal === Number(this.$.currentValue.value) || store.state.prevValue === '') return
        store.calculate()
        this.$.prevValue.textContent = this.$.prevValue.textContent + store.state.currentValue
        this.$.currentValue.value = store.state.computedVal
    }
    
    delete() {
        if (store.state.computedVal === Number(this.$.currentValue.value)) return
        let val = store.state.currentValue.slice(0, -1)
        store.state.currentValue = val
        this.$.currentValue.value = store.state.currentValue
    }
}



let calc = new Calculator()
let store = new Store()
calc.init()