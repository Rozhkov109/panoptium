package panoptiumtech.panoptium.entities.asset;

public enum AssetType {
    CRYPTOCURRENCY("Cryptocurrency"),
    METAL("Metal"),
    STOCK_MARKET_SHARE("Stock Market Share"),
    STABLECOIN("Stable Coin"),
    FIAT_CURRENCY("Fiat Currency");

    private String type;

    AssetType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
