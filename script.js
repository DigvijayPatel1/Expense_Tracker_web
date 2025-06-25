addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const inputExpenseName = document.getElementById("expense-name");
    const inputExpenseAmount = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDispaly = document.getElementById("total-amount");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmount = calculateTotal();

    renderExpenses();

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = inputExpenseName.value.trim();
        const amount = parseFloat(inputExpenseAmount.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0){
            const newExpense = {
                id: Date.now(),
                name : name,
                amount: amount
            };

            expenses.push(newExpense);
            saveExpenseTolocal();
            renderExpenses();
            updateTotal();

            // clear the input
            inputExpenseName.value = "";
            inputExpenseAmount.value = "";
        }
    });

    function calculateTotal() {
        return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    function saveExpenseTolocal() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalAmountDispaly.textContent = totalAmount.toFixed(2);
    }

    function renderExpenses() {
        expenseList.innerHTML = "";
        expenses.forEach((expense) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} - $${expense.amount}
                <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    expenseList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON"){
            const expenseId = parseInt(e.target.getAttribute("data-id"));
            expenses = expenses.filter((expense) => expense.id !== expenseId);

            saveExpenseTolocal();
            renderExpenses();
            updateTotal();
        }
    })
});