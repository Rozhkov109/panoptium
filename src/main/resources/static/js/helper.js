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
                mainInfo: true,
                additionalInfo: true,
                onlyOneAdditionalField: true,
                trendIcon: false,
            },
            {
                id: "btc-dominance",
                title: "Bitcoin Dominance",
                mainInfo: true,
                additionalInfo: true,
                trendIcon: true,
                oneDayPercentChange: true,
            },
            {
                id: "eth-dominance",
                title: "Ethereum Dominance",
                mainInfo: true,
                additionalInfo: true,
                trendIcon: true,
                oneDayPercentChange: true,
            },
            {
                id: "market-cap",
                title: "Market Capitalization",
                mainInfo: true,
                additionalInfo: true,
                trendIcon: true,
                oneDayPercentChange: true,
            },
            {
                id: "gold",
                title: "Gold",
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

        static getDataCardFrame(cardTemplateId) {
            const card = this.createHtmlElement("div","data-card")
                this.dataCardsConfig.forEach(config => {
                    if(cardTemplateId === config.id) {
                        card.setAttribute("id", config.id)
                        const header = this.createHtmlElement("h3","data-card-header",config.title)
                        if (config.cardColor) card.style.background = config.cardColor
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
                                        sign.style.fontSize = "10px"
                                        const dayAgoPrice = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-day-ago-price`})
                                        const percentWrapper = this.createHtmlElement("div","additional-data-wrapper")
                                            const percents = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-day-change-percent`})
                                            percents.style.fontSize = "10px"
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
                                        sign.style.fontSize = "10px"
                                        const weekAgoPrice = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-week-ago-price`})
                                        const percentWrapper = this.createHtmlElement("div","additional-data-wrapper")
                                            const percents = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-week-change-percent`})
                                            percents.style.fontSize = "10px"
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
                                        sign.style.fontSize = "10px"
                                        const monthAgoPrice = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-month-ago-price`})
                                        const percentWrapper = this.createHtmlElement("div","additional-data-wrapper")
                                            const percents = this.createHtmlElement("p", "additional-data", "", {id: `${config.id}-month-change-percent`})
                                            percents.style.fontSize = "10px"
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
        static getDataCard(cardId, data) {
            const card = this.getDataCardFrame(cardId)
            if (card && data && Object.keys(data).length > 0) {
                let mainText
                let additionalText

                let dayPercentChange
                let weekPercentChange
                let monthPercentChange

                switch (card.id) {
                    case "fear-and-greed":
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
                        break;
                    case "btc-dominance":
                        card.querySelector("#btc-dominance-main-data").textContent = Helper.Format.formatNumberToPercents(data.btc_dominance)
                        Helper.Format.formatNumberToPercentWithColor(data.btc_dominance_24h_percentage_change, card.querySelector("#btc-dominance-day-change"))
                        this.setTrendIconDataByNumber(data.btc_dominance_24h_percentage_change,card.querySelector("#btc-dominance-trend-icon"))
                        break;
                    case "eth-dominance":
                        card.querySelector("#eth-dominance-main-data").textContent = Helper.Format.formatNumberToPercents(data.eth_dominance)
                        Helper.Format.formatNumberToPercentWithColor(data.eth_dominance_24h_percentage_change, card.querySelector("#eth-dominance-day-change"))
                        this.setTrendIconDataByNumber(data.eth_dominance_24h_percentage_change,card.querySelector("#eth-dominance-trend-icon"))
                        break;
                    case "market-cap":
                        card.querySelector("#market-cap-main-data").textContent = Helper.Format.formatNumberToMarketCap(data.total_market_cap)
                        Helper.Format.formatNumberToPercentWithColor(data.total_market_cap_yesterday_percentage_change, card.querySelector("#market-cap-day-change"))
                        this.setTrendIconDataByNumber(data.total_market_cap_yesterday_percentage_change,card.querySelector("#market-cap-trend-icon"))
                        break;
                    case "gold":
                        const gold = data.stockMarketDatalist.find(item => item.symbol === "XAUUSD")

                        card.querySelector("#gold-main-data").textContent = Helper.Format.formatNumberToCoinPrice(gold.data[0].closePrice)

                        card.querySelector("#gold-day-ago-price").textContent = Helper.Format.formatNumberToCoinPrice(gold.data[1].closePrice)
                        dayPercentChange = Helper.Format.getPercentChangeByTwoNumbers(gold.data[0].closePrice,gold.data[1].closePrice)
                        Helper.Format.formatNumberToPercentWithColor(dayPercentChange,card.querySelector("#gold-day-change-percent"))
                        this.setTrendIconDataByNumber(dayPercentChange, card.querySelector("#gold-day-trend-icon"))

                        card.querySelector("#gold-week-ago-price").textContent = Helper.Format.formatNumberToCoinPrice(gold.data[2].closePrice)
                        weekPercentChange = Helper.Format.getPercentChangeByTwoNumbers(gold.data[0].closePrice,gold.data[2].closePrice)
                        Helper.Format.formatNumberToPercentWithColor(weekPercentChange,card.querySelector("#gold-week-change-percent"))
                        this.setTrendIconDataByNumber(weekPercentChange, card.querySelector("#gold-week-trend-icon"))

                        card.querySelector("#gold-month-ago-price").textContent = Helper.Format.formatNumberToCoinPrice(gold.data[3].closePrice)
                        monthPercentChange = Helper.Format.getPercentChangeByTwoNumbers(gold.data[0].closePrice,gold.data[3].closePrice)
                        Helper.Format.formatNumberToPercentWithColor(monthPercentChange,card.querySelector("#gold-month-change-percent"))
                        this.setTrendIconDataByNumber(monthPercentChange, card.querySelector("#gold-month-trend-icon"))
                        break;
                    case "silver":
                        const silver = data.stockMarketDatalist.find(item => item.symbol === "XAGUSD")

                        card.querySelector("#silver-main-data").textContent = Helper.Format.formatNumberToCoinPrice(silver.data[0].closePrice)

                        card.querySelector("#silver-day-ago-price").textContent = Helper.Format.formatNumberToCoinPrice(silver.data[1].closePrice)
                        dayPercentChange = Helper.Format.getPercentChangeByTwoNumbers(silver.data[0].closePrice,silver.data[1].closePrice)
                        Helper.Format.formatNumberToPercentWithColor(dayPercentChange,card.querySelector("#silver-day-change-percent"))
                        this.setTrendIconDataByNumber(dayPercentChange, card.querySelector("#silver-day-trend-icon"))

                        card.querySelector("#silver-week-ago-price").textContent = Helper.Format.formatNumberToCoinPrice(silver.data[2].closePrice)
                        weekPercentChange = Helper.Format.getPercentChangeByTwoNumbers(silver.data[0].closePrice,silver.data[2].closePrice)
                        Helper.Format.formatNumberToPercentWithColor(weekPercentChange,card.querySelector("#silver-week-change-percent"))
                        this.setTrendIconDataByNumber(weekPercentChange, card.querySelector("#silver-week-trend-icon"))

                        card.querySelector("#silver-month-ago-price").textContent = Helper.Format.formatNumberToCoinPrice(silver.data[3].closePrice)
                        monthPercentChange = Helper.Format.getPercentChangeByTwoNumbers(silver.data[0].closePrice,silver.data[3].closePrice)
                        Helper.Format.formatNumberToPercentWithColor(monthPercentChange,card.querySelector("#silver-month-change-percent"))
                        this.setTrendIconDataByNumber(monthPercentChange, card.querySelector("#silver-month-trend-icon"))

                        break;
                }
            }
            return card;
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