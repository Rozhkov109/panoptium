import {Helper} from "./helper.js";

document.addEventListener("DOMContentLoaded", () => {
    const cryptoDataButton = document.getElementById("crypto-data-button")

    let cryptoData
    let fearAndGreedData
    let coinsData
    let stockMarketData

    async function getData() {
       cryptoData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/market/crypto")
       fearAndGreedData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/market/fear-and-greed")
       coinsData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/market/top-100-crypto-currencies")
       stockMarketData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/market/stock")
    }

    function createCards() {
        const cryptoMarketCardWrapper = Helper.HTML.createHtmlElement("div","data-card-container")
        cryptoMarketCardWrapper.append(
            Helper.HTML.getDataCard("fear-and-greed", fearAndGreedData),
            Helper.HTML.getDataCard("btc-dominance", cryptoData),
            Helper.HTML.getDataCard("eth-dominance", cryptoData),
            Helper.HTML.getDataCard("market-cap", cryptoData),
        )
        if(cryptoMarketCardWrapper.hasChildNodes()) {
            const contentWrapper = document.querySelector(".content-wrapper")
            const header = contentWrapper.querySelector("#crypto-data")
            contentWrapper.insertBefore(cryptoMarketCardWrapper,header.nextSibling)
        }

        const stockMarketCardWrapper = Helper.HTML.createHtmlElement("div","data-card-container")
        stockMarketCardWrapper.append(
            Helper.HTML.getDataCard("gold", stockMarketData),
            Helper.HTML.getDataCard("silver", stockMarketData)
        )
        if(stockMarketCardWrapper.hasChildNodes()) {
            const contentWrapper = document.querySelector(".content-wrapper")
            const header = contentWrapper.querySelector("#stock-data")
            contentWrapper.insertBefore(stockMarketCardWrapper,header.nextSibling)
        }
    }

    function fillCryptoCurrenciesTable() {
        const top100CoinsTableBody = document.getElementsByClassName("top-100-coins-table")[0].getElementsByTagName("tbody")[0]

        coinsData.coins.forEach(coinData => {
            const tr = document.createElement("tr")

            // Rank
            const tdRank = document.createElement("td")
            tdRank.textContent = coinData.rank

            // Name
            const tdNameContainer = document.createElement("td")
                    const coinNameWrapper = document.createElement("div")
                    coinNameWrapper.classList.add("coin-info-container")
                        const coinImage = document.createElement("img")
                        coinImage.classList.add("coin-icon")
                        coinImage.setAttribute("src", coinData.iconUrl)
                        coinImage.setAttribute("alt", coinData.name + "-icon")
                        const coinNameContainer = document.createElement("div")
                        coinNameContainer.classList.add("coin-name-container")
                            const coinSymbol = document.createElement("p")
                            coinSymbol.classList.add("coin-symbol-text")
                            const coinFullName = document.createElement("p")
                            coinFullName.classList.add("coin-full-name-text")

            coinSymbol.textContent = coinData.symbol
            coinFullName.textContent = coinData.name
            coinNameContainer.append(coinSymbol, coinFullName)

            coinNameWrapper.append(coinImage)
            coinNameWrapper.append(coinNameContainer)

            tdNameContainer.append(coinNameWrapper)
            tdNameContainer.style.background = Helper.Color.convertHEXtoRGBA(coinData.color,0.6)

            // Price
            const tdPrice = document.createElement("td")
            tdPrice.textContent = Helper.Format.formatNumberToCoinPrice(coinData.price)

            // Market Cap
            const tdMarketCap = document.createElement("td")
            tdMarketCap.textContent = Helper.Format.formatNumberToMarketCap(coinData.marketCap)

            // 1,7,30 days price change
            const td1dPriceChange = document.createElement("td")
            const td7dPriceChange = document.createElement("td")
            const td30dPriceChange = document.createElement("td")

            Helper.Style.fillPercentChangeTableDataCell(td1dPriceChange, coinData.priceChange1d)
            Helper.Style.fillPercentChangeTableDataCell(td7dPriceChange, coinData.priceChange7d)
            Helper.Style.fillPercentChangeTableDataCell(td30dPriceChange, coinData.priceChange30d)

            tr.append(tdRank, tdNameContainer, tdPrice, tdMarketCap, td1dPriceChange, td7dPriceChange, td30dPriceChange)

            top100CoinsTableBody.appendChild(tr)
        })
    }

    cryptoDataButton.addEventListener("click", async () => {
        await getData()
        createCards()
        fillCryptoCurrenciesTable()
    })

})