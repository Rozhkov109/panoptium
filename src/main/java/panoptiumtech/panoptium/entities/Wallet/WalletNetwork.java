package panoptiumtech.panoptium.entities.Wallet;

public enum WalletNetwork {
    BITCOIN("Bitcoin");

    private String network;

    WalletNetwork(String network) {
        this.network = network;
    }

    public String getNetwork() {
        return network;
    }
}