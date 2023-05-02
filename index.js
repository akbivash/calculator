const App = {
  $: {
    nums: document.querySelectorAll('[data-id="num"]'),
    operators: document.querySelectorAll('[data-id="operator"]'),
    clearBtn: document.querySelector('[data-id="clear"]'),
    deleteBtn: document.querySelector('[data-id="delete"]'),
    calculateBtn: document.querySelector('[data-id="calculate"]'),
    prevVal: document.querySelector('[data-id="prev_val"]'),
    currentVal: document.querySelector('[data-id="current_val"]'),
    computedVal: 0
  },
  init() {
    if (data.currentOperand === '') {
      App.$.deleteBtn.style.cursor = 'default'
      App.$.deleteBtn.style.disabled = 'true'

    }
  },
  calculate(prev, operator, current) {
    let a = Number(prev)
    let b = Number(current)
    switch (operator) {
      case '+': App.$.computedVal = a + b
        break;
      case '*': App.$.computedVal = a * b
        break;
      case '/': App.$.computedVal = parseFloat(a / b)
        break;
      case '-': App.$.computedVal = a - b
        break;
      case '%': App.$.computedVal = parseFloat(a % b)
        break;
    }
  },
  reset() {
    data.currentOperand = ''
    data.prevOperand = ''
    App.$.currentVal.value = ''
    App.$.prevVal.textContent = ''
    App.init()

    App.$.operators.forEach(o => {
      o.style.background = 'black'
    })
  },
  delete() {
    if (App.$.computedVal === Number(App.$.currentVal.value)) return;
    if (data.currentOperand !== '') {
      let c = [data.currentOperand].toString().slice(0, -1)
      data.currentOperand = c
      App.$.currentVal.value = data.currentOperand
    }
  }
}


let data = {
  prevOperand: '',
  currentOperand: '',
  prevOperator: '',
  currentOperator: '',
}

window.addEventListener('load', App.init)
App.$.clearBtn.addEventListener('click', App.reset)
App.$.deleteBtn.addEventListener('click', App.delete)

App.$.nums.forEach(n => {
  n.addEventListener('click', () => {
    if (App.$.computedVal !== 0 && App.$.computedVal === Number(App.$.currentVal.value)) {
      App.reset()
    }
    App.$.deleteBtn.style.cursor = 'pointer'

    if (n.textContent === '.' && data.currentOperand.includes('.')) return
    data.currentOperand += n.textContent
    App.$.currentVal.value = data.currentOperand
  })
})

App.$.operators.forEach(o => {
  o.addEventListener('click', function () {
    App.$.operators.forEach(o => {
      o.style.background = 'black'
    })
    this.style.background = 'gray'
    if (data.prevOperand === '') {
      data.prevOperand = data.currentOperand
      data.prevOperator = o.textContent
      data.currentOperand = ''
      App.$.prevVal.textContent = data.prevOperand + data.prevOperator
      App.$.currentVal.value = data.currentOperand
    } else {
      if (data.currentOperand === '') {
        data.prevOperator = o.textContent
        App.$.prevVal.textContent = data.prevOperand + o.textContent

        return;
      } else {
        App.calculate(data.prevOperand, data.prevOperator, data.currentOperand)
        data.prevOperand = App.$.computedVal
        data.prevOperator = o.textContent
        App.$.prevVal.textContent = data.prevOperand + data.prevOperator
        data.currentOperand = ''
        App.$.currentVal.value = data.currentOperand
      }
    }
  })
})


App.$.calculateBtn.addEventListener('click', () => {
  App.$.deleteBtn.style.disabled = 'true'
  App.$.deleteBtn.style.cursor = 'default'
  if (!data.prevOperand || !data.currentOperand || !data.prevOperator) return
  App.calculate(data.prevOperand, data.prevOperator, data.currentOperand)
  App.$.currentVal.value = App.$.computedVal
  App.$.prevVal.textContent = data.prevOperand + data.prevOperator + data.currentOperand
})
