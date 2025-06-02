package panoptiumtech.panoptium.servicies.portfolio;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.entities.Account.Account;
import panoptiumtech.panoptium.entities.Account.AccountDetails;
import panoptiumtech.panoptium.entities.Asset.Asset;
import panoptiumtech.panoptium.entities.Portfolio.Portfolio;
import panoptiumtech.panoptium.entities.PortfolioAsset.PortfolioAsset;
import panoptiumtech.panoptium.repositories.portfolio.PortfolioRepository;
import panoptiumtech.panoptium.servicies.portfolioAsset.PortfolioAssetService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final PortfolioAssetService portfolioAssetService;

    public PortfolioService(final PortfolioRepository portfolioRepository, final PortfolioAssetService portfolioAssetService) {
        this.portfolioRepository = portfolioRepository;
        this.portfolioAssetService = portfolioAssetService;
    }

    public List<Portfolio> getAllPortfolios(@AuthenticationPrincipal final AccountDetails accountDetails) {
        return portfolioRepository.findAllByAccount(accountDetails.getAccount());
    }

    public List<PortfolioAsset> getAllPortfolioAssets(String name, @AuthenticationPrincipal final AccountDetails accountDetails) {
        return portfolioRepository.findByNameAndAccount(name,accountDetails.getAccount()).get().getPortfolioAssets();
    }

    public String addPortfolio(String name, String color, @AuthenticationPrincipal final AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        if(portfolioRepository.findByNameAndAccount(name,account).isPresent()) {
            return "Portfolio already exists";
        }

        Portfolio portfolio = new Portfolio(null,account,name,color, new ArrayList<>());
        portfolioRepository.save(portfolio);
        return "Portfolio created successfully";
    }

    public String updatePortfolio(String name, String color, @AuthenticationPrincipal final AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        Portfolio portfolio = portfolioRepository.findByNameAndAccount(name,account).get();
        portfolio.setName(name);
        portfolio.setColor(color);

        portfolioRepository.save(portfolio);

        return "Portfolio updated successfully";
    }

    public void deletePortfolio(String name, @AuthenticationPrincipal final AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();
        portfolioRepository.delete(portfolioRepository.findByNameAndAccount(name,account).get());
    }
}
