document.addEventListener("DOMContentLoaded", () => {
    const btcButton = document.getElementById("btc-button")
    const priceText = document.getElementById("btc-price")

    btcButton.addEventListener("click", () => {
        fetch("http://localhost:8080/api/bitcoin/price")
            .then(response => response.json())
            .then(data => priceText.textContent = data.usd)
            .catch(error => console.error("Error fetching Bitcoin price:", error));
    })
})