package panoptiumtech.panoptium.entities.AccountWallet;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "account_wallet")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AccountWallet {

    @EmbeddedId
    AccountWalletPK id;

    @Column(name = "alias")
    String alias;
}
