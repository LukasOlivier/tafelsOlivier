"use strict";
const apiUrl = "http://127.0.0.1:8000/api"
document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("form").addEventListener("submit", processForm);
    document.querySelectorAll("input").forEach(input => input.addEventListener("change", () => input.classList.remove("error")));
    document.querySelector("#amount").addEventListener('input', calculatePrice)
    document.querySelector("#from").addEventListener('input', calculatePrice)
    document.querySelector("#till").addEventListener('input', calculatePrice)
    calculatePrice();
    getStock();

    function calculatePrice() {
        const pricePerTable = 5;
        const amountOfDays = calculateAmountOfDays();
        const amountOfTables = document.querySelector("#amount").value;
        let price = amountOfDays * amountOfTables * pricePerTable
        if (isNaN(price)) {
            price = 0;
        }
        document.querySelector("#price").innerText = `${price}`;
    }

    function calculateAmountOfDays() {
        const end = new Date(document.querySelector("#till").value)
        const start = new Date(document.querySelector("#from").value);
        const timeDifference = end.getTime() - start.getTime();
        return Math.abs(timeDifference / (1000 * 3600 * 24));
    }

    function processForm(e) {
        e.preventDefault()
        const booking = buildBooking();
        const occupation = buildOccupation();

        fetchFromServer(`${apiUrl}/order`, "POST", booking)
            .then(data => {
                //displayThankYou();
            })
            .catch(err => {
                if ("errors" in err) {
                    displayErrors(err.errors);
                } else {
                    console.errors(err);
                }
            });
    }


    function getStock() {
        const $select = document.querySelector("#amount");
        fetchFromServer(`${apiUrl}/stock`, "GET")
            .then(json => {
                const data = json.data;
                data.forEach(stock => {
                    document.querySelector("#amount").placeholder = `Max ${stock.amount} beschikbaar`
                    document.querySelector("#amount").max = `${stock.amount}`
                })
            })
    }


    function buildBooking() {
        return {
            name: document.querySelector("#name").value,
            number: document.querySelector("#number").value,
            amount: document.querySelector("#amount").value,
            from: document.querySelector("#from").value,
            till: document.querySelector("#till").value,
            comment: document.querySelector("#commment").value,
            price: document.querySelector("#price").innerText
        };
    }

    function buildOccupation() {
        return {
            name: document.querySelector("#name").value,
            amount: document.querySelector("#amount").value,
        };
    }
}
