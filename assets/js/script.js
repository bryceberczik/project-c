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

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('captureForm').addEventListener('click', function () {

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

    document.getElementById('submitIncome').addEventListener('click', function () {

        const income = parseFloat(document.getElementById('incomeAmount').value);
        const subject = document.getElementById('incomeSubject').value;
        const errorMessage = document.getElementById('error1');
        const addIncomeModal = bootstrap.Modal.getInstance(document.getElementById('addIncomeModal'));
        const incomeList = document.getElementById('income-list');

        if (isNaN(income) || subject.trim() === '') {

            errorMessage.textContent = `All fields are required. Please fill out the form completely.`;
        } else {

            let allTimeIncome = parseFloat(localStorage.getItem('allTimeIncome')) || 0;
            allTimeIncome += income;
            localStorage.setItem(`allTimeIncome`, allTimeIncome);

            let initialAmount = parseFloat(localStorage.getItem('initialAmount')) || 0;
            initialAmount += income;
            initialAmount = parseFloat(initialAmount).toFixed(2);
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

            location.reload();

            addIncomeModal.hide();
            income.value = '';
            subject.value = '';
        }
    })

    document.getElementById('submitExpense').addEventListener('click', function () {

        const expense = parseFloat(document.getElementById('expenseAmount').value);
        const subject = document.getElementById('expenseSubject').value;
        const errorMessage = document.getElementById('error2');
        const addExpenseModal = bootstrap.Modal.getInstance(document.getElementById('addExpenseModal'));
        const expenseList = document.getElementById('expense-list');

        if (isNaN(expense) || subject.trim() === '') {
            errorMessage.textContent = `All fields are required. Please fill out the form completely.`;
        } else {

            let allTimeExpense = parseFloat(localStorage.getItem('allTimeExpense')) || 0;
            allTimeExpense += expense;
            localStorage.setItem(`allTimeExpense`, allTimeExpense);

            let initialAmount = parseFloat(localStorage.getItem('initialAmount')) || 0;
            initialAmount -= expense;
            initialAmount = parseFloat(initialAmount).toFixed(2);
            let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

            let newExpense = {
                amount: expense,
                subject: subject
            };

            expenses.push(newExpense);

            localStorage.setItem('expenses', JSON.stringify(expenses));
            localStorage.setItem('initialAmount', initialAmount.toString());

            let expenseItem = document.createElement('p');
            expenseItem.textContent = `- ${subject}: $${expense}`;
            expenseList.appendChild(expenseItem);

            let initialSpan = document.getElementById('initialSpan');
            initialSpan.textContent = `Current balance: $${initialAmount}`;

            expenseItem.style.color = '#E07574';
            expenseItem.style.textAlign = 'center';
            expenseItem.style.fontSize = '30px';

            location.reload();

            addExpenseModal.hide();
            expense.value = '';
            subject.value = '';
        }
    });

    function checkLocalStorage() {
        const incomeList = document.getElementById('income-list');
        const expenseList = document.getElementById('expense-list');

        const incomes = JSON.parse(localStorage.getItem('incomes'));
        const expenses = JSON.parse(localStorage.getItem('expenses'));

        if (!incomes || incomes.length === 0) {
            const noIncomeMessage = document.createElement('p');
            noIncomeMessage.textContent = 'No income added yet.';
            incomeList.appendChild(noIncomeMessage);

            noIncomeMessage.style.textAlign = 'center';
            noIncomeMessage.style.color = '#7482E1';
            noIncomeMessage.style.fontSize = '30px';
        }

        if (!expenses || expenses.length === 0) {
            const noExpenseMessage = document.createElement('p');
            noExpenseMessage.textContent = 'No expense added yet.';
            expenseList.appendChild(noExpenseMessage);

            noExpenseMessage.style.textAlign = 'center';
            noExpenseMessage.style.color = '#7482E1';
            noExpenseMessage.style.fontSize = '30px';
        }
    }

    checkLocalStorage();


    resetLocalStorage.addEventListener('click', function () {
        const resetModal = new bootstrap.Modal(document.getElementById('resetConfirmationModal'));
        resetModal.show();
    });

    confirmReset.addEventListener('click', function () {
        localStorage.clear();
        location.reload();
    });

    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Load theme from localStorage
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark-mode") {
        body.classList.add("dark-mode");
        themeToggle.checked = true;
    }

    // Toggle theme on switch change
    themeToggle.addEventListener("change", function () {
        body.classList.toggle("dark-mode", this.checked);
        if (this.checked) {
            localStorage.setItem("theme", "dark-mode");
        } else {
            localStorage.setItem("theme", "light-mode");
        }
    });
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

let pieGraph = document.getElementById('pie-graph').getContext('2d');

let allTimeIncome = parseFloat(localStorage.getItem('allTimeIncome')) || 0;
let allTimeExpense = parseFloat(localStorage.getItem('allTimeExpense')) || 0;

let massPieChart = new Chart(pieGraph, {
    type: 'pie',
    data: {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label: 'Total',
            data: [
                allTimeIncome,
                allTimeExpense
            ],
            backgroundColor: [
                '#68F553',
                '#E07574'
            ]
        }],
    },
    options: {
        maintainAspectRatio: false
    }
});

let scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

scrollToTopBtn.addEventListener('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

updateButtonLabels();


window.addEventListener('resize', updateButtonLabels);

init();