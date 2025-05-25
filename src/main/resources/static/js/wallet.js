export class WalletManager {

    static async getAllWallets() {
        const response = await fetch("/app/wallet/get-all")
        return response.json();
    }

    static async addWallet(alias, address, network) {
        const walletDTO = {
            alias: alias,
            address: address,
            network: network
        };

        const response = await fetch("/app/wallet/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(walletDTO)
        });
        return response.text();
    }

    static async editWallet(alias, address, network) {
        const walletDTO = {
            alias: alias,
            address: address,
            network: network
        };

        const response = await fetch("/app/wallet/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(walletDTO)
        });
        return response.text();
    }



    static async deleteWallet(address) {
        const response = await fetch(`/app/wallet/delete/${address}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: address
        });
        return response.text();
    }
}

