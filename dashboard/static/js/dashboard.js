// =============================
// Dashboard Statistics
// =============================


// =============================
// Customer Distribution Pie Chart
// =============================

new Chart(document.getElementById("pieChart"), {
    type: "pie",

    data: {
        labels: ["Retained", "Churned"],

        datasets: [{
            data: [retainedCustomers, churnCustomers],

            backgroundColor: [
                "#22c55e",
                "#ef4444"
            ]
        }]
    },

    options: {
        responsive: true,

        plugins: {
            legend: {
                labels: {
                    color: "white"
                }
            }
        }
    }
});


// =============================
// Monthly Churn Trend
// =============================
console.log("contractData:", contractData);
console.log("Labels:", Object.keys(contractData));
console.log("Values:", Object.values(contractData));
new Chart(document.getElementById("barChart"), {

    type: "bar",

    data: {

        labels: Object.keys(contractData),

        datasets: [{
            label: "Churn Customers",
            data: Object.values(contractData),
            backgroundColor: "#38bdf8"

        }]
    },

    options: {

        responsive: true,

        plugins: {

            legend: {

                labels: {
                    color: "white"
                }

            }

        },

        scales: {

            x: {

                ticks: {
                    color: "white"
                }

            },

            y: {

                beginAtZero: true,

                ticks: {
                    color: "white"
                }

            }

        }

    }

});

// =============================
// Sidebar Navigation
// =============================

function showSection(sectionId) {

    const sections = [
        "dashboardSection",
        "analyticsSection",
        "predictionSection",
        "feedbackPageSection",
        "settingsSection"
    ];

    sections.forEach(function(id) {
        document.getElementById(id).style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";
}
// Search Customer
const searchInput = document.getElementById("searchCustomer");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let rows = document.querySelectorAll("#analyticsSection tbody tr");

        rows.forEach(function(row) {

            let customerId = row.cells[0].textContent.toLowerCase();

            if (customerId.includes(value)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });
}
const feedbackForm = document.getElementById("feedbackForm");

if (feedbackForm) {

    feedbackForm.addEventListener("submit", function(event) {

        event.preventDefault();

        document.getElementById("successMessage").style.display = "block";

        feedbackForm.reset();

    });

}
const homeBtn = document.getElementById("homeBtn");

if(homeBtn){

    homeBtn.addEventListener("click", function(){

        let goHome = confirm("Go back to the Home Page?");

        if(goHome){

            window.location.href="/";

        }

    });

}
new Chart(document.getElementById("reasonChart"), {

    type: "bar",

    data: {

        labels: reasonLabels,

        datasets: [{

            label: "Customers",

            data: reasonValues

        }]

    }

});
