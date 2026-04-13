const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function updateUI() {
  list.innerHTML = '';
  let total = 0;

  expenses.forEach((item, index) => {
    total += parseFloat(item.amount);
    const li = document.createElement('li');
    li.innerHTML = `${item.description} - $${item.amount} 
                    <button onclick="deleteExpense(${index})">x</button>`;
    list.appendChild(li);
  });

  totalDisplay.innerText = total.toFixed(2);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newExpense = {
    description: document.getElementById('desc').value,
    amount: document.getElementById('amount').value,
  };
  expenses.push(newExpense);
  updateUI();
  form.reset();
});

function deleteExpense(i) {
  expenses.splice(i, 1);
  updateUI();
}

updateUI();
