package panoptiumtech.panoptium.entities.transaction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import panoptiumtech.panoptium.entities.asset.Asset;
import panoptiumtech.panoptium.entities.portfolio.Portfolio;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {
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

    @Column(name = "time", nullable = false)
    @NotNull
    private LocalDateTime time;

    @Column(name = "amount", nullable = false)
    @NotNull
    private BigDecimal amount;

    @Column(name = "price_per_unit", nullable = false)
    @NotNull
    private BigDecimal pricePerUnit;
}
