import { Helper } from "./helper.js";

const contentWrapper = document.querySelector(".content-wrapper")

async function createCards() {
    const btcData = await Helper.FetchAPI.getJSONResponse("http://localhost:8080/api/v1/bitcoin/info")

    const btcCardWrapper = Helper.HTML.createHtmlElement("div","data-card-container", "", {id: "btc-cards"})
    btcCardWrapper.append(
        Helper.HTML.getDataCard("btc-rank", btcData),
        Helper.HTML.getDataCard("btc-cap", btcData),
        Helper.HTML.getDataCard("btc-dom", btcData))

    if(btcCardWrapper.hasChildNodes()) {
        contentWrapper.insertBefore(btcCardWrapper,contentWrapper.querySelector("#bitcoin-header").nextSibling)
    }
    const btcPriceCardWrapper = Helper.HTML.createHtmlElement("div","data-card-container", "", {id: "btc-price"})
    btcPriceCardWrapper.append(Helper.HTML.getDataCard("btc-price", btcData))
    if(btcPriceCardWrapper.hasChildNodes()) {
        contentWrapper.insertBefore(btcPriceCardWrapper,contentWrapper.querySelector("#btc-cards").nextSibling)
    }
}

function isValidBitcoinAddress(address) {
    const legacyRegex = /^1[a-zA-Z0-9]{25,34}$/;
    const scriptRegex = /^3[a-zA-Z0-9]{25,34}$/;
    const segWitRegex = /^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/;
    const taprootRegex = /^bc1p[a-zA-HJ-NP-Z0-9]{39,59}$/;

    return legacyRegex.test(address) || scriptRegex.test(address) || segWitRegex.test(address) || taprootRegex.test(address);
}

async function getWalletTransactions(walletAddress) {
     if(document.querySelector(".loading-wrapper") != null) {
         document.querySelector(".loading-wrapper").remove()
     }

    if(document.querySelector(`.wallet-info-wrapper`) != null) {
        document.querySelector(`.wallet-info-wrapper`).remove()
    }

    if(!isValidBitcoinAddress(walletAddress)) {
      document.body.append(Helper.HTML.getErrorWindow("The wallet address does not exist or incorrect. Try again!"))
      return
    }

    contentWrapper.insertBefore(Helper.HTML.getMessageWithSpinner(),document.getElementById("btc-search-form").nextSibling)

    const walletData = await Helper.FetchAPI.getJSONResponse(`http://localhost:8080/api/v1/bitcoin/wallet/${walletAddress}`)

    document.querySelector(".loading-wrapper").remove()

    const htmlWalletInfo = Helper.HTML.createHtmlElement("div","wallet-info-wrapper")
    htmlWalletInfo.innerHTML += `
        <div class="wallet-main-info">
            <div class="wallet-info-section">
                <p id="wallet-address" class="wallet-info">Address: ${walletData.address}</p>
                <p id="wallet-balance" class="wallet-info">Current Balance: ${walletData.currentBalance} BTC</p>
            </div>
            <div class="wallet-info-section">
                <p id="wallet-first-transaction" class="wallet-info">First Transaction: ${Helper.Format.formatTimestampToDate(walletData.firstTransaction)}</p>
                <p id="wallet-last-transaction" class="wallet-info">Last Transaction: ${Helper.Format.formatTimestampToDate(walletData.lastTransaction)}</p>
                <p id="wallet-transactions-amount" class="wallet-info">Confirmed transactions: ${walletData.confirmedTransactions}</p>
            </div>
        </div>`

    const transactions = walletData.transactions
    transactions.forEach((transaction) => {

        const htmlTransactionWrapper = Helper.HTML.createHtmlElement("div", "transactions-wrapper")

        htmlTransactionWrapper.innerHTML +=
            `<div class="transaction-info">
                <p class="transaction-info-text">Transaction ID: ${transaction.transactionId}</p>
                <p class="transaction-info-text">Time: ${Helper.Format.formatTimestampToDate(transaction.status.confirmedAt)}</p>
            </div>`

        const htmlTransaction = Helper.HTML.createHtmlElement("div", "transaction")

        const sendersWrapper = Helper.HTML.createHtmlElement("div", "transaction-section")
        sendersWrapper.append(Helper.HTML.createHtmlElement("p", "transaction-header", "Senders"))

        const senders = transaction[`inputs`]

        senders.forEach((sender) => {
            const transactionInfo = Helper.HTML.createHtmlElement("div", "transaction-data")
                const address = Helper.HTML.createHtmlElement("p", "transaction-info-text",sender.address)
                const value = Helper.HTML.createHtmlElement("p", "transaction-info-text",`${sender.value} BTC`)
            if(address.textContent === walletAddress) {
                address.style.color = "#ff0900"
                address.style.fontWeight = "bold"
            }
            transactionInfo.append(address, value)
            sendersWrapper.appendChild(transactionInfo)
        })

        const receiversWrapper = Helper.HTML.createHtmlElement("div", "transaction-section")
        receiversWrapper.append(Helper.HTML.createHtmlElement("p", "transaction-header", "Receivers"))

        const receivers = transaction[`outputs`]

        receivers.forEach((receiver) => {
            const transactionInfo = Helper.HTML.createHtmlElement("div", "transaction-data")
            const address = Helper.HTML.createHtmlElement("p", "transaction-info-text",receiver.address)
            const value = Helper.HTML.createHtmlElement("p", "transaction-info-text",`${receiver.value} BTC`)
            if(address.textContent === walletAddress) {
                address.style.color = "#ff0900"
                address.style.fontWeight = "bold"
            }
            transactionInfo.append(address, value)
            receiversWrapper.appendChild(transactionInfo)
        })

        htmlTransaction.append(sendersWrapper, receiversWrapper)
        htmlTransactionWrapper.append(htmlTransaction, Helper.HTML.createHtmlElement("div","transaction-section", `Balance after transaction: ${transaction.btcBalance} BTC`))
        htmlWalletInfo.append(htmlTransactionWrapper)
        })



    contentWrapper.insertBefore(htmlWalletInfo,contentWrapper.querySelector("#btc-search-form").nextSibling)
}

document.getElementById("btc-search-form").addEventListener("submit", async (event) => {
    event.preventDefault()
    await getWalletTransactions(document.getElementById("address").value)
})

document.addEventListener("DOMContentLoaded", async () => {
    await createCards()
})