package panoptiumtech.panoptium.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import panoptiumtech.panoptium.dto.wallet.portfolioAsset.PortfolioAssetDTO;
import panoptiumtech.panoptium.entities.Account.AccountDetails;
import panoptiumtech.panoptium.entities.PortfolioAsset.PortfolioAsset;
import panoptiumtech.panoptium.servicies.portfolioAsset.PortfolioAssetService;

import java.util.List;

@Hidden
@RestController
@RequestMapping("/app/portfolio-asset")
public class PortfolioAssetController {
    private final PortfolioAssetService portfolioAssetService;

    public PortfolioAssetController(final PortfolioAssetService portfolioAssetService) {
        this.portfolioAssetService = portfolioAssetService;
    }

    @GetMapping("/get-all")
    public List<PortfolioAsset> getAllPortfolioAssets(@RequestParam String portfolioName, @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioAssetService.getAllPortfolioAssets(portfolioName, accountDetails);
    }

    @PostMapping("/add")
    public String addPortfolioAsset(@RequestBody PortfolioAssetDTO portfolioAssetDTO,
                                    @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioAssetService.addPortfolioAsset(portfolioAssetDTO.getAssetName(),
                portfolioAssetDTO.getPortfolioName(),
                portfolioAssetDTO.getPortfolioAssetData().getAmount(),
                portfolioAssetDTO.getPortfolioAssetData().getPricePerUnit(),
                accountDetails);
    }

    @PostMapping("/edit")
    public String updatePortfolioAsset(@RequestBody PortfolioAssetDTO portfolioAssetDTO,
                                       @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioAssetService.updatePortfolioAsset(portfolioAssetDTO.getAssetName(),
                portfolioAssetDTO.getPortfolioName(),
                portfolioAssetDTO.getPortfolioAssetData().getAmount(),
                portfolioAssetDTO.getPortfolioAssetData().getPricePerUnit(),
                accountDetails);
    }

    @PostMapping("/delete")
    public void deletePortfolioAsset(@RequestBody PortfolioAssetDTO portfolioAssetDTO,@AuthenticationPrincipal AccountDetails accountDetails) {
        portfolioAssetService.deletePortfolioAsset(portfolioAssetDTO.getAssetName(),portfolioAssetDTO.getPortfolioName(),accountDetails);
    }

}
