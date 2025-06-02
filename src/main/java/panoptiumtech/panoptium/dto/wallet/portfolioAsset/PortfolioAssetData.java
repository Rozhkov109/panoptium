package panoptiumtech.panoptium.dto.wallet.portfolioAsset;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class PortfolioAssetData {
    BigDecimal amount;
    BigDecimal pricePerUnit;
}
