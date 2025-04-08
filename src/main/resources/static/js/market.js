document.addEventListener("DOMContentLoaded", () => {
    const cryptoDataButton = document.getElementById("crypto-data-button")
    const fearAndGreedCard = document.getElementById("fear-and-greed")
    const btcCard = document.getElementById("btc-dominance")
    const ethCard = document.getElementById("eth-dominance")
    const marketCapCard = document.getElementById("market-cap")

    const cards = [btcCard, ethCard, marketCapCard]

    async function fillCards() {
        let responseBody = await fetch("http://localhost:8080/api/market/crypto-data")
        let data = await responseBody.json()

        cards.forEach(card => {
            const mainText = card.getElementsByClassName("main-data")[0]
            const additionalText = card.getElementsByClassName("additional-data")[0]

            let mainData;
            let additionalData;

            switch (card.id) {
                case "btc-dominance":
                    mainData = parseFloat(data.btc_dominance).toFixed(2) + " %"
                    additionalData = parseFloat(data.btc_dominance_24h_percentage_change).toFixed(2) + " %"
                    break;
                case "eth-dominance":
                    mainData = parseFloat(data.eth_dominance).toFixed(2) + " %"
                    additionalData = parseFloat(data.eth_dominance_24h_percentage_change).toFixed(2) + " %"
                    break;
                case "market-cap":
                    mainData = data.total_market_cap.toLocaleString() + " $"
                    additionalData = parseFloat(data.total_market_cap_yesterday_percentage_change).toFixed(2) + " %"
                    break;
                default:
                    mainData = "Data not available";
                    additionalData = "";
                    break;
            }
            mainText.textContent = mainData;
            additionalText.textContent = additionalData;
        })
    }

    cryptoDataButton.addEventListener("click", () => {
        fillCards()
    })

})