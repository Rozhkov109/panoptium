package panoptiumtech.panoptium.entities.Wallet;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "wallet", uniqueConstraints = {
        @UniqueConstraint(name = "unique_address",columnNames = "address")
})
@Data
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
