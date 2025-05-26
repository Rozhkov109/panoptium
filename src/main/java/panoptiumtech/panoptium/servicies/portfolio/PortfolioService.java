package panoptiumtech.panoptium.servicies.portfolio;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.entities.Account.Account;
import panoptiumtech.panoptium.entities.Account.AccountDetails;
import panoptiumtech.panoptium.entities.Portfolio.Portfolio;
import panoptiumtech.panoptium.repositories.portfolio.PortfolioRepository;

import java.util.List;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;

    public PortfolioService(final PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    public List<Portfolio> getAllPortfolios(@AuthenticationPrincipal final AccountDetails accountDetails) {
        return portfolioRepository.findAllByAccount(accountDetails.getAccount());
    }

    public String addPortfolio(String name, String color, @AuthenticationPrincipal final AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        if(portfolioRepository.findByNameAndAccount(name,account).isPresent()) {
            return "Portfolio already exists";
        }

        Portfolio portfolio = new Portfolio(null,account,name,color);
        portfolioRepository.save(portfolio);
        return "Portfolio \"" + name  + "\" created successfully";
    }

    public String updatePortfolio(String name, String color, @AuthenticationPrincipal final AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        Portfolio portfolio = portfolioRepository.findByNameAndAccount(name,account).get();
        portfolio.setName(name);
        portfolio.setColor(color);

        portfolioRepository.save(portfolio);

        return "Portfolio \"" + name  + "\" updated successfully";
    }

    public void deletePortfolio(String name, @AuthenticationPrincipal final AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();
        portfolioRepository.deleteById(portfolioRepository.findByNameAndAccount(name,account).get().getId());
    }
}
