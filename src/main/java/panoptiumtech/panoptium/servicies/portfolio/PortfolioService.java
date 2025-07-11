package panoptiumtech.panoptium.servicies.portfolio;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.entities.account.Account;
import panoptiumtech.panoptium.entities.account.AccountDetails;
import panoptiumtech.panoptium.entities.portfolio.Portfolio;
import panoptiumtech.panoptium.entities.transaction.Transaction;
import panoptiumtech.panoptium.repositories.portfolio.PortfolioRepository;
import panoptiumtech.panoptium.servicies.transaction.TransactionService;

import java.util.ArrayList;
import java.util.List;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final TransactionService transactionService;

    public PortfolioService(final PortfolioRepository portfolioRepository, final TransactionService transactionService) {
        this.portfolioRepository = portfolioRepository;
        this.transactionService = transactionService;
    }

    public List<Portfolio> getAllPortfolios(@AuthenticationPrincipal final AccountDetails accountDetails) {
        return portfolioRepository.findAllByAccount(accountDetails.getAccount());
    }

    public List<Transaction> getAllPortfolioAssets(String name, @AuthenticationPrincipal final AccountDetails accountDetails) {
        return portfolioRepository.findByNameAndAccount(name,accountDetails.getAccount()).get().getTransactions();
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

    public String updatePortfolio(String oldName, String newName, String color, @AuthenticationPrincipal final AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        Portfolio portfolio = portfolioRepository.findByNameAndAccount(oldName,account).get();
        portfolio.setName(newName);
        portfolio.setColor(color);

        portfolioRepository.save(portfolio);

        return "Portfolio updated successfully";
    }

    public void deletePortfolio(String name, @AuthenticationPrincipal final AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();
        portfolioRepository.delete(portfolioRepository.findByNameAndAccount(name,account).get());
    }
}
