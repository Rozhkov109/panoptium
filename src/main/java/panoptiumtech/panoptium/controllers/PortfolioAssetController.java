package panoptiumtech.panoptium.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import panoptiumtech.panoptium.dto.wallet.PortfolioAssetDTO;
import panoptiumtech.panoptium.entities.Account.AccountDetails;
import panoptiumtech.panoptium.entities.PortfolioAsset.PortfolioAsset;
import panoptiumtech.panoptium.servicies.portfolioAsset.PortfolioAssetService;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/app/portfolio-asset")
public class PortfolioAssetController {
    private final PortfolioAssetService portfolioAssetService;

    public PortfolioAssetController(final PortfolioAssetService portfolioAssetService) {
        this.portfolioAssetService = portfolioAssetService;
    }

    @GetMapping("/get-all")
    public List<PortfolioAsset> getAllPortfolioAssets(String portfolioName,@AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioAssetService.getAllPortfolioAssets(portfolioName, accountDetails);
    }

    @PostMapping("/add")
    public String addPortfolioAsset(String assetName,
                                    String portfolioName,
                                    PortfolioAssetDTO portfolioAssetDTO,
                                    @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioAssetService.addPortfolioAsset(assetName,portfolioName,portfolioAssetDTO.getAmount(),portfolioAssetDTO.getPricePerUnit(),accountDetails);
    }

    @PostMapping("/edit")
    public String updatePortfolioAsset(String assetName,
                                       PortfolioAssetDTO portfolioAssetDTO,
                                       @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioAssetService.updatePortfolioAsset(assetName,portfolioAssetDTO.getAmount(),portfolioAssetDTO.getPricePerUnit(),accountDetails);
    }

    @PostMapping("/delete")
    public void deletePortfolioAsset(String assetName,@AuthenticationPrincipal AccountDetails accountDetails) {
        portfolioAssetService.deletePortfolioAsset(assetName,accountDetails);
    }

}
