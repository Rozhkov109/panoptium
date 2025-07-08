import {WalletManager} from "./wallet.js";

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
                card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToAssetPrice(jsonResponse.price)
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

            card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToAssetPrice(asset.data[0].closePrice)

            card.querySelector(`#${cardId}-day-ago-price`).textContent = Helper.Format.formatNumberToAssetPrice(asset.data[1].closePrice)
            let dayPercentChange = Helper.Format.getPercentChangeByTwoNumbers(asset.data[0].closePrice,asset.data[1].closePrice)
            Helper.Format.formatNumberToPercentWithColor(dayPercentChange,card.querySelector(`#${cardId}-day-change`))
            this.setTrendIconDataByNumber(dayPercentChange, card.querySelector(`#${cardId}-day-trend-icon`))

            card.querySelector(`#${cardId}-week-ago-price`).textContent = Helper.Format.formatNumberToAssetPrice(asset.data[2].closePrice)
            let weekPercentChange = Helper.Format.getPercentChangeByTwoNumbers(asset.data[0].closePrice,asset.data[2].closePrice)
            Helper.Format.formatNumberToPercentWithColor(weekPercentChange,card.querySelector(`#${cardId}-week-change`))
            this.setTrendIconDataByNumber(weekPercentChange, card.querySelector(`#${cardId}-week-trend-icon`))

            card.querySelector(`#${cardId}-month-ago-price`).textContent = Helper.Format.formatNumberToAssetPrice(asset.data[3].closePrice)
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

        static getMessageWindow(type,message) {
            const existing = document.querySelector(".message-wrapper");
            if (existing) {
                existing.remove();
            }

            const messageWindow = this.createHtmlElement("div","message-wrapper")
            messageWindow.innerHTML += `
                    <p class="message-header" >${type}</p>
                    <p class="message-text">${message}</p>
                    <button class="message-button">Ok</button>`
            messageWindow.querySelector(`.message-button`).addEventListener('click', function() { messageWindow.remove()})
            return messageWindow;
        }

        static getMessageWithSpinner(messageText) {
            const message = this.createHtmlElement("div", "loading-wrapper")
            message.innerHTML += `
            <div class="loading-wrapper">
                <div class="loading-message">
                    <p>${messageText}</p>
                    <div class="loading-slider"></div>
                </div>
            </div>`
            return message;
        }

        static openModalWindow(elementId) {
            document.getElementById(elementId).classList.remove("hidden");
        }

        static closeModalWindow(elementId) {
            document.getElementById(elementId).classList.add("hidden");
        }

        static createTradingViewWidget(assetTicker, containerId) {
                const container = document.getElementById(containerId);
                if(container.innerHTML !== null) {
                    container.innerHTML = "";
                }

                const chartId = "tv_chart_" + assetTicker.toLowerCase();
                const chartDiv = document.createElement("div");
                chartDiv.id = chartId;
                container.append(chartDiv)

                new TradingView.widget({
                    container_id: chartId,
                    width: "100%",
                    height: 500,
                    symbol: `BINANCE:${assetTicker}USDT`,
                    interval: "D",
                    timezone: "Etc/UTC",
                    theme: "dark",
                    style: "1",
                    locale: "en",
                    toolbar_bg: "#f1f3f6",
                    enable_publishing: false,
                    allow_symbol_change: false,
                    hide_top_toolbar: false,
                    hide_side_toolbar: false,
                    hide_legend: false,
                    save_image: false,
                    studies: []
                });
        }

        static getFearGreedChartElement(rawData) {
            const container = this.createHtmlElement("div","chart");
            container.style.width = "100%";
            container.style.margin = "40px auto";

            const canvas = document.createElement("canvas");
            container.appendChild(canvas);

            const data = rawData.data.reverse();

            const labels = data.map(item => item.date);
            const values = data.map(item => item.index);
            const classifications = data.map(item => item.classification);

            const getColor = (type) => {
                switch (type.toLowerCase()) {
                    case "extreme fear": return "#ff0000";
                    case "fear": return "#ff6a00";
                    case "neutral": return "#aaaaaa";
                    case "greed": return "#00b300";
                    case "extreme greed": return "#009900";
                    default: return "#000000";
                }
            };

            const pointColors = classifications.map(getColor);

            new Chart(canvas.getContext("2d"), {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Fear And Greed Index",
                        data: values,
                        borderColor: "#0e46ff",
                        backgroundColor: "rgba(14, 79, 255, 0.1)",
                        pointBackgroundColor: pointColors,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            min: 0,
                            max: 100
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                afterLabel: (ctx) => `Classification: ${classifications[ctx.dataIndex]}`
                            }
                        }
                    }
                }
            });
            return container;
        }

        static getWalletBalanceChartElement(walletData) {
            const container = document.createElement("div");
            container.className = "chart";
            container.style.width = "100%";
            container.style.margin = "40px auto";

            const canvas = document.createElement("canvas");
            container.appendChild(canvas);

            const sortedTransactions = [...walletData.transactions].sort(
                (a, b) => a.status.confirmedAt - b.status.confirmedAt
            );

            const dataPoints = sortedTransactions.map(tx => ({
                x: new Date(tx.status.confirmedAt * 1000),
                y: tx.btcBalance,
                rawTimestamp: tx.status.confirmedAt
            }));

            new Chart(canvas.getContext("2d"), {
                type: "scatter",
                data: {
                    datasets: [{
                        label: "Wallet Balance (BTC)",
                        data: dataPoints,
                        borderColor: "#ff8f0e",
                        backgroundColor: "#ff870e",
                        showLine: true,
                        fill: false,
                        tension: 0.3,
                        pointRadius: 3,
                        pointHoverRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                unit: "day",
                                tooltipFormat: "dd.MM.yyyy",
                                displayFormats: {
                                    day: "dd.MM.yyyy"
                                }
                            },
                            title: {
                                display: true,
                                text: "Date"
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "BTC"
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: (ctx) => {
                                    const balance = ctx.parsed.y;
                                    const ts = ctx.raw.rawTimestamp * 1000;
                                    const date = new Date(ts);
                                    const dd = String(date.getDate()).padStart(2, '0');
                                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                                    const yyyy = date.getFullYear();
                                    const formattedDate = `${dd}.${mm}.${yyyy}`;
                                    return [`Balance: ${balance} BTC`, `Date: ${formattedDate}`];
                                }
                            }
                        },
                        legend: {
                            display: true
                        }
                    }
                }
            });

            return container;
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
        static formatNumberToAssetPrice(price) {
            if(price === null || price === 0) {
                return "$0";
            }

            let normalizedPrice = parseFloat(price).toFixed(15)

            if (normalizedPrice >= 1e12) {
                return "$" + (normalizedPrice / 1e12).toFixed(3) + "T";
            } else if (normalizedPrice >= 1e9) {
                return "$" + (normalizedPrice / 1e9).toFixed(3) + "B";
            } else if (normalizedPrice >= 1e6) {
                return "$" + (normalizedPrice / 1e6).toFixed(3) + "M";
            } else if (normalizedPrice >= 1e3) {
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

        static formatTimestampToDate(timestamp) {
            const date = new Date(timestamp * 1000)

            const day = String(date.getDate()).padStart(2, `0`)
            const month = String(date.getMonth() + 1).padStart(2, `0`)
            const year = String(date.getFullYear())

            const hour = String(date.getHours()).padStart(2, `0`)
            const minute = String(date.getMinutes()).padStart(2, `0`)
            const second = String(date.getSeconds()).padStart(2, `0`)

            return `${day}-${month}-${year} ${hour}:${minute}:${second}`
        }
    }

    static FetchAPI = class {
        static async getJSONResponse(url) {
            let responseBody = await fetch(url)
            return await responseBody.json()
        }
    }

    static Account = class {
        static async getAccountWalletToSelect(selectHtmlId,network) {
            const savedAddressesField = document.getElementById(selectHtmlId)
            const wallets = await WalletManager.getAllWallets()

            wallets.forEach((wallet) => {
                if(wallet.network !== network) return;

                const option = document.createElement("option")
                option.value = wallet.address
                option.textContent = `(${wallet.alias}) - ${wallet.address}`
                savedAddressesField.append(option)
            })
        }
    }
}