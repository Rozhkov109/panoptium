package panoptiumtech.panoptium.entities.Wallet;

public enum WalletType {
    BITCOIN("Bitcoin"),
    SOLANA("Solana");

    private String type;

    WalletType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}