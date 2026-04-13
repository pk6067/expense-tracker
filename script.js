// 1. Initialize data from LocalStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total-amount');

// 2. Function to refresh the screen and save data
function updateDisplay() {
    list.innerHTML = '';
    let total = 0;

    expenses.forEach((expense) => {
        total += parseFloat(expense.amount);

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="info">
                <strong>${expense.description}</strong>
                <small>${expense.category} | ${expense.date}</small>
            </div>
            <div class="amount-action">
                <span>-$${parseFloat(expense.amount).toFixed(2)}</span>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });

    totalDisplay.innerText = total.toFixed(2);
    
    // Core feature: Save to browser memory
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// 3. Handle Form Submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const desc = document.getElementById('desc').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    if (amount <= 0) return alert("Please enter a valid amount");

    const newExpense = {
        id: Date.now(), // Unique timestamp ID
        description: desc,
        amount: amount,
        category: category,
        date: new Date().toLocaleDateString()
    };

    expenses.push(newExpense);
    updateDisplay();
    form.reset();
});

// 4. Handle Deletion by ID
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateDisplay();
}

// 5. Initial Run
updateDisplay();
