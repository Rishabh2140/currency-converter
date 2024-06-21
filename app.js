// const base_url = "https://api.frankfurter.app/latest?amount=100&from=INR&to=USD";
let From = "USD";
let To = "INR";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")



for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }


        if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        if (select.name === "from") {
            From = evt.target.value;
        }
        else if (select.name === "to") {
            To = evt.target.value;
        }

    });

}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;

    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    };

    // const URL = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    const url_1 = `https://api.frankfurter.app/latest?amount=1&from=${From}&to=${To}`;
    let rate = 1;
    let data;
    if (From != To) {
        let response;
        response = await fetch(url_1);
        data = await response.json();
        if (data["message"] == 'not found') {
            msg.style.color = 'red';
            return msg.innerText = "Sorry we cannot fetch api for the selected countries";
        }
        else {
            msg.style.color = 'black';
            rate = data.rates[To];
        }
    }

    //  let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtValue * rate;
    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}


btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load", () => {
    updateExchangeRate();
})