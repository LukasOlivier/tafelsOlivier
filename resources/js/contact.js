"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.querySelector("form").addEventListener("submit", processForm);
    document.querySelectorAll("input").forEach(input => input.addEventListener("change", () => input.classList.remove("error")));


    function processForm() {
        const message = buildMessage();
        fetchFromServer(`${apiUrl}/message`, "POST", message)
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

    function buildMessage() {
        return {
            firstname: document.querySelector("#firstname").value,
            lastname: document.querySelector("#lastname").value,
            mail: document.querySelector("#mail").value,
            phone: document.querySelector("#tel").value,
            message: document.querySelector("#message").value,
        };
    }
}
