import { Helper } from "./helper.js";

document.addEventListener("DOMContentLoaded", async () => {

    let btcData
    async function getData() {
        btcData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/bitcoin/info")
    }

    function createCards() {
        const btcCardWrapper = Helper.HTML.createHtmlElement("div","data-card-container", "", {id: "btc-cards"})
        btcCardWrapper.append(
            Helper.HTML.getDataCard("btc-rank", btcData),
            Helper.HTML.getDataCard("btc-cap", btcData),
            Helper.HTML.getDataCard("btc-dom", btcData))
        const contentWrapper = document.querySelector(".content-wrapper")
        if(btcCardWrapper.hasChildNodes()) {
            contentWrapper.insertBefore(btcCardWrapper,contentWrapper.querySelector("#bitcoin-header").nextSibling)
        }
        const btcPriceCardWrapper = Helper.HTML.createHtmlElement("div","data-card-container", "", {id: "btc-price"})
        btcPriceCardWrapper.append(Helper.HTML.getDataCard("btc-price", btcData))
        if(btcPriceCardWrapper.hasChildNodes()) {
            contentWrapper.insertBefore(btcPriceCardWrapper,contentWrapper.querySelector("#btc-cards").nextSibling)
        }
    }

    await getData()
    createCards()
})