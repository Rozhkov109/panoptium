import {Helper} from "./helper.js";

let cryptoData
let fearAndGreedData
let coinsData
let stockMarketData
let fearAndGreedList

const contentWrapper = document.querySelector(".content-wrapper")

async function getData() {
    contentWrapper.insertBefore(Helper.HTML.getMessageWithSpinner(""),document.getElementById("stock-data").nextSibling)
    contentWrapper.insertBefore(Helper.HTML.getMessageWithSpinner(""),document.getElementById("crypto-data").nextSibling)

    cryptoData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/market/crypto")
    fearAndGreedData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/market/fear-and-greed")
    fearAndGreedList = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/market/fear-and-greed-list?limit=365")
    coinsData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/market/top-100-crypto-currencies")
    stockMarketData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/market/stock")

    document.querySelector(".loading-wrapper").remove()
    document.querySelector(".loading-wrapper").remove()
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


    if(cryptoMarketCardWrapper.hasChildNodes()) {
        contentWrapper.insertBefore(cryptoMarketCardWrapper,contentWrapper.querySelector("#crypto-data").nextSibling)
    }

    document.getElementById("fear-and-greed-chart").append(Helper.HTML.getFearGreedChartElement(fearAndGreedList))


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
    const top100CoinsTable = createCryptoCurrenciesTable(coinsData)
    if(top100CoinsTable.hasChildNodes()) {
        contentWrapper.insertBefore(top100CoinsTable,contentWrapper.querySelector("#fear-and-greed-chart").nextSibling)
    }
}

function createCryptoCurrenciesTable(coinsData) {
    const table = Helper.HTML.createHtmlElement("table", "top-100-coins-table", "", {id: "top-100-coins-table"})

    table.innerHTML = `
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>1d%</th>
                        <th>1w%</th>
                        <th>1m%</th>
                    </tr>
                </thead>`

    const tableBody = document.createElement("tbody")

    coinsData.coins.forEach(coinData => {
        const tr = document.createElement("tr")

        // Rank
        const tdRank = document.createElement("td")
        tdRank.textContent = coinData.rank

        // Name
        const tdNameContainer = Helper.HTML.createHtmlElement("td","coin-link","",{title: "Press to see the chart"})
        tdNameContainer.id = coinData.symbol

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
        tdNameContainer.style.backgroundColor = Helper.Color.convertHEXtoRGBA(coinData.color,0.6)

        // Price
        const tdPrice = document.createElement("td")
        tdPrice.textContent = Helper.Format.formatNumberToAssetPrice(coinData.price)

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

        tableBody.appendChild(tr)
    })
    table.append(tableBody)
    return table
}

function openCoinChart(coinId) {
    Helper.HTML.createTradingViewWidget(coinId,"asset-chart")
    Helper.HTML.openModalWindow("modal-asset-chart-container")
}

const toggleButton = document.getElementById("toggle-button");
let expanded = false;

function updateTableDisplay() {
    const rows = document.querySelectorAll("#top-100-coins-table tbody tr");
    console.log(rows.length)

    rows.forEach((row, index) => {
        (expanded || index < 10) ? row.classList.remove("hidden") : row.classList.add("hidden");
    });
    toggleButton.textContent = expanded ? "Hide" : "Show More"
}


toggleButton.addEventListener("click", () => {
    expanded = !expanded;
    updateTableDisplay();
});

document.getElementById("close-asset-chart-button").addEventListener("click", () => {
    Helper.HTML.closeModalWindow("modal-asset-chart-container")
})


document.addEventListener("DOMContentLoaded", async () => {
    await getData()
    await createElements()
    document.querySelectorAll(".coin-link").forEach((elem) => {
        elem.addEventListener('click', () => {
            openCoinChart(elem.id);
        });
    })
    updateTableDisplay()
})