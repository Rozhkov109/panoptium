import {Helper} from "./helper.js";
import {WalletManager} from "./wallet.js";

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
        const network = Helper.HTML.createHtmlElement("td","",wallet.walletNetwork)
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
        editButton.onclick = () => openWalletEditForm(wallet.alias,wallet.address,wallet.walletNetwork)
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
    console.log(walletForm.querySelector("#alias")); // если null — вот и причина
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

document.addEventListener("DOMContentLoaded", async () => {
    await getAllWallets()
})