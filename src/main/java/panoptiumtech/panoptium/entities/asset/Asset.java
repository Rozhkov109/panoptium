package panoptiumtech.panoptium.entities.asset;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import panoptiumtech.panoptium.entities.account.Account;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false, referencedColumnName = "id")
    @NotNull
    private Account account;

    @Column(name = "name", nullable = false)
    @NotNull
    private String name;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull
    private AssetType type;

    @Column(name = "color", nullable = false)
    @NotNull
    private String color;
}
