"use strict";
const apiUrl = "https://tafelsolivier.herokuapp.com/bestellen.html";

document.addEventListener("DOMContentLoaded", init);

function init() {
    getStock();
    getOrders();
    getMessages();


    function getStock() {
        fetchFromServer(`${apiUrl}/stock`, "GET")
            .then(json => {
                const data = json.data;
                data.forEach(stock => {
                    document.querySelector("#stock").innerText = `${stock.amount} tafels in stock`
                })
            })
    }

    function getOrders() {
        fetchFromServer(`${apiUrl}/orders`, "GET")
            .then(json => {
                const data = json.data;
                data.forEach(order => {
                    document.querySelector("#orders").insertAdjacentHTML("beforeend", `<ul><li><em>Naam:</em> ${order.name}</li><li><em>Tel:</em> ${order.number}</li><li><em>Aantal:</em> ${order.amount}</li><li><em>Vanaf:</em> ${order.from}</li><li><em>Tot:</em> ${order.till}</li><li><em>Opmerking:</em> ${order.comment}</li><li><em>Prijs:</em> €${order.price}</li></ul>`)
                })
            })
    }

    function getMessages() {
        fetchFromServer(`${apiUrl}/messages`, "GET")
            .then(json => {
                const data = json.data;
                data.forEach(order => {
                    document.querySelector("#messages").insertAdjacentHTML("beforeend", `<ul><li><em>Voornaam:</em> ${order.firstname}</li><li><em>Achternaam:</em> ${order.lastname}</li><li><em>E-mail:</em> ${order.mail}</li><li><em>Tel:</em> ${order.phone}</li><li><em>Bericht:</em> ${order.message}</li></ul>`)
                })
            })
    }
}
