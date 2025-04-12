import { Helper } from "./helper.js";

document.addEventListener("DOMContentLoaded", () => {
    const btcButton = document.getElementById("btc-button")
    const priceText = document.getElementById("btc-price")

    async function setBtcPrice() {
        let btcData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/bitcoin/price")
        priceText.textContent = btcData.usd;
    }

    btcButton.addEventListener("click",  () => {
        setBtcPrice()
    })
})