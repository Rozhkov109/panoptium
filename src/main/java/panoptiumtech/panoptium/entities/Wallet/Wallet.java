package panoptiumtech.panoptium.entities.Wallet;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import panoptiumtech.panoptium.entities.Account.Account;

@Entity
@Table(name = "wallet")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false, referencedColumnName = "id")
    @NotNull
    private Account account;

    @Column(name = "alias")
    @Size(min = 1, max = 40)
    String alias;

    @Column(name = "address",nullable = false)
    @NotNull
    @Size(min = 5, max = 128)
    private String address;

    @Column(name = "wallet_type",nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull
    private WalletNetwork walletNetwork;
}
