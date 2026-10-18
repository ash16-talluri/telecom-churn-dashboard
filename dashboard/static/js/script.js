// =============================
// CHART (Only if chart exists)
// =============================

const chart = document.getElementById("myChart");

if (chart) {

    const ctx = chart.getContext("2d");

    new Chart(ctx, {
        type: "doughnut",

        data: {
            labels: [
                "Retained Customers",
                "Churn Customers"
            ],

            datasets: [{
                data: [5174, 1869],

                backgroundColor: [
                    "#4CAF50",
                    "#F44336"
                ],

                borderWidth: 1
            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    position: "top"
                },

                title: {
                    display: true,
                    text: "Customer Churn Distribution"
                }

            }

        }

    });

}



// =============================
// Predict Market Response
// =============================

document.getElementById("predictBtn").addEventListener("click", function () {

    const planName = document.getElementById("planName").value.trim();
    const planType = document.getElementById("planType").value;
    const price = document.getElementById("price").value.trim();
    const dataLimit = document.getElementById("dataLimit").value.trim();
    const validity = document.getElementById("validity").value.trim();
    const target = document.getElementById("targetCustomers").value.trim();
    const benefits = document.getElementById("benefits").value.trim();

    if (
        planName === "" ||
        planType === "" ||
        price === "" ||
        dataLimit === "" ||
        validity === "" ||
        target === ""
    ) {

        alert("Please fill all the fields.");

        return;
    }

    // Random prediction values
    const churn = (Math.random() * 20 + 15).toFixed(1);
    const feedback = Math.floor(Math.random() * 400 + 50);

    const newCard = `
        <div class="card">

            <span class="status blue">NEW PLAN</span>

            <h2>${planName}</h2>

            <p>${benefits}</p>

            <div class="info">

                <p><strong>Price:</strong> ₹${price}/month</p>

                <p><strong>Users:</strong> ${planType}</p>

                <p><strong>Data:</strong> ${dataLimit}</p>

                <p><strong>Validity:</strong> ${validity}</p>

                <p><strong>Target:</strong> ${target}</p>

                <p><strong>Feedback:</strong> ${feedback} responses</p>

                <p><strong>Predicted Churn:</strong> ${churn}%</p>

            </div>

            <button onclick="window.location.href='/dashboard'">
                Review Plan →
            </button>

            <button class="delete-btn" onclick="deletePlan(this)">
                🗑 Delete Plan
            </button>

        </div>
    `;

    document
        .getElementById("plansContainer")
        .insertAdjacentHTML("beforeend", newCard);

    alert("✅ Market Response Predicted Successfully!");

    // Clear form
    document.getElementById("planName").value = "";
    document.getElementById("planType").selectedIndex = 0;
    document.getElementById("price").value = "";
    document.getElementById("dataLimit").value = "";
    document.getElementById("validity").value = "";
    document.getElementById("targetCustomers").value = "";
    document.getElementById("benefits").value = "";

});



// =============================
// Delete Plan
// =============================

function deletePlan(button) {

    let choice = confirm("Delete this plan?");

    if (choice) {

        button.parentElement.remove();

    }

}