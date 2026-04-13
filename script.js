let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let myChart = null;

const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total-amount');

// Initialize App
function init() {
    document.getElementById('current-date').innerText = new Date().toDateString();
    updateUI();
}

function updateUI() {
    list.innerHTML = '';
    let total = 0;
    const categoryTotals = {};

    expenses.forEach((item) => {
        total += parseFloat(item.amount);
        
        // Track category totals for the chart
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + parseFloat(item.amount);

        const li = document.createElement('li');
        li.innerHTML = `
            <div class="expense-info">
                <strong>${item.description}</strong>
                <small>${item.category}</small>
            </div>
            <div class="expense-amount">
                -$${item.amount}
                <button onclick="deleteItem(${item.id})" class="text-btn" style="margin-left:10px">✕</button>
            </div>
        `;
        list.appendChild(li);
    });

    totalDisplay.innerText = total.toFixed(2);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateChart(categoryTotals);
}

function updateChart(data) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    if (myChart) myChart.destroy(); // Destroy old chart instance to prevent memory leaks

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#06b6d4'],
                borderWidth: 0
            }]
        },
        options: { plugins: { legend: { display: false } } }
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newItem = {
        id: Date.now(),
        description: document.getElementById('desc').value,
        amount: document.getElementById('amount').value,
        category: document.getElementById('category').value
    };
    expenses.push(newItem);
    updateUI();
    form.reset();
});

function deleteItem(id) {
    expenses = expenses.filter(item => item.id !== id);
    updateUI();
}

document.getElementById('clear-all').addEventListener('click', () => {
    if (confirm("Clear all data?")) {
        expenses = [];
        updateUI();
    }
});

init();
