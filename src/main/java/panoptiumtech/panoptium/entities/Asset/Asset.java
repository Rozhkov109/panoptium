package panoptiumtech.panoptium.entities.Asset;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "asset_type", nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull
    private AssetType assetType;

    @Column(name = "amount", nullable = false)
    @NotNull
    private BigDecimal amount;

    @Column(name = "price_per_unit", nullable = false)
    @NotNull
    private BigDecimal PricePerUnit;

    @Column(name = "color", nullable = false)
    @NotNull
    private String color;
}
