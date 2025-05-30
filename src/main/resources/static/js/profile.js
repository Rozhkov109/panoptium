import {Helper} from "./helper.js";
import {WalletManager} from "./wallet.js";
import {PortfolioManager} from "./portfolio.js";
import {AssetManager} from "./asset.js";

// Wallet

const walletsTable = document.getElementById("wallets-table")
const tbody = document.querySelector("#wallets-table tbody")
const walletForm = document.querySelector("#wallet-form")

function openWalletAddForm() {
    walletForm.querySelector("legend").textContent = "Add Wallet"

    document.getElementById("alias").value = ""

    document.getElementById("address").value = ""
    document.getElementById("address").readOnly = false

    document.getElementById("network").value = ""

    Helper.HTML.openModalWindow("modal-wallet")
    walletForm.dataset.action = "add"
}

async function addWallet(event) {
    event.preventDefault()

    const text = await WalletManager.addWallet(
        document.getElementById("alias").value,
        document.getElementById("address").value,
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
        deleteButton.className = "red-button";
        deleteButton.innerText = "x";
        deleteButton.onclick = async () => await deleteWallet(wallet.address)
        buttonContainer.append(deleteButton)

        const editButton = document.createElement("button");
        editButton.className = "red-button";
        editButton.innerText = "✎";
        editButton.style.background = "#ffd300"
        editButton.onclick = () => openWalletEditForm(wallet.alias,wallet.address,wallet.network)
        buttonContainer.append(editButton)

        actions.append(buttonContainer)

        tr.append(alias,network,address,actions)
        tbody.append(tr)
    })
}

async function deleteWallet(address) {
    await WalletManager.deleteWallet(address)
    await getAllWallets();
}


function openWalletEditForm(alias, address, network) {
    walletForm.querySelector("legend").textContent = "Edit Wallet"
    document.getElementById("alias").value = alias

    document.getElementById("address").value = address
    document.getElementById("address").readOnly = true

    document.getElementById("network").value = network

    Helper.HTML.openModalWindow("modal-wallet")
    walletForm.dataset.action = "edit"
}

async function editWallet(event) {
    event.preventDefault()

    const text = await WalletManager.editWallet(
        document.getElementById("alias").value,
        document.getElementById("address").value,
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

async function getAllPortfolios() {
    portfolioWrapper.innerHTML = ""

    const portfolios = await PortfolioManager.getAllPortfolios()

    if(portfolios.length === 0) {
        portfolioWrapper.classList.add("hidden")
        return
    }
    portfolioWrapper.classList.remove("hidden")

    portfolios.forEach((portfolio) => {
        const portfolioHtml = Helper.HTML.createHtmlElement("div", "portfolio")
        portfolioHtml.style.background = portfolio.color

        portfolioHtml.innerHTML += `
            <div class="portfolio-left">
                <div class="portfolio-header">${portfolio.name}</div>
                <div class="portfolio-holdings">Holdings: 1200$</div>
                <button class="portfolio-button">Open</button>
            </div>
            <div class="portfolio-right">
                    <table class="assets-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Total price</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>Ethereum</td>
                            <td>Cryptocurrency</td>
                            <td>10</td>
                            <td>20000$</td>
                        </tr>
                        <tr>
                            <td>Ethereum</td>
                            <td>Cryptocurrency</td>
                            <td>10</td>
                            <td>20000$</td>
                        </tr>

                        </tbody>
                    </table>
            </div>`

        portfolioWrapper.append(portfolioHtml)
    })

}

async function addPortfolio(event) {
    event.preventDefault()

    const text = await PortfolioManager.addPortfolio(
        document.getElementById("portfolio-name").value,
        document.getElementById("portfolio-color").value)

    if(text === "Portfolio created successfully") {
        document.body.append(Helper.HTML.getMessageWindow("Message",text));
    }
    else {
        document.body.append(Helper.HTML.getMessageWindow("Error",text));
    }
    await getAllPortfolios();
}


document.getElementById("add-portfolio-button").addEventListener("click", () => {
    Helper.HTML.openModalWindow("modal-portfolio")
});
document.getElementById("close-portfolio-button").addEventListener("click", () => {
    Helper.HTML.closeModalWindow("modal-portfolio")
});

document.getElementById("portfolio-form").addEventListener("submit", async (event) => {
   await addPortfolio(event)
});











// Asset

const assetTable = document.getElementById("assets-table")
const assetTableBody = document.querySelector("#assets-table tbody")
const assetForm = document.querySelector("#asset-form")


function openAssetAddForm() {
    assetForm.querySelector("legend").textContent = "Add Asset"

    document.getElementById("asset-name").value = ""
    document.getElementById("asset-name").readOnly = false

    document.getElementById("asset-type").value = ""

    document.getElementById("asset-color").value = ""

    Helper.HTML.openModalWindow("modal-asset")
    assetForm.dataset.action = "add"
}

async function addAsset(event) {
    event.preventDefault()

    const text = await AssetManager.addAsset(
        document.getElementById("asset-name").value,
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
        deleteButton.className = "red-button";
        deleteButton.innerText = "x";
        deleteButton.onclick = async () => await deleteAsset(asset.name)
        buttonContainer.append(deleteButton)

        const editButton = document.createElement("button");
        editButton.className = "red-button";
        editButton.innerText = "✎";
        editButton.style.background = "#ffd300"
        editButton.onclick = () => openAssetEditForm(asset.name,asset.type,asset.color)
        buttonContainer.append(editButton)

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
    document.getElementById("asset-name").value = name
    document.getElementById("asset-name").readOnly = true

    document.getElementById("asset-type").value = type

    document.getElementById("asset-color").value = color

    Helper.HTML.openModalWindow("modal-asset")
    assetForm.dataset.action = "edit"
}

async function editAsset(event) {
    event.preventDefault()

    const text = await AssetManager.editAsset(
        document.getElementById("asset-name").value,
        document.getElementById("asset-type").value,
        document.getElementById("asset-color").value)

    if(text === "Asset updated successfully") {
        document.body.append(Helper.HTML.getMessageWindow("Message",text));
    }
    else {
        document.body.append(Helper.HTML.getMessageWindow("Error",text));
    }
    await getAllAssets();
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