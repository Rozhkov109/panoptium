export class Helper {
    static Color = class {
        static convertHEXtoRGBA(hex, alpha = 1) {

            if (hex == null || hex === "#000000" || hex === "#000") {
                return ``
            }

            hex = hex.replace(/^#/, '');
            if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join('');
            }

            const r = parseInt(hex.slice(0, 2), 16);
            const g = parseInt(hex.slice(2, 4), 16);
            const b = parseInt(hex.slice(4, 6), 16);

            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
    }

    static HTML = class {
        static dataCardsConfig = [
            {
                id: "fear-and-greed",
                title: "Fear and Greed",
                type: "fear-and-greed"
            },
            {
                id: "btc-dominance",
                title: "Bitcoin Dominance",
                type: "crypto-market"
            },
            {
                id: "eth-dominance",
                title: "Ethereum Dominance",
                type: "crypto-market"
            },
            {
                id: "market-cap",
                title: "Market Capitalization",
                type: "crypto-market"
            },
            {
                id: "top-500",
                title: "S&P 500 (SPDR ETF)",
                ticker: "SPY",
                cardColor: "#a80000",
                type: "stock-market"
            },
            {
                id: "dow-jones",
                title: "Dow Jones (SPDR ETF)",
                ticker: "DIA",
                cardColor: "#00b399",
                type: "stock-market"
            },
            {
                id: "nasdaq",
                title: "Nasdaq Composite (Invesco QQQ Trust ETF)",
                ticker: "QQQ",
                cardColor: "#125883",
                type: "stock-market"
            },
            {
                id: "russel-2000",
                title: "Russel 2000 (iShares ETF)",
                ticker: "IWM",
                cardColor: "#6e0440",
                type: "stock-market"
            },
            {
                id: "volatility-index",
                title: "Volatility Index (iPath VIX ETN)",
                ticker: "VXX",
                cardColor: "#0092fa",
                type: "stock-market"
            },
            {
                id: "gold",
                title: "Gold",
                ticker: "XAUUSD",
                cardColor: "#e4d100",
                type: "stock-market"
            },
            {
                id: "silver",
                title: "Silver",
                ticker: "XAGUSD",
                cardColor: "#c1c1c1",
                type: "stock-market"
            },
            {
                id: "btc-rank",
                title: "Rank",
                cardColor: "#df9901",
                type: "simple"
            },
            {
                id: "btc-cap",
                title: "Capitalization",
                cardColor: "#df9901",
                type: "simple"
            },
            {
                id: "btc-dom",
                title: "Dominance",
                cardColor: "#df9901",
                type: "simple"
            },
            {
                id: "btc-price",
                title: "Price",
                cardColor: "#df9901",
                type: "bitcoin-full"
            }
        ]

        static createHtmlElement(tag, className, textContent = "", attributes = {}) {
            const el = document.createElement(tag)
            el.className = className
            el.textContent = textContent
            for (const [key, value] of Object.entries(attributes)) {
                el.setAttribute(key, value.toString())
            }
            return el
        }

        static setTrendIconDataByNumber(number,imgHtmlElement) {
            const normalizedNumber = parseFloat(number)

            if(normalizedNumber < 0) {
                imgHtmlElement.setAttribute("src","/images/red-arrow.png")
                imgHtmlElement.setAttribute("alt","red-arrow.png")
            }
            else if(normalizedNumber > 0) {
                imgHtmlElement.setAttribute("src","/images/green-arrow.png")
                imgHtmlElement.setAttribute("alt","green-arrow.png")
            }
        }

        static createDataCardFrame(cardId) {
            const card = this.createHtmlElement("div","data-card")
            this.dataCardsConfig.forEach(config => {
                if(config.id === cardId) {
                    card.setAttribute("id", config.id)
                    card.innerHTML = `
                    <h3 class="data-card-header">${config.title}</h3>
                    <div class="data-card-wrapper"></div>`

                    const cardWrapper = card.getElementsByClassName("data-card-wrapper")[0]
                    cardWrapper.innerHTML = `<p class="main-data" id="${config.id}-main-data"></p>`

                    if (config.type === "fear-and-greed") {
                        cardWrapper.innerHTML += `
                        <p class="additional-data" id="${config.id}-additional-data"></p>`
                    }
                    else if(config.type === "crypto-market" || config.type === "bitcoin") {
                        cardWrapper.innerHTML += `
                        <div class="additional-data-wrapper">
                            <p class="additional-data">1d%:</p>
                            <div class="percent-change-wrapper">
                                <p class="additional-data" id="${config.id}-day-change"></p>
                                <img class="trend-icon-small" id="${config.id}-day-trend-icon" alt="">
                            </div>
                        </div>`
                    }
                    else if (config.type === "stock-market") {
                        cardWrapper.innerHTML += `
                            <div class="additional-data-wrapper">
                                <p class="additional-data">1d%:</p>
                                <p class="additional-data" id="${config.id}-day-ago-price"></p>
                                <div class="percent-change-wrapper">
                                    <p class="additional-data" id="${config.id}-day-change"></p>
                                    <img class="trend-icon-small" id="${config.id}-day-trend-icon" alt="">
                                </div>
                            </div>
                                
                            <div class="additional-data-wrapper">
                                <p class="additional-data">1w%:</p>
                                <p class="additional-data" id="${config.id}-week-ago-price"></p>
                                <div class="percent-change-wrapper">
                                    <p class="additional-data" id="${config.id}-week-change"></p>
                                    <img class="trend-icon-small" id="${config.id}-week-trend-icon" alt="">
                                </div>
                            </div>
                                
                            <div class="additional-data-wrapper">
                                <p class="additional-data">1m%:</p>
                                <p class="additional-data" id="${config.id}-month-ago-price"></p>
                                <div class="percent-change-wrapper">
                                    <p class="additional-data" id="${config.id}-month-change"></p>
                                    <img class="trend-icon-small" id="${config.id}-month-trend-icon" alt="">
                                </div>
                            </div>`
                        card.style.height = "270px"
                        card.style.width = "290px"
                    }
                    else if (config.type === "bitcoin-full") {
                        cardWrapper.innerHTML += `
                            <div class="additional-data-wrapper">
                                <p class="additional-data">1d%:</p>
                                <div class="percent-change-wrapper">
                                    <p class="additional-data" id="${config.id}-day-change"></p>
                                    <img class="trend-icon-small" id="${config.id}-day-trend-icon" alt="">
                                </div>
                            </div>
                                
                            <div class="additional-data-wrapper">
                                <p class="additional-data">1w%:</p>
                                <div class="percent-change-wrapper">
                                    <p class="additional-data" id="${config.id}-week-change"></p>
                                    <img class="trend-icon-small" id="${config.id}-week-trend-icon" alt="">
                                </div>
                            </div>
                                
                            <div class="additional-data-wrapper">
                                <p class="additional-data">1m%:</p>
                                <div class="percent-change-wrapper">
                                    <p class="additional-data" id="${config.id}-month-change"></p>
                                    <img class="trend-icon-small" id="${config.id}-month-trend-icon" alt="">
                                </div>
                            </div>`
                        card.style.height = "270px"
                        card.style.width = "290px"
                    }
                    card.style.background = config.cardColor;
                }
            })
            return card.hasChildNodes() ? card : null
        }

        static fillBtcCard (card, jsonResponse) {
            const cardId = card.id

            if(cardId === "btc-rank") {
                card.querySelector(`#${cardId}-main-data`).textContent = "#" + jsonResponse.rank
                card.querySelector(`#${cardId}-main-data`).style.fontSize = "40px"
            }
            else if(cardId === "btc-cap")  {
                card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToMarketCap(jsonResponse.marketCap)
                card.querySelector(`#${cardId}-main-data`).style.fontSize = "40px"
            }
            else if(cardId === "btc-dom") {
                card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToPercents(jsonResponse.btcDominance)
                card.querySelector(`#${cardId}-main-data`).style.fontSize = "40px"
            }
            else if(cardId === "btc-price") {
                card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToCoinPrice(jsonResponse.price)
                card.querySelector(`#${cardId}-main-data`).style.fontSize = "40px"

                Helper.Format.formatNumberToPercentWithColor(jsonResponse.priceChange1d,card.querySelector(`#${cardId}-day-change`))
                this.setTrendIconDataByNumber(jsonResponse.priceChange1d, card.querySelector(`#${cardId}-day-trend-icon`))

                Helper.Format.formatNumberToPercentWithColor(jsonResponse.priceChange7d,card.querySelector(`#${cardId}-week-change`))
                this.setTrendIconDataByNumber(jsonResponse.priceChange7d, card.querySelector(`#${cardId}-week-trend-icon`))

                Helper.Format.formatNumberToPercentWithColor(jsonResponse.priceChange30d,card.querySelector(`#${cardId}-month-change`))
                this.setTrendIconDataByNumber(jsonResponse.priceChange30d, card.querySelector(`#${cardId}-month-trend-icon`))
            }
        }

        static fillCryptoMarketCard(card, jsonResponse) {
            const cardId = card.id
            const combinedKey = cardId.replaceAll("-","_") + "_24h_percentage_change"

            if(cardId === "market-cap") card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToMarketCap(jsonResponse[cardId.replaceAll("-","_")])
            else card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToPercents(jsonResponse[cardId.replaceAll("-","_")])
            Helper.Format.formatNumberToPercentWithColor(jsonResponse[combinedKey], card.querySelector(`#${cardId}-day-change`))
            this.setTrendIconDataByNumber(jsonResponse[combinedKey],card.querySelector(`#${cardId}-day-trend-icon`))
        }

        static fillStockMarketCard(card, jsonResponse) {
            const cardId = card.id
            const cardConfig = this.dataCardsConfig.find(config => config.id === cardId)
            const asset = jsonResponse.stockMarketData.find(assetData => assetData.ticker === cardConfig.ticker)

            card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToCoinPrice(asset.data[0].closePrice)

            card.querySelector(`#${cardId}-day-ago-price`).textContent = Helper.Format.formatNumberToCoinPrice(asset.data[1].closePrice)
            let dayPercentChange = Helper.Format.getPercentChangeByTwoNumbers(asset.data[0].closePrice,asset.data[1].closePrice)
            Helper.Format.formatNumberToPercentWithColor(dayPercentChange,card.querySelector(`#${cardId}-day-change`))
            this.setTrendIconDataByNumber(dayPercentChange, card.querySelector(`#${cardId}-day-trend-icon`))

            card.querySelector(`#${cardId}-week-ago-price`).textContent = Helper.Format.formatNumberToCoinPrice(asset.data[2].closePrice)
            let weekPercentChange = Helper.Format.getPercentChangeByTwoNumbers(asset.data[0].closePrice,asset.data[2].closePrice)
            Helper.Format.formatNumberToPercentWithColor(weekPercentChange,card.querySelector(`#${cardId}-week-change`))
            this.setTrendIconDataByNumber(weekPercentChange, card.querySelector(`#${cardId}-week-trend-icon`))

            card.querySelector(`#${cardId}-month-ago-price`).textContent = Helper.Format.formatNumberToCoinPrice(asset.data[3].closePrice)
            let monthPercentChange = Helper.Format.getPercentChangeByTwoNumbers(asset.data[0].closePrice,asset.data[3].closePrice)
            Helper.Format.formatNumberToPercentWithColor(monthPercentChange,card.querySelector(`#${cardId}-month-change`))
            this.setTrendIconDataByNumber(monthPercentChange, card.querySelector(`#${cardId}-month-trend-icon`))
        }


        static getDataCard(cardId, data) {
            const card = this.createDataCardFrame(cardId)
            if (card && data && Object.keys(data).length > 0) {
                let mainText
                let additionalText

                if(card.id === "fear-and-greed") {
                    mainText = card.querySelector("#fear-and-greed-main-data")
                    additionalText = card.querySelector("#fear-and-greed-additional-data")
                    mainText.textContent = (mainText) ?  data.index : "No data"
                    if(additionalText) {
                        additionalText.textContent = data.classification
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
                    }
                    else additionalText.textContent = "No data"
                }
                if(["btc-dominance","eth-dominance","market-cap"].includes(card.id)) {
                    this.fillCryptoMarketCard(card,data)
                }

                if(["top-500","dow-jones","nasdaq","russel-2000","volatility-index","gold","silver"].includes(card.id)) {
                    this.fillStockMarketCard(card, data)
                }
                if(["btc-rank","btc-dom","btc-cap","btc-price"].includes(card.id)) {
                    this.fillBtcCard(card, data)
                }
            }
            return card;
        }

        static createCryptoCurrenciesTable(coinsData) {
            const table = this.createHtmlElement("table", "top-100-coins-table")

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
                </thead>
                <tbody>
                </tbody>`

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

                table.appendChild(tr)
            })
            return table
        }
    }

    static Style = class {
        static fillPercentChangeTableDataCell(tdHtmlElement, number) {
            let normalizedNumber = parseFloat(number)
            if (isNaN(normalizedNumber)) {
                tdHtmlElement.textContent = "No Data"
                return
            }

            tdHtmlElement.style.fontSize = "14px"
            if (normalizedNumber < 0) {
                tdHtmlElement.style.background = "rgba(248,0,28,0.3)"
                tdHtmlElement.textContent = normalizedNumber.toString() + "%"
            }
            else if (normalizedNumber > 0) {
                tdHtmlElement.style.background = "rgba(0,255,112,0.3)"
                tdHtmlElement.textContent = "+" + normalizedNumber.toString()+ "%"
            }
            else if (normalizedNumber === 0) tdHtmlElement.textContent = normalizedNumber.toString() + "%"
            else tdHtmlElement.textContent = "No Data"
        }
    }

    static Format = class {
        static formatNumberToPercents(number) {
            let normalizedNumber = parseFloat(number)
            if (!isNaN(normalizedNumber)) {
                normalizedNumber = normalizedNumber.toFixed(2)
                return normalizedNumber + "%"
            }
            else return "No Data"
        }

       static formatNumberToMarketCap(marketCap) {
            if (marketCap >= 1e12) {
                return "$" + (marketCap / 1e12).toFixed(3) + "T";
            } else if (marketCap >= 1e9) {
                return "$" + (marketCap / 1e9).toFixed(3) + "B";
            } else if (marketCap >= 1e6) {
                return "$" + (marketCap / 1e6).toFixed(3) + "M";
            } else if (marketCap >= 1e3) {
                return "$" + (marketCap / 1e3).toFixed(3) + "K";
            }
            else {
                return "$" + marketCap.toLocaleString();
            }
       }
        static formatNumberToCoinPrice(price) {
            let normalizedPrice = parseFloat(price).toFixed(15)

            if (normalizedPrice >= 1e3) {
                return "$" + parseInt(normalizedPrice);
            } else if (normalizedPrice >= 1e2) {
                return "$" + parseFloat(normalizedPrice).toFixed(1);
            } else if (normalizedPrice >= 1e1) {
                return "$" + parseFloat(normalizedPrice).toFixed(2);
            } else if (normalizedPrice >= 1) {
                return "$" + parseFloat(normalizedPrice).toFixed(3);
            } else if (normalizedPrice >= 0.001) {
                return "$" + parseFloat(normalizedPrice).toFixed(4);
            } else if (normalizedPrice >= 0.0001) {
                return "$" + parseFloat(normalizedPrice).toFixed(5);
            }
            else {
                const str = normalizedPrice.split('.')[1] || ''

                let zeroCount = 0
                for (let char of str) {
                    if (char === '0') zeroCount++
                    else break
                }
                const significant = str.slice(zeroCount, zeroCount + 3)
                return '$0.0(' + zeroCount +')' + significant
            }
        }

        static formatNumberToPercentWithColor(number, textHtmlElement) {
           let normalizedNumber = parseFloat(number)
           if(!isNaN(normalizedNumber)) {
               normalizedNumber = normalizedNumber.toFixed(2)
               if(normalizedNumber < 0) {
                  textHtmlElement.style.color = "#ca0101"
                  textHtmlElement.textContent = normalizedNumber + "%"
               } else if (normalizedNumber > 0) {
                   textHtmlElement.style.color = "#01ca5f"
                   textHtmlElement.textContent = "+" + normalizedNumber + "%"
               } else {
                   textHtmlElement.textContent = normalizedNumber + "%"
               }
           }
           else {
                textHtmlElement.textContent = "No Data"
           }
        }

        static getPercentChangeByTwoNumbers(firstNumber,secondNumber) {
            let normalizedFirstNumber = parseFloat(firstNumber)
            let normalizedSecondNumber = parseFloat(secondNumber)
            return ((normalizedFirstNumber - normalizedSecondNumber) / normalizedSecondNumber) * 100
        }
    }

    static FetchAPI = class {
        static async getJSONResponse(url) {
            let responseBody = await fetch(url)
            return await responseBody.json()
        }
    }
}