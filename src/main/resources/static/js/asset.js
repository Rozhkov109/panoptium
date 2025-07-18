export class AssetManager {

    static async getAllAssets() {
        const response = await fetch("/app/asset/get-all")
        return response.json();
    }

    static async addAsset(name, type, color) {
        const assetDTO = {
            newName: name,
            type: type,
            color: color
        };

        const response = await fetch("/app/asset/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(assetDTO)
        });
        return response.text();
    }

    static async editAsset(oldName, newName, type, color) {
        const assetDTO = {
            oldName: oldName,
            newName: newName,
            type: type,
            color: color
        };

        const response = await fetch("/app/asset/edit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(assetDTO)
        });
        return response.text();
    }

    static async deleteAsset(name) {
        const response = await fetch(`/app/asset/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: name
        });
        return response.text();
    }
}

