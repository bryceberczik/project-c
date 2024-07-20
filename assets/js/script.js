document.getElementById('initialAmountInput').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
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

});

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
}

init();

renderInitialModal();

