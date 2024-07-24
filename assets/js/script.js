document.addEventListener('DOMContentLoaded', function() {
    const initialAmountInput = document.getElementById('initialAmountInput');
    const incomeAmount = document.getElementById('incomeAmount');
    const expenseAmount = document.getElementById('expenseAmount');

    if (initialAmountInput) {
        initialAmountInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    if (incomeAmount) {
        incomeAmount.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    if (expenseAmount) {
        expenseAmount.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }
});

let userName;
let initialAmount;

function renderInitialModal() {

    userName = localStorage.getItem('userName');
    initialAmount = localStorage.getItem('initialAmount');

    if (userName === null || initialAmount === null) {

        var initialModal = new bootstrap.Modal(document.getElementById('initialModal'));
        initialModal.show();
    } else {

        initialAmount = Number(initialAmount);

    }
}

document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('captureForm').addEventListener('click', function() {

        userName = document.getElementById('nameInput').value;
        initialAmount = document.getElementById('initialAmountInput').value;

        const errorMessage = document.getElementById('error');
        const initialModal = bootstrap.Modal.getInstance(document.getElementById('initialModal'));
        
        if (userName === '' || initialAmount === '') {

            errorMessage.textContent = `All fields are required. Please fill out the form completely.`;

        } else {

            localStorage.setItem('userName', userName);
            localStorage.setItem('initialAmount', initialAmount);

            initialModal.hide();
        }
    });
    
    let initialModalElement = document.getElementById('initialModal');
    
    initialModalElement.addEventListener('hidden.bs.modal', function () {

        
        let userName = localStorage.getItem('userName');
        let initialAmount = localStorage.getItem('initialAmount');

        let userSpan = document.getElementById('userSpan');
        let initialSpan = document.getElementById('initialSpan')

        if (userName === null) {
            userSpan.textContent = '';
        } else {
            userSpan.textContent = `Welcome, ${userName}.`;
        }

        if (initialAmount === null) {
            initialSpan.textContent = '';
        } else {
            initialSpan.textContent = `Current balance: $${initialAmount}`;
        }
    });

    document.getElementById('submitIncome').addEventListener('click', function() {

        const income = parseFloat(document.getElementById('incomeAmount').value);
        const subject = document.getElementById('incomeSubject').value;
        const errorMessage = document.getElementById('error1');
        const addIncomeModal = bootstrap.Modal.getInstance(document.getElementById('addIncomeModal'));
        const incomeList = document.getElementById('income-list');
    
        if (income === '' || subject === '') {
            
            errorMessage.textContent = `All fields are required. Please fill out the form completely.`;
        } else {

            let initialAmount = parseFloat(localStorage.getItem('initialAmount')) || 0; // Retrieve and parse initialAmount
            initialAmount += income; // Subtract income from initialAmount

        let incomes = JSON.parse(localStorage.getItem('incomes')) || [];

        let newIncome = {
            amount: income,
            subject: subject
        };

        incomes.push(newIncome);

        localStorage.setItem('incomes', JSON.stringify(incomes));
        localStorage.setItem('initialAmount', initialAmount.toString());

        let incomeItem = document.createElement('p');
        incomeItem.textContent = `+ ${subject}: $${income}`
        incomeList.appendChild(incomeItem);

        let initialSpan = document.getElementById('initialSpan')
        initialSpan.textContent = `Current balance: $${initialAmount}`;

        incomeItem.style.color = '#68F553';
        incomeItem.style.textAlign = 'center';
        incomeItem.style.fontSize = '30px';
        
        addIncomeModal.hide();
        income.value = '';
        subject.value = '';
        }
    })

    document.getElementById('submitExpense').addEventListener('click', function() {

        const expense = parseFloat(document.getElementById('expenseAmount').value);
        const subject = document.getElementById('expenseSubject').value;
        const errorMessage = document.getElementById('error2');
        const addExpenseModal = bootstrap.Modal.getInstance(document.getElementById('addExpenseModal'));
        const expenseList = document.getElementById('expense-list');
    
        if (expense === '' || subject === '') {
            
            errorMessage.textContent = `All fields are required. Please fill out the form completely.`;
        } else {

            let initialAmount = parseFloat(localStorage.getItem('initialAmount')) || 0;
            initialAmount -= expense;

        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

        let newExpense = {
            amount: expense,
            subject: subject
        };

        expenses.push(newExpense);

        localStorage.setItem('expenses', JSON.stringify(expenses));
        localStorage.setItem('initialAmount', initialAmount.toString());

        let expenseItem = document.createElement('p');
        expenseItem.textContent = `- ${subject}: $${expense}`
        expenseList.appendChild(expenseItem);

        let initialSpan = document.getElementById('initialSpan')
        initialSpan.textContent = `Current balance: $${initialAmount}`;

        expenseItem.style.color = '#E07574';
        expenseItem.style.textAlign = 'center';
        expenseItem.style.fontSize = '30px';
        
        addExpenseModal.hide();
        expense.value = '';
        subject.value = '';
        }
    })
});

function renderIncomes() {

    const incomeList = document.getElementById('income-list');

    incomeList.innerHTML = '';

    let incomes = JSON.parse(localStorage.getItem('incomes')) || [];

    incomes.forEach(income => {
        let incomeItem = document.createElement('p');
        incomeItem.textContent = `+ ${income.subject}: $${income.amount}`;
        incomeList.appendChild(incomeItem);

        incomeItem.style.color = '#68F553';
        incomeItem.style.textAlign = 'center';
        incomeItem.style.fontSize = '30px';
    });
    
}

function renderExpenses() {

    const expenseList = document.getElementById('expense-list');

    expenseList.innerHTML = '';

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    expenses.forEach(expense => {
        let expenseItem = document.createElement('p');
        expenseItem.textContent = `- ${expense.subject}: $${expense.amount}`;
        expenseList.appendChild(expenseItem);

        expenseItem.style.color = '#E07574';
        expenseItem.style.textAlign = 'center';
        expenseItem.style.fontSize = '30px';
    });
    
}

function init() {

        let userName = localStorage.getItem('userName');
        let initialAmount = localStorage.getItem('initialAmount');

        let userSpan = document.getElementById('userSpan');
        let initialSpan = document.getElementById('initialSpan')

        if (userName === null) {
            userSpan.textContent = '';
        } else {
            userSpan.textContent = `Welcome, ${userName}.`;
        }

        if (initialAmount === null) {
            initialSpan.textContent = '';
        } else {
            initialSpan.textContent = `Current balance: $${initialAmount}`;
        }

        renderInitialModal();
        renderIncomes();
        renderExpenses();
}

function updateButtonLabels() {
    const addIncomeBtn = document.getElementById('income-btn');
    const addExpenseBtn = document.getElementById('expense-btn');
  
    if (window.innerWidth <= 768) {
      addIncomeBtn.textContent = '+';
      addExpenseBtn.textContent = '-';
    } else {
      addIncomeBtn.textContent = 'Add Income';
      addExpenseBtn.textContent = 'Add Expense';
    }
  }
  
  updateButtonLabels();
  
  window.addEventListener('resize', updateButtonLabels);

init();