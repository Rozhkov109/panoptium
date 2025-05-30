package panoptiumtech.panoptium.dto.wallet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class PortfolioAssetDTO {
    BigDecimal amount;
    BigDecimal pricePerUnit;
}
