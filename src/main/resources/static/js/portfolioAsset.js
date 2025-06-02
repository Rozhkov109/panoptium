export class PortfolioAssetManager {
    static async addPortfolioAsset(assetName, portfolioName, amount, pricePerUnit) {
        const data = {
            assetName: assetName,
            portfolioName: portfolioName,
            portfolioAssetData : {
                amount: amount,
                pricePerUnit: pricePerUnit,
            }
        }

        const response = await fetch("/app/portfolio-asset/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.text();
    }

    static async editPortfolioAsset(assetName, portfolioName, amount, pricePerUnit) {
        const data = {
            assetName: assetName,
            portfolioName: portfolioName,
            portfolioAssetData : {
                amount: amount,
                pricePerUnit: pricePerUnit,
            }
        }

        const response = await fetch("/app/portfolio-asset/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.text();
    }

    static async deletePortfolioAsset(assetName,portfolioName) {
        const data = {
            assetName: assetName,
            portfolioName: portfolioName,
        }

        const response = await fetch(`/app/portfolio-asset/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        return response.text();
    }
}