package panoptiumtech.panoptium.entities.PortfolioAsset;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import panoptiumtech.panoptium.entities.Asset.Asset;
import panoptiumtech.panoptium.entities.Portfolio.Portfolio;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "asset_id", nullable = false, referencedColumnName = "id")
    @NotNull
    private Asset asset;

    @ManyToOne
    @JoinColumn(name = "portfolio_id", nullable = false, referencedColumnName = "id")
    @NotNull
    @JsonBackReference
    private Portfolio portfolio;

    @Column(name = "amount")
    private BigDecimal amount;

    @Column(name = "price_per_unit")
    private BigDecimal pricePerUnit;
}
