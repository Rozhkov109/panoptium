import {Helper} from "./helper.js";

document.addEventListener("DOMContentLoaded", () => {
    const cryptoDataButton = document.getElementById("crypto-data-button")
    const fearAndGreedCard = document.getElementById("fear-and-greed")
    const btcCard = document.getElementById("btc-dominance")
    const ethCard = document.getElementById("eth-dominance")
    const marketCapCard = document.getElementById("market-cap")
    const cards = [fearAndGreedCard, btcCard, ethCard, marketCapCard]

    const top100CoinsTableBody = document.getElementsByClassName("top-100-coins-table")[0].getElementsByTagName("tbody")[0]

    let marketData
    let fearAndGreedData
    let coinsData

    async function getData() {
        marketData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/market/crypto-data")
        fearAndGreedData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/market/fear-and-greed")
        coinsData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/market/top-100-crypto-currencies")
    }


    async function fillCards() {
        cards.forEach(card => {
            const mainText = card.getElementsByClassName("main-data")[0]
            const additionalText = card.getElementsByClassName("additional-data")[0]
            const percentChangeIcon = card.getElementsByClassName("trend-icon-small")[0]

            switch (card.id) {
                case "fear-and-greed":
                    mainText.textContent = fearAndGreedData.index
                    additionalText.textContent = fearAndGreedData.classification
                        switch (additionalText.textContent) {
                            case "Extreme Fear":
                                additionalText.style.color = "#ca0101";
                                break;
                            case "Fear":
                                additionalText.style.color = "#ff8c00";
                                break;
                            case "Neutral":
                                additionalText.style.color = "#f1c40f";
                                break;
                            case "Greed":
                                additionalText.style.color = "#27ae60";
                                break;
                            case "Extreme Greed":
                                additionalText.style.color = "#2fa016";
                                break;
                            default:
                                additionalText.style.color = "#000";
                        }
                    break;
                case "btc-dominance":
                    mainText.textContent = parseFloat(marketData.btc_dominance).toFixed(2) + "%"
                    Helper.Format.formatNumberToPercentWithColorAndPicture(marketData.btc_dominance_24h_percentage_change, additionalText, percentChangeIcon)
                    break;
                case "eth-dominance":
                    mainText.textContent = parseFloat(marketData.eth_dominance).toFixed(2) + "%"
                    Helper.Format.formatNumberToPercentWithColorAndPicture(marketData.eth_dominance_24h_percentage_change, additionalText, percentChangeIcon)
                    break;
                case "market-cap":
                    mainText.textContent = Helper.Format.formatMarketCap(marketData.total_market_cap)
                    Helper.Format.formatNumberToPercentWithColorAndPicture(marketData.total_market_cap_yesterday_percentage_change, additionalText, percentChangeIcon)
                    break;
                default:
                    mainText.textContent = "Data not available";
                    additionalText.textContent = "Sorry";
                    break;
            }
        })
    }

    async function showTop100CryptoCurrenciesTable() {
        coinsData.forEach(coinData => {
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
            tdPrice.textContent = Helper.Format.formatCoinPrice(coinData.price)

            // Market Cap
            const tdMarketCap = document.createElement("td")
            tdMarketCap.textContent = Helper.Format.formatMarketCap(coinData.marketCap)

            // 30 days price change
            const td30dPriceChange = document.createElement("td")

            let change = parseFloat(coinData.change)
            if (change < 0) {
                td30dPriceChange.style.background = "rgba(248,0,28,0.3)"
                td30dPriceChange.textContent = change.toString() + "%"
            }
            else if (change > 0) {
                td30dPriceChange.style.background = "rgba(0,255,112,0.3)"
                td30dPriceChange.textContent = "+" +change.toString()+ "%"
            }
            else if (change === 0) td30dPriceChange.textContent = change.toString() + "%"
            else td30dPriceChange.textContent = "No Data"

            tr.append(tdRank, tdNameContainer, tdPrice, tdMarketCap, td30dPriceChange)

            top100CoinsTableBody.appendChild(tr)
        })
    }

    cryptoDataButton.addEventListener("click", async () => {
        await getData()
        fillCards()
        showTop100CryptoCurrenciesTable()
    })

})