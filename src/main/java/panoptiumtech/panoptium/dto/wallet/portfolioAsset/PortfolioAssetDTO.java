package panoptiumtech.panoptium.dto.wallet.portfolioAsset;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PortfolioAssetDTO {
    String assetName;
    String portfolioName;
    PortfolioAssetData portfolioAssetData;
}


