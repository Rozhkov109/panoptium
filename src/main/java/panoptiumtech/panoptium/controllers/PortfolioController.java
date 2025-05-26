package panoptiumtech.panoptium.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import panoptiumtech.panoptium.dto.wallet.PortfolioDTO;
import panoptiumtech.panoptium.entities.Account.AccountDetails;
import panoptiumtech.panoptium.entities.Portfolio.Portfolio;
import panoptiumtech.panoptium.servicies.portfolio.PortfolioService;

import java.util.List;

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

    @PostMapping("/add")
    public String addPortfolio(@RequestBody final PortfolioDTO portfolioDTO, @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioService.addPortfolio(portfolioDTO.getName(),portfolioDTO.getColor(),accountDetails);
    }

    @PostMapping("/update")
    public String updatePortfolio(@RequestBody final PortfolioDTO portfolioDTO, @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioService.updatePortfolio(portfolioDTO.getName(),portfolioDTO.getColor(),accountDetails);
    }

    @PostMapping("/delete")
    public void deletePortfolio(@RequestBody String name, @AuthenticationPrincipal AccountDetails accountDetails) {
        portfolioService.deletePortfolio(name, accountDetails);
    }
}
