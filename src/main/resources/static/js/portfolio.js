export class PortfolioManager {

    static async getAllPortfolios() {
        const response = await fetch("/app/portfolio/get-all")
        return response.json();
    }

    static async getAllPortfolioAssets(portfolioName) {
        const response = await fetch(`/app/portfolio/assets/get-all?portfolioName=${portfolioName}`)
        return response.json();
    }


    static async addPortfolio(name, color) {
        const portfolioDTO = {
            name: name,
            color: color,
        };

        const response = await fetch("/app/portfolio/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(portfolioDTO)
        });
        return response.text();
    }

    static async editPortfolio(name, color) {
        const portfolioDTO = {
            name: name,
            color: color,
        };

        const response = await fetch("/app/portfolio/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(portfolioDTO)
        });
        return response.text();
    }

    static async deletePortfolio(name) {
        const response = await fetch(`/app/portfolio/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: name
        });
        return response.text();
    }
}