"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("form").addEventListener("submit", processForm);
    document.querySelectorAll("input").forEach(input => input.addEventListener("change", () => input.classList.remove("error")));


    function processForm() {
        const booking = buildBooking();
        fetchFromServer("http://localhost/api/order", "POST", booking)
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

        fetchFromServer("http://localhost/api/stock", "GET")
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
            from: new Date().toLocaleDateString(),
            till: document.querySelector("#till").value,
            comment: document.querySelector("#commment").value
        };
    }
}
