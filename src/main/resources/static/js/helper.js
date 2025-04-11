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

    static Format = class {
       static formatMarketCap(marketCap) {
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
        static formatCoinPrice(price) {
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

        static formatNumberToPercentWithColorAndPicture(number, textHtmlElement, iconHtmlElement = null) {
           let normalizedNumber = parseFloat(number).toFixed(2)

            if(normalizedNumber < 0) {
                if(iconHtmlElement != null) {
                    iconHtmlElement.setAttribute("src", "/images/red-arrow.png")
                    iconHtmlElement.setAttribute("alt", "red-arrow.png")
                }
                textHtmlElement.style.color = "#ca0101"
                textHtmlElement.textContent = normalizedNumber + "%"
            } else if (normalizedNumber > 0) {
                if(iconHtmlElement != null) {
                    iconHtmlElement.setAttribute("src", "/images/green-arrow.png")
                    iconHtmlElement.setAttribute("alt", "green-arrow.png")
                }
                textHtmlElement.style.color = "#01ca5f"
                textHtmlElement.textContent = "+" + normalizedNumber + "%"
            } else {
                textHtmlElement.textContent = normalizedNumber + "%"
            }

        }
    }

}