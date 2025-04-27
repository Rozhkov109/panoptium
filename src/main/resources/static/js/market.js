import {Helper} from "./helper.js";

document.addEventListener("DOMContentLoaded", async () => {
    let cryptoData
    let fearAndGreedData
    let coinsData
    let stockMarketData

    async function getData() {
       cryptoData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/market/crypto")
       fearAndGreedData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/market/fear-and-greed")
       coinsData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/market/top-100-crypto-currencies")
       stockMarketData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/market/stock")
    }

    function createElements() {
        // Crypto cards
        const cryptoMarketCardWrapper = Helper.HTML.createHtmlElement("div","data-card-container", "", {id: "crypto-market-cards"})
        cryptoMarketCardWrapper.append(
            Helper.HTML.getDataCard("fear-and-greed", fearAndGreedData),
            Helper.HTML.getDataCard("btc-dominance", cryptoData),
            Helper.HTML.getDataCard("eth-dominance", cryptoData),
            Helper.HTML.getDataCard("market-cap", cryptoData),
        )

        const contentWrapper = document.querySelector(".content-wrapper")
        if(cryptoMarketCardWrapper.hasChildNodes()) {
            contentWrapper.insertBefore(cryptoMarketCardWrapper,contentWrapper.querySelector("#crypto-data").nextSibling)
        }

        // Stock market cards
        const stockMarketCardWrapper = Helper.HTML.createHtmlElement("div","data-card-container", "", {id: "stock-market-cards"})
        stockMarketCardWrapper.append(
            Helper.HTML.getDataCard("top-500", stockMarketData),
            Helper.HTML.getDataCard("dow-jones", stockMarketData),
            Helper.HTML.getDataCard("nasdaq", stockMarketData),
            Helper.HTML.getDataCard("russel-2000", stockMarketData),
            Helper.HTML.getDataCard("volatility-index", stockMarketData),
            Helper.HTML.getDataCard("gold", stockMarketData),
            Helper.HTML.getDataCard("silver", stockMarketData)
        )
        if(stockMarketCardWrapper.hasChildNodes()) {
            contentWrapper.insertBefore(stockMarketCardWrapper,contentWrapper.querySelector("#stock-data").nextSibling)
        }

        // Table
        const top100CoinsTable = Helper.HTML.createCryptoCurrenciesTable(coinsData)
        if(top100CoinsTable.hasChildNodes()) {
            contentWrapper.insertBefore(top100CoinsTable,contentWrapper.querySelector("#crypto-market-cards").nextSibling)
        }
    }

    await getData()
    createElements()
})