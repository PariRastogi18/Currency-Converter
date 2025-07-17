const btn = document.querySelector("#btn-submit");
const inputCurrency = document.querySelector("#currency");
const tableBody = document.querySelector("tbody");

async function populateDropdown() {
  const url =
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_3kBZRET9JMK38sJZeVvMc3uolG8AAmN1jDCyBSN6";
  let response = await fetch(url);
  let rJSON = await response.json();
  let options = "";
  for (let key of Object.keys(rJSON["data"])) {
    options += `<option value="${rJSON["data"][key]["code"]}">${rJSON["data"][key]["code"]}</option>`;
  }
  inputCurrency.innerHTML = options;
}
populateDropdown();

const populate = async (value, currency) => {
  let myStr = "";
  url =
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_3kBZRET9JMK38sJZeVvMc3uolG8AAmN1jDCyBSN6&base_currency=" +
    currency;
  let reponse = await fetch(url);
  let rJSON = await reponse.json();
  // document.querySelector("#output").style.display = "block";
  console.log(rJSON);
  for (let key of Object.keys(rJSON["data"])) {
    myStr += ` <tr>
                  <td>${key}</td>
                  <td>${rJSON["data"][key]["code"]}</td>
                  <td>${Math.round(rJSON["data"][key]["value"] * value)}</td>
                </tr>`;
  }
  tableBody.innerHTML = myStr;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const value = parseInt(document.querySelector("input[name=quantity]").value);
  const currency = document.querySelector("select[name=Currency]").value;
  populate(value, currency);
});
