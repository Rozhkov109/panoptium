export class TransactionManager {

    static async getAllTransactionsByAsset(assetName,portfolioName) {
        const response = await fetch(`/app/transaction/get-all-by-asset?assetName=${assetName}&portfolioName=${portfolioName}`)
        return response.json();
    }

    static async addTransaction(assetName, portfolioName, time, amount, pricePerUnit) {
        const data = {
            assetName: assetName,
            portfolioName: portfolioName,
            transactionData : {
                time: time,
                amount: amount,
                pricePerUnit: pricePerUnit,
            }
        }

        const response = await fetch("/app/transaction/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.text();
    }

    static async editTransaction(assetName, portfolioName, time, amount, pricePerUnit) {
        const data = {
            assetName: assetName,
            portfolioName: portfolioName,
            transactionData : {
                time: time,
                amount: amount,
                pricePerUnit: pricePerUnit,
            }
        }

        const response = await fetch("/app/transaction/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.text();
    }

    static async deleteTransaction(assetName, portfolioName, time) {
        const data = {
            assetName: assetName,
            portfolioName: portfolioName,
            time: time
        }

        const response = await fetch(`/app/transaction/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.text();
    }
}