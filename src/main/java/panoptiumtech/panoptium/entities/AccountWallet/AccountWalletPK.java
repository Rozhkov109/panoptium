package panoptiumtech.panoptium.entities.AccountWallet;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import panoptiumtech.panoptium.entities.Account.Account;
import panoptiumtech.panoptium.entities.Wallet.Wallet;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountWalletPK implements Serializable {
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false, referencedColumnName = "id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "wallet_id", nullable = false, referencedColumnName = "id")
    private Wallet wallet;

    @Override
    public boolean equals(Object o) {
        if (!(o instanceof AccountWalletPK that)) return false;
        return Objects.equals(account, that.account) && Objects.equals(wallet, that.wallet);
    }

    @Override
    public int hashCode() {
        return Objects.hash(account, wallet);
    }
}
