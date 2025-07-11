import {Helper} from "./helper.js";
import {WalletManager} from "./wallet.js";
import {PortfolioManager} from "./portfolio.js";
import {AssetManager} from "./asset.js";
import {TransactionManager} from "./transaction.js";

// Wallet

const walletsTable = document.getElementById("wallets-table")
const tbody = document.querySelector("#wallets-table tbody")
const walletForm = document.querySelector("#wallet-form")

function openWalletAddForm() {
    walletForm.querySelector("legend").textContent = "Add Wallet"

    document.getElementById("alias").value = ""
    document.getElementById("new-address").value = ""
    document.getElementById("network").value = ""

    Helper.HTML.openModalWindow("modal-wallet")
    walletForm.dataset.action = "add"
}

function openWalletEditForm(alias, address, network) {
    walletForm.querySelector("legend").textContent = "Edit Wallet"

    document.getElementById("alias").value = alias
    document.getElementById("old-address").value = address
    document.getElementById("new-address").value = address
    document.getElementById("network").value = network

    Helper.HTML.openModalWindow("modal-wallet")
    walletForm.dataset.action = "edit"
}

async function addWallet(event) {
    event.preventDefault()

    const text = await WalletManager.addWallet(
        document.getElementById("alias").value,
        document.getElementById("new-address").value,
        document.getElementById("network").value)

    if(text === "Wallet added successfully") {
        document.body.append(Helper.HTML.getMessageWindow("Message",text));
    }
    else {
        document.body.append(Helper.HTML.getMessageWindow("Error",text));
    }
    await getAllWallets();
}

async function getAllWallets() {
    tbody.innerHTML = ""

    const wallets = await WalletManager.getAllWallets()

    if(wallets.length === 0) {
        walletsTable.classList.add("hidden")
        return
    }
    walletsTable.classList.remove("hidden")

    wallets.forEach((wallet) => {
        const tr = document.createElement("tr")
        const alias = Helper.HTML.createHtmlElement("td","",wallet.alias)
        const network = Helper.HTML.createHtmlElement("td","",wallet.network)
        const address = Helper.HTML.createHtmlElement("td","wallet-address",wallet.address)
        const actions = Helper.HTML.createHtmlElement("td","")


        const buttonContainer = Helper.HTML.createHtmlElement("div","button-container")

        const deleteButton = document.createElement("button");
        deleteButton.className = "action-button";
        deleteButton.innerText = "🗑";
        deleteButton.onclick = async () => await deleteWallet(wallet.address)

        const editButton = document.createElement("button");
        editButton.className = "action-button";
        editButton.innerText = "✎";
        editButton.style.background = "#ffd300"
        editButton.onclick = () => openWalletEditForm(wallet.alias,wallet.address,wallet.network)

        buttonContainer.append(editButton, deleteButton)
        actions.append(buttonContainer)

        tr.append(alias,network,address,actions)
        tbody.append(tr)
    })
}

async function deleteWallet(address) {
    await WalletManager.deleteWallet(address)
    await getAllWallets();
}

async function editWallet(event) {
    event.preventDefault()

    const text = await WalletManager.editWallet(
        document.getElementById("alias").value,
        document.getElementById("old-address").value,
        document.getElementById("new-address").value,
        document.getElementById("network").value)

    if(text === "Wallet updated successfully") {
        document.body.append(Helper.HTML.getMessageWindow("Message",text));
    }
    else {
        document.body.append(Helper.HTML.getMessageWindow("Error",text));
    }
    await getAllWallets();
}

document.getElementById("wallet-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const action = walletForm.dataset.action
    if(action === "add") await addWallet(event)
    if(action === "edit") await editWallet(event);
});

document.getElementById("add-wallet-button").addEventListener("click", () => {openWalletAddForm()});
document.getElementById("close-wallet-button").addEventListener("click", () => {Helper.HTML.closeModalWindow("modal-wallet")});







// Portfolio

const portfolioWrapper = document.getElementById("portfolio-wrapper")
const portfolioForm = document.getElementById("portfolio-form")

function openPortfolioAddForm() {
    portfolioForm.querySelector("legend").textContent = "Add Portfolio"

    document.getElementById("new-portfolio-name").value = ""
    document.getElementById("portfolio-color").value = ""

    Helper.HTML.openModalWindow("modal-portfolio")
    portfolioForm.dataset.action = "add"
}

function openPortfolioEditForm(name, color) {
    portfolioForm.querySelector("legend").textContent = "Edit Portfolio"

    document.getElementById("old-portfolio-name").value = name
    document.getElementById("new-portfolio-name").value = name

    document.getElementById("portfolio-color").value = color

    Helper.HTML.openModalWindow("modal-portfolio")
    portfolioForm.dataset.action = "edit"
}

async function getAllPortfolios() {
    portfolioWrapper.innerHTML = ""

    const portfolios = await PortfolioManager.getAllPortfolios()

    if(portfolios.length === 0) {
        portfolioWrapper.classList.add("hidden")
        return
    }
    portfolioWrapper.classList.remove("hidden")

    for (const portfolio of portfolios) {
        const portfolioHtml = Helper.HTML.createHtmlElement("div", "portfolio")
        portfolioHtml.style.background = portfolio.color

        const portfolioLeft = Helper.HTML.createHtmlElement("div", "portfolio-left")

        const holdings = portfolio.transactions.reduce((sum, asset) => sum + asset.amount * asset.pricePerUnit, 0);

        portfolioLeft.innerHTML += `
                <div class="portfolio-header">${portfolio.name}</div>
                <div class="portfolio-holdings">Holdings: ${Helper.Format.formatNumberToAssetPrice(holdings)}</div>`

        const openDashboardButton = Helper.HTML.createHtmlElement("button", "portfolio-button")
        openDashboardButton.innerText = "Open";
        openDashboardButton.onclick = async () => await fillPortfolioDashboard(portfolio.name)

        portfolioLeft.append(openDashboardButton)

        portfolioHtml.append(portfolioLeft)


        const portfolioRight = Helper.HTML.createHtmlElement("div", "portfolio-right")
            const actionButtonsContainer = Helper.HTML.createHtmlElement("div", "action-buttons-container")

                const editButton = document.createElement("button");
                editButton.className = "action-button";
                editButton.innerText = "✎";
                editButton.style.background = "#ffd300"
                editButton.onclick = () => openPortfolioEditForm(portfolio.name, portfolio.color)

                const deleteButton = document.createElement("button");
                deleteButton.className = "action-button";
                deleteButton.innerText = "🗑";
                deleteButton.onclick = async () => await deletePortfolio(portfolio.name)
                actionButtonsContainer.append(deleteButton)

            actionButtonsContainer.append(editButton,deleteButton)

        portfolioRight.append(actionButtonsContainer)

        const portfolioTransactions = portfolio.transactions
        if(portfolioTransactions.length !== 0) {
            const assetsTable = Helper.HTML.createHtmlElement("table", "assets-table")
            assetsTable.innerHTML += `
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Holdings</th>
                    </tr>
                </thead>`

            const assetsTableBody = document.createElement("tbody")
            let assetsList = []
            let portfolioAssetList = []

            for (const transaction of portfolioTransactions) {
                if(!assetsList.includes(transaction.asset.name)) {
                    assetsList.push(transaction.asset.name)
                    let assetTransactions = await TransactionManager.getAllTransactionsByAsset(transaction.asset.name, portfolio.name)
                    let assetHoldings = 0
                    if (assetTransactions !== 0) {
                        assetTransactions.forEach((transaction) => {
                            assetHoldings += transaction.pricePerUnit * transaction.amount
                        })
                    }
                    let portfolioAsset = {
                        name: transaction.asset.name,
                        type: transaction.asset.type,
                        holdings: assetHoldings
                    }
                    portfolioAssetList.push(portfolioAsset)
                }
            }
            portfolioAssetList.sort((a,b) => b.holdings - a.holdings)

            for (let i = 0; i < portfolioAssetList.length; i++) {
                if(i === 3) break
                const tr = document.createElement("tr")
                const name = Helper.HTML.createHtmlElement("td","",portfolioAssetList[i].name)
                const type = Helper.HTML.createHtmlElement("td","",portfolioAssetList[i].type.replace(/_/g, " "))
                const holdings = Helper.HTML.createHtmlElement("td","",Helper.Format.formatNumberToAssetPrice(portfolioAssetList[i].holdings))

                tr.append(name,type,holdings)
                assetsTableBody.append(tr)
            }
            assetsTable.append(assetsTableBody)
            portfolioRight.append(assetsTable)
        }

        portfolioHtml.append(portfolioRight)
        portfolioWrapper.append(portfolioHtml)
    }
}

async function addPortfolio(event) {
    event.preventDefault()

    const text = await PortfolioManager.addPortfolio(
        document.getElementById("new-portfolio-name").value,
        document.getElementById("portfolio-color").value)

    if(text === "Portfolio created successfully") {
        document.body.append(Helper.HTML.getMessageWindow("Message",text));
    }
    else {
        document.body.append(Helper.HTML.getMessageWindow("Error",text));
    }
    await getAllPortfolios();
}

async function editPortfolio(event) {
    event.preventDefault()

    const text = await PortfolioManager.editPortfolio(
        document.getElementById("old-portfolio-name").value,
        document.getElementById("new-portfolio-name").value,
        document.getElementById("portfolio-color").value,)

    if(text === "Portfolio updated successfully") {
        document.body.append(Helper.HTML.getMessageWindow("Message",text));
    }
    else {
        document.body.append(Helper.HTML.getMessageWindow("Error",text));
    }
    await getAllPortfolios();
}

async function deletePortfolio(name) {
    await PortfolioManager.deletePortfolio(name)
    await getAllPortfolios();
}


document.getElementById("add-portfolio-button").addEventListener("click", () => {
    openPortfolioAddForm()
});
document.getElementById("close-portfolio-button").addEventListener("click", () => {
    Helper.HTML.closeModalWindow("modal-portfolio")
});

document.getElementById("portfolio-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const action = portfolioForm.dataset.action
    if(action === "add") await addPortfolio(event)
    if(action === "edit") await editPortfolio(event);
});







// Portfolio Dashboard
const portfolioAssetsTable = document.getElementById("dashboard-assets-table")
const portfolioAssetsTableBody = document.querySelector("#dashboard-assets-table tbody")
const portfolioAssetForm = document.getElementById("transaction-form")

async function fillTransactionForm(portfolioName) {
    const assetSelect = document.getElementById("asset")

    assetSelect.innerHTML = ""

    const option = document.createElement("option")
    option.value = "Not Selected"
    option.textContent = "Not Selected"
    assetSelect.append(option)

    const assets = await AssetManager.getAllAssets()

    assets.forEach((asset) => {
        const option = document.createElement("option")
        option.value = asset.name
        option.textContent = `${asset.name} [${asset.type}]`

        assetSelect.append(option)
    })

    document.getElementById("portfolio-dashboard-name").value = portfolioName
}

function openTransactionAddForm() {
    document.querySelector("#transaction-form legend").textContent = "Add Transaction"

    document.querySelector('label[for="asset"]').classList.remove("hidden")
    document.getElementById("asset").classList.remove("hidden")

    document.querySelector('label[for="price-per-unit"]').classList.remove("hidden")
    document.getElementById("price-per-unit").classList.remove("hidden")

    portfolioAssetForm.dataset.action = "add"
    Helper.HTML.openModalWindow("modal-transaction-form")
}

async function getAllTransactionsByAsset(assetName,portfolioName) {
    return await TransactionManager.getAllTransactionsByAsset(assetName,portfolioName)
}


async function fillPortfolioDashboard(portfolioName) {
    let assetsList = [];
    portfolioAssetsTableBody.innerHTML = ""
    const portfolioHoldings = document.getElementById("dashboard-portfolio-holdings")
    portfolioHoldings.textContent = "Holdings: "

    Helper.HTML.openModalWindow("modal-portfolio-dashboard")

    await fillTransactionForm(portfolioName)

    const portfolioHeader = document.getElementById("dashboard-portfolio-name")
    portfolioHeader.textContent = portfolioName

    const portfolioAssets = await PortfolioManager.getAllPortfolioAssets(portfolioName)
    if(portfolioAssets.length === 0) {
        portfolioAssetsTable.classList.add("hidden")
        return
    } else {
        portfolioAssetsTable.classList.remove("hidden")
    }
    let portfolioHold = 0
    for (const portfolioAsset of portfolioAssets) {

        if(!assetsList.includes(portfolioAsset.asset.name)) {
            assetsList.push(portfolioAsset.asset.name)
            let assetTransactions = await getAllTransactionsByAsset(portfolioAsset.asset.name, portfolioName)
            if(assetTransactions.length > 0) {
                const tr = document.createElement("tr")

                const name = Helper.HTML.createHtmlElement("td","",portfolioAsset.asset.name)
                const type = Helper.HTML.createHtmlElement("td","",portfolioAsset.asset.type.replace(/_/g, " "))

                let assetAmount = 0
                let assetAvgPrice = 0
                let assetHoldings = 0

                assetTransactions.forEach((assetTransaction) => {
                    assetAmount += assetTransaction.amount
                    assetHoldings += assetTransaction.pricePerUnit * assetTransaction.amount
                    assetAvgPrice = assetHoldings / assetAmount
                })
                portfolioHold += assetHoldings

                const amount = Helper.HTML.createHtmlElement("td","",assetAmount)
                const avgPrice = Helper.HTML.createHtmlElement("td","",Helper.Format.formatNumberToAssetPrice(assetAvgPrice))
                const holdings = Helper.HTML.createHtmlElement("td","",Helper.Format.formatNumberToAssetPrice(assetHoldings))
                const actions = Helper.HTML.createHtmlElement("td","",)

                const actionButtonsContainer = Helper.HTML.createHtmlElement("div", "action-buttons-container")

                const transactionsButton = document.createElement("button");
                transactionsButton.className = "action-button";
                transactionsButton.style.background = "#ddcd01"
                transactionsButton.innerHTML = "📋"
                transactionsButton.onclick = () => openPortfolioAssetBuyForm(portfolioAsset.asset.name,  portfolioAsset.amount, portfolioAsset.pricePerUnit)

                const deleteButton = document.createElement("button");
                deleteButton.className = "action-button";
                deleteButton.innerText = "🗑";
                deleteButton.onclick = async () => await deleteTransaction(portfolioAsset.asset.name, portfolioName, )
                actionButtonsContainer.append(deleteButton)

                actionButtonsContainer.append(transactionsButton,deleteButton)
                actions.append(actionButtonsContainer)

                tr.append(name,type,amount,avgPrice,holdings,actions)

                portfolioAssetsTableBody.append(tr)
            }
        }
    }
    portfolioHoldings.textContent = Helper.Format.formatNumberToMarketCap(portfolioHold)
}


async function addTransaction(event){
    event.preventDefault()

    const text = await TransactionManager.addTransaction(
        document.getElementById("asset").value,
        document.getElementById("portfolio-dashboard-name").value,
        document.getElementById("time").value,
        parseFloat(document.getElementById("amount").value),
        parseFloat(document.getElementById("price-per-unit").value))

    if(text === "Transaction created successfully") {
        document.body.append(Helper.HTML.getMessageWindow("Message",text));
    }
    else {
        document.body.append(Helper.HTML.getMessageWindow("Error",text));
    }
    await fillPortfolioDashboard(document.getElementById("portfolio-dashboard-name").value);
}

async function editPortfolioAsset(event) {
    event.preventDefault()

    const action = portfolioAssetForm.dataset.action
    let text = ""

    if(action === "sell") {
       const currentAmount = parseFloat(document.getElementById("amount-old").value)
       const amountToSell = parseFloat(document.getElementById("amount").value)
        if(amountToSell > currentAmount) {
            document.body.append(Helper.HTML.getMessageWindow("Error", "Amount to sell is bigger than your holding. Please check your portfolio!"))
            return
        }
        const amount = currentAmount - amountToSell

        text = await TransactionManager.editTransaction(
            document.getElementById("asset").value,
            document.getElementById("portfolio-dashboard-name").value,
            document.getElementById("time").value,
            amount,
            document.getElementById("price-per-unit").value)
    }

    else if (action === "buy") {
        const currentAmount = parseFloat(document.getElementById("amount-old").value)
        const amountToBuy = parseFloat(document.getElementById("amount").value)

        const currentAVGPrice = parseFloat(document.getElementById("price-per-unit-old").value)
        const newAVGPrice = parseFloat(document.getElementById("price-per-unit").value)

        const amount = currentAmount + amountToBuy
        const avgPrice = (currentAmount * currentAVGPrice + amountToBuy * newAVGPrice) / (amount)

        text = await TransactionManager.editTransaction(
            document.getElementById("transaction").value,
            document.getElementById("portfolio-dashboard-name").value,
            amount,
            avgPrice)
    }

    if(text === "Transaction updated successfully") {
        document.body.append(Helper.HTML.getMessageWindow("Message",text));
    }
    else {
        document.body.append(Helper.HTML.getMessageWindow("Error",text));
    }
    await fillPortfolioDashboard(document.getElementById("portfolio-dashboard-name").value);
}

async function deleteTransaction(assetName,portfolioName,time) {
    await TransactionManager.deleteTransaction(assetName,portfolioName,time)
    await getAllPortfolios()
    await fillPortfolioDashboard(document.getElementById("portfolio-dashboard-name").value);
}



document.getElementById("add-transaction-button").addEventListener("click", () => openTransactionAddForm())
document.getElementById("close-transaction-form-button").addEventListener("click", () => Helper.HTML.closeModalWindow("modal-transaction-form"))

document.getElementById("transaction-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const action = portfolioAssetForm.dataset.action
    if(action === "add") await addTransaction(event)
    else if(action === "buy" || action === "sell") await editPortfolioAsset(event);
    await getAllPortfolios()
});


document.getElementById("close-portfolio-dashboard-button").addEventListener("click", () => Helper.HTML.closeModalWindow("modal-portfolio-dashboard"))









// Asset

const assetTable = document.getElementById("assets-table")
const assetTableBody = document.querySelector("#assets-table tbody")
const assetForm = document.querySelector("#asset-form")


function openAssetAddForm() {
    assetForm.querySelector("legend").textContent = "Add Asset"

    document.getElementById("new-asset-name").value = ""
    document.getElementById("asset-type").value = ""
    document.getElementById("asset-color").value = ""

    Helper.HTML.openModalWindow("modal-asset")
    assetForm.dataset.action = "add"
}

async function addAsset(event) {
    event.preventDefault()

    const text = await AssetManager.addAsset(
        document.getElementById("new-asset-name").value,
        document.getElementById("asset-type").value,
        document.getElementById("asset-color").value)

    if(text === "Asset added successfully") {
        document.body.append(Helper.HTML.getMessageWindow("Message",text));
    }
    else {
        document.body.append(Helper.HTML.getMessageWindow("Error",text));
    }
    await getAllAssets();
}

async function getAllAssets() {
    assetTableBody.innerHTML = ""

    const assets = await AssetManager.getAllAssets()

    if(assets.length === 0) {
        assetTable.classList.add("hidden")
        return
    }
    assetTable.classList.remove("hidden")

    assets.forEach((asset) => {
        const tr = document.createElement("tr")

        const name = Helper.HTML.createHtmlElement("td","")
        const nameSpan = Helper.HTML.createHtmlElement("span", "asset-name",asset.name)
        nameSpan.style.background = asset.color
        name.append(nameSpan)

        const type = Helper.HTML.createHtmlElement("td","",asset.type.replace(/_/g, " "))
        const actions = Helper.HTML.createHtmlElement("td","")

        const buttonContainer = Helper.HTML.createHtmlElement("div","button-container")

        const deleteButton = document.createElement("button");
        deleteButton.className = "action-button";
        deleteButton.innerText = "🗑";
        deleteButton.onclick = async () => await deleteAsset(asset.name)

        const editButton = document.createElement("button");
        editButton.className = "action-button";
        editButton.innerText = "✎";
        editButton.style.background = "#ffd300"
        editButton.onclick = () => openAssetEditForm(asset.name,asset.type,asset.color)
        buttonContainer.append(editButton, deleteButton)

        actions.append(buttonContainer)

        tr.append(name,type,actions)
        assetTableBody.append(tr)
    })
}

async function deleteAsset(name) {
    await AssetManager.deleteAsset(name)
    await getAllAssets();
}


function openAssetEditForm(name, type, color) {
    assetForm.querySelector("legend").textContent = "Edit Asset"

    document.getElementById("old-asset-name").value = name
    document.getElementById("new-asset-name").value = name
    document.getElementById("asset-type").value = type
    document.getElementById("asset-color").value = color

    Helper.HTML.openModalWindow("modal-asset")
    assetForm.dataset.action = "edit"
}

async function editAsset(event) {
    event.preventDefault()

    const text = await AssetManager.editAsset(
        document.getElementById("old-asset-name").value,
        document.getElementById("new-asset-name").value,
        document.getElementById("asset-type").value,
        document.getElementById("asset-color").value)

    if(text === "Asset updated successfully") {
        document.body.append(Helper.HTML.getMessageWindow("Message",text));
    }
    else {
        document.body.append(Helper.HTML.getMessageWindow("Error",text));
    }
    await getAllAssets();
    await getAllPortfolios()
}

document.getElementById("asset-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const action = assetForm.dataset.action
    if(action === "add") await addAsset(event)
    if(action === "edit") await editAsset(event);
});


document.getElementById("add-asset-button").addEventListener("click", () => {
    openAssetAddForm()
});
document.getElementById("close-asset-button").addEventListener("click", () => {
    Helper.HTML.closeModalWindow("modal-asset")
});


document.addEventListener("DOMContentLoaded", async () => {
    await getAllWallets()
    await getAllPortfolios()
    await getAllAssets()
})