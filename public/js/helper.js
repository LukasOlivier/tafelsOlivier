
function displayErrors(errors) {
    const $ul = document.querySelector("#errors");

    for (const field in errors) {
        for (const error of errors[field]) {
            console.error(error)
            if (error.includes("name")){
                addErrorClass(document.querySelector("#name"))
            }
            if (error.includes("number")){
                addErrorClass(document.querySelector("#number"))
            }
            if (error.includes("amount")){
                addErrorClass(document.querySelector("#amount"))
            }
            if (error.includes("from")){
                addErrorClass(document.querySelector("#from"))
            }
            if (error.includes("till")){
                addErrorClass(document.querySelector("#till"))
            }
        }
    };
}

function addErrorClass($element){
    $element.classList.add("error")
}

function fetchFromServer(url, method, body) {
    const options = buildOptions(method, body);

    return fetch(url, options)
        .then(res => res.json())
        .then(json => {
            if ("errors" in json) {
                throw json;
            } else {
                return json;
            }
        });
}

function buildOptions(method, body) {
    const options = {};

    options.method = method;
    options.headers = {
        "Content-Type": "application/json"
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return options;
}
