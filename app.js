const BASE_URL = 'https://v6.exchangerate-api.com/v6/a9e8a039b493683b348958d1/pair/';

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
      });
}

const updateExchangeRate = async (evt) => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;

    if(amtValue ==="" || amtValue < 1){
        amtValue = 1;
        amount.value = 1;
    }

    const URL = `${BASE_URL}/${fromCurr.value}/${toCurr.value}/${amtValue}`;
    let response = await fetch(URL);
    let data = await response.json();
    if(data['result'] === 'success'){
      let exchangeValue = data['conversion_result'];
      msg.innerText = `${amtValue} ${fromCurr.value} = ${exchangeValue} ${toCurr.value}`;
    } else{
      alert("This Country is not supported! Try Another!");
    }
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
  });
