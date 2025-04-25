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
                size: "default",
                mainInfo: true,
                additionalInfo: true,
                onlyOneAdditionalField: true,
                trendIcon: false,
            },
            {
                id: "btc-dominance",
                title: "Bitcoin Dominance",
                size: "default",
                mainInfo: true,
                additionalInfo: true,
                trendIcon: true,
                oneDayPercentChange: true,
            },
            {
                id: "eth-dominance",
                title: "Ethereum Dominance",
                size: "default",
                mainInfo: true,
                additionalInfo: true,
                trendIcon: true,
                oneDayPercentChange: true,
            },
            {
                id: "market-cap",
                title: "Market Capitalization",
                size: "default",
                mainInfo: true,
                additionalInfo: true,
                trendIcon: true,
                oneDayPercentChange: true,
            },
            {
                id: "top-500",
                title: "S&P 500 (SPDR ETF)",
                ticker: "SPY",
                size: "big",
                cardColor: "#a80000",
                mainInfo: true,
                additionalInfo: true,
                dayPriceChange: true,
                weekPriceChange: true,
                monthPriceChange: true,
                trendIcon: true,
            },
            {
                id: "dow-jones",
                title: "Dow Jones (SPDR ETF)",
                ticker: "DIA",
                size: "big",
                cardColor: "#00b399",
                mainInfo: true,
                additionalInfo: true,
                dayPriceChange: true,
                weekPriceChange: true,
                monthPriceChange: true,
                trendIcon: true,
            },
            {
                id: "nasdaq",
                title: "Nasdaq Composite (Invesco QQQ Trust ETF)",
                ticker: "QQQ",
                size: "big",
                cardColor: "#125883",
                mainInfo: true,
                additionalInfo: true,
                dayPriceChange: true,
                weekPriceChange: true,
                monthPriceChange: true,
                trendIcon: true,
            },
            {
                id: "russel-2000",
                title: "Russel 2000 (iShares ETF)",
                ticker: "IWM",
                size: "big",
                cardColor: "#6e0440",
                mainInfo: true,
                additionalInfo: true,
                dayPriceChange: true,
                weekPriceChange: true,
                monthPriceChange: true,
                trendIcon: true,
            },
            {
                id: "volatility-index",
                title: "Volatility Index (iPath VIX ETN)",
                ticker: "VXX",
                size: "big",
                cardColor: "#0092fa",
                mainInfo: true,
                additionalInfo: true,
                dayPriceChange: true,
                weekPriceChange: true,
                monthPriceChange: true,
                trendIcon: true,
            },
            {
                id: "gold",
                title: "Gold",
                ticker: "XAUUSD",
                size: "big",
                cardColor: "#e4d100",
                mainInfo: true,
                additionalInfo: true,
                dayPriceChange: true,
                weekPriceChange: true,
                monthPriceChange: true,
                trendIcon: true,
            },
            {
                id: "silver",
                title: "Silver",
                ticker: "XAGUSD",
                size: "big",
                cardColor: "#c1c1c1",
                mainInfo: true,
                additionalInfo: true,
                dayPriceChange: true,
                weekPriceChange: true,
                monthPriceChange: true,
                trendIcon: true,
            },
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

        static getDataCardFrame(cardTemplateId) {
            const card = this.createHtmlElement("div","data-card")
                this.dataCardsConfig.forEach(config => {
                    if(cardTemplateId === config.id) {
                        card.setAttribute("id", config.id)
                        const header = this.createHtmlElement("h3","data-card-header",config.title)
                        if (config.cardColor) card.style.background = config.cardColor
                        if (config.size === "big") {
                            card.style.height = "270px"
                            card.style.width = "290px"
                        }
                        card.appendChild(header)
                        const cardWrapper = this.createHtmlElement("div","data-card-wrapper")
                            const mainDataText = this.createHtmlElement("p","main-data","",{id: `${config.id}-main-data`})
                            cardWrapper.appendChild(mainDataText)
                            if(config.additionalInfo) {
                                if(config.onlyOneAdditionalField) {
                                    const additionalData = this.createHtmlElement("p","additional-data", "", {id: `${config.id}-additional-data`})
                                    cardWrapper.appendChild(additionalData)
                                }
                                if(config.oneDayPercentChange) {
                                    const additionalDataWrapper = this.createHtmlElement("div","percent-change-wrapper")
                                    if(config.trendIcon) {
                                        const dayChange = this.createHtmlElement("p","additional-data", "",{id: `${config.id}-day-change`})
                                        const trendIcon = this.createHtmlElement("img","trend-icon-small","", {id: `${config.id}-trend-icon`})
                                        additionalDataWrapper.append(dayChange,trendIcon)
                                        cardWrapper.appendChild(additionalDataWrapper)
                                    }
                                    else {
                                        const dayChange = this.createHtmlElement("p","additional-data", "",{id: `${config.id}-day-change`})
                                        cardWrapper.appendChild(dayChange)
                                    }
                                }
                                if(config.dayPriceChange) {
                                    const additionalDataWrapper = this.createHtmlElement("div","additional-data-wrapper")
                                    if(config.trendIcon) {
                                        const sign = this.createHtmlElement("p","additional-data", "1d%:")
                                        if(config.size === "default") sign.style.fontSize = "10px"
                                        const dayAgoPrice = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-day-ago-price`})
                                        const percentWrapper = this.createHtmlElement("div","additional-data-wrapper")
                                            const percents = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-day-change-percent`})
                                        if(config.size === "default") percents.style.fontSize = "10px"
                                            const trendIcon = this.createHtmlElement("img","trend-icon-small","", {id: `${config.id}-day-trend-icon`})
                                        percentWrapper.append(percents,trendIcon)
                                        additionalDataWrapper.append(sign,dayAgoPrice,percentWrapper)
                                        cardWrapper.appendChild(additionalDataWrapper)
                                    }
                                    else {
                                        const weekChange = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-day-change`})
                                        cardWrapper.appendChild(weekChange)
                                    }

                                }
                                if(config.weekPriceChange) {
                                    const additionalDataWrapper = this.createHtmlElement("div","additional-data-wrapper")
                                    if(config.trendIcon) {
                                        const sign = this.createHtmlElement("p","additional-data", "1w%:")
                                        if(config.size === "default") sign.style.fontSize = "10px"
                                        const weekAgoPrice = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-week-ago-price`})
                                        const percentWrapper = this.createHtmlElement("div","additional-data-wrapper")
                                            const percents = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-week-change-percent`})
                                        if(config.size === "default") percents.style.fontSize = "10px"
                                            const trendIcon = this.createHtmlElement("img","trend-icon-small","", {id: `${config.id}-week-trend-icon`})
                                        percentWrapper.append(percents,trendIcon)
                                        additionalDataWrapper.append(sign,weekAgoPrice,percentWrapper)
                                        cardWrapper.appendChild(additionalDataWrapper)
                                    }
                                    else {
                                        const weekChange = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-week-change`})
                                        cardWrapper.appendChild(weekChange)
                                    }
                                }
                                if(config.monthPriceChange) {
                                    const additionalDataWrapper = this.createHtmlElement("div","additional-data-wrapper")
                                    if(config.trendIcon) {
                                        const sign = this.createHtmlElement("p","additional-data", "1m%:")
                                        if(config.size === "default") sign.style.fontSize = "10px"
                                        const monthAgoPrice = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-month-ago-price`})
                                        const percentWrapper = this.createHtmlElement("div","additional-data-wrapper")
                                            const percents = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-month-change-percent`})
                                        if(config.size === "default") percents.style.fontSize = "10px"
                                            const trendIcon = this.createHtmlElement("img","trend-icon-small","", {id: `${config.id}-month-trend-icon`})
                                        percentWrapper.append(percents,trendIcon)
                                        additionalDataWrapper.append(sign,monthAgoPrice,percentWrapper)
                                        cardWrapper.appendChild(additionalDataWrapper)
                                    }
                                    else {
                                        const weekChange = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-month-change`})
                                        cardWrapper.appendChild(weekChange)
                                    }
                                }
                            }
                            card.appendChild(cardWrapper)
                    }
            })
            return card.hasChildNodes() ? card : null
        }

        static fillCryptoMarketCard(card, jsonResponse) {
            const cardId = card.id
            const combinedKey = cardId.replaceAll("-","_") + "_24h_percentage_change"

            if(cardId === "market-cap") card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToMarketCap(jsonResponse[cardId.replaceAll("-","_")])
            else card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToPercents(jsonResponse[cardId.replaceAll("-","_")])
            Helper.Format.formatNumberToPercentWithColor(jsonResponse[combinedKey], card.querySelector(`#${cardId}-day-change`))
            this.setTrendIconDataByNumber(jsonResponse[combinedKey],card.querySelector(`#${cardId}-trend-icon`))
        }

        static fillStockMarketCard(card, jsonResponse) {
            const cardId = card.id
            const cardConfig = this.dataCardsConfig.find(config => config.id === cardId)
            const asset = jsonResponse.stockMarketData.find(assetData => assetData.ticker === cardConfig.ticker)

            card.querySelector(`#${cardId}-main-data`).textContent = Helper.Format.formatNumberToCoinPrice(asset.data[0].closePrice)

            card.querySelector(`#${cardId}-day-ago-price`).textContent = Helper.Format.formatNumberToCoinPrice(asset.data[1].closePrice)
            let dayPercentChange = Helper.Format.getPercentChangeByTwoNumbers(asset.data[0].closePrice,asset.data[1].closePrice)
            Helper.Format.formatNumberToPercentWithColor(dayPercentChange,card.querySelector(`#${cardId}-day-change-percent`))
            this.setTrendIconDataByNumber(dayPercentChange, card.querySelector(`#${cardId}-day-trend-icon`))

            card.querySelector(`#${cardId}-week-ago-price`).textContent = Helper.Format.formatNumberToCoinPrice(asset.data[2].closePrice)
            let weekPercentChange = Helper.Format.getPercentChangeByTwoNumbers(asset.data[0].closePrice,asset.data[2].closePrice)
            Helper.Format.formatNumberToPercentWithColor(weekPercentChange,card.querySelector(`#${cardId}-week-change-percent`))
            this.setTrendIconDataByNumber(weekPercentChange, card.querySelector(`#${cardId}-week-trend-icon`))

            card.querySelector(`#${cardId}-month-ago-price`).textContent = Helper.Format.formatNumberToCoinPrice(asset.data[3].closePrice)
            let monthPercentChange = Helper.Format.getPercentChangeByTwoNumbers(asset.data[0].closePrice,asset.data[3].closePrice)
            Helper.Format.formatNumberToPercentWithColor(monthPercentChange,card.querySelector(`#${cardId}-month-change-percent`))
            this.setTrendIconDataByNumber(monthPercentChange, card.querySelector(`#${cardId}-month-trend-icon`))
        }


        static getDataCard(cardId, data) {
            const card = this.getDataCardFrame(cardId)
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
                if(card.id === "btc-dominance" || card.id === "eth-dominance" || card.id === "market-cap") {
                    this.fillCryptoMarketCard(card,data)
                }

                if(["top-500","dow-jones","nasdaq","russel-2000","volatility-index","gold","silver"].includes(card.id)) {
                    this.fillStockMarketCard(card, data)
                }
            }
            return card;
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