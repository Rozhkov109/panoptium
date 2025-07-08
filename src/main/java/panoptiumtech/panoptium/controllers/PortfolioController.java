package panoptiumtech.panoptium.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import panoptiumtech.panoptium.dto.wallet.PortfolioDTO;
import panoptiumtech.panoptium.entities.account.AccountDetails;
import panoptiumtech.panoptium.entities.portfolio.Portfolio;
import panoptiumtech.panoptium.entities.portfolioAsset.PortfolioAsset;
import panoptiumtech.panoptium.servicies.portfolio.PortfolioService;

import java.util.List;

@Hidden
@RestController
@RequestMapping("/app/portfolio")
public class PortfolioController {
    private final PortfolioService portfolioService;

    public PortfolioController(final PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/get-all")
    public List<Portfolio> getAllPortfolios(@AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioService.getAllPortfolios(accountDetails);
    }

    @GetMapping("assets/get-all")
    public List<PortfolioAsset> getAllPortfolioAssets(@RequestParam String portfolioName, @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioService.getAllPortfolioAssets(portfolioName,accountDetails);
    }

    @PostMapping("/add")
    public String addPortfolio(@RequestBody final PortfolioDTO portfolioDTO, @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioService.addPortfolio(portfolioDTO.getNewName(),portfolioDTO.getColor(),accountDetails);
    }

    @PostMapping("/edit")
    public String updatePortfolio(@RequestBody final PortfolioDTO portfolioDTO, @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioService.updatePortfolio(portfolioDTO.getOldName(), portfolioDTO.getNewName(),portfolioDTO.getColor(),accountDetails);
    }

    @PostMapping("/delete")
    public void deletePortfolio(@RequestBody String name, @AuthenticationPrincipal AccountDetails accountDetails) {
        portfolioService.deletePortfolio(name, accountDetails);
    }
}
