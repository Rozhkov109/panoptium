package panoptiumtech.panoptium.entities.Wallet;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "wallet", uniqueConstraints = {
        @UniqueConstraint(name = "unique_address",columnNames = "address")
})
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "wallet_type",nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull
    private WalletType walletType;

    @Column(name = "address",nullable = false)
    @NotNull
    @Size(min = 5, max = 128)
    private String address;
}
