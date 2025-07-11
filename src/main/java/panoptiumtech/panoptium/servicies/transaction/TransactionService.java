package panoptiumtech.panoptium.servicies.transaction;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.entities.account.Account;
import panoptiumtech.panoptium.entities.account.AccountDetails;
import panoptiumtech.panoptium.entities.asset.Asset;
import panoptiumtech.panoptium.entities.portfolio.Portfolio;
import panoptiumtech.panoptium.entities.transaction.Transaction;
import panoptiumtech.panoptium.repositories.asset.AssetRepository;
import panoptiumtech.panoptium.repositories.portfolio.PortfolioRepository;
import panoptiumtech.panoptium.repositories.transaction.TransactionRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final PortfolioRepository portfolioRepository;
    private final AssetRepository assetRepository;

    public TransactionService(final TransactionRepository transactionRepository,
                              final PortfolioRepository portfolioRepository,
                              final AssetRepository assetRepository) {
        this.transactionRepository = transactionRepository;
        this.portfolioRepository = portfolioRepository;
        this.assetRepository = assetRepository;
    }

    public List<Transaction> getAllTransactions(String portfolioName, @AuthenticationPrincipal AccountDetails accountDetails) {
        return transactionRepository.findAllByPortfolio(portfolioRepository.findByNameAndAccount(portfolioName,accountDetails.getAccount()).get());
    }

    public List<Transaction> getAllTransactionsByAsset(String assetName, String portfolioName, @AuthenticationPrincipal AccountDetails accountDetails) {
        return transactionRepository.findAllByAssetAndPortfolio(assetRepository.findByNameAndAccount(assetName, accountDetails.getAccount()).get(),
                portfolioRepository.findByNameAndAccount(portfolioName,accountDetails.getAccount()).get());
    }

    public String addTransaction(String assetName,
                                 String portfolioName,
                                 LocalDateTime time,
                                 BigDecimal amount,
                                 BigDecimal pricePerUnit,
                                 @AuthenticationPrincipal AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        if(assetRepository.findByNameAndAccount(assetName,account).isEmpty()) {
            return "That asset doesn't exist. Select an asset from your saved.";
        }

        Asset asset = assetRepository.findByNameAndAccount(assetName,account).get();
        Portfolio portfolio = portfolioRepository.findByNameAndAccount(portfolioName,account).get();

        Transaction transaction = new Transaction(null, asset, portfolio, time, amount, pricePerUnit);
        transactionRepository.save(transaction);
        return "Transaction created successfully";
    }

    public String updatePortfolioAsset(String assetName,
                                       String portfolioName,
                                       LocalDateTime time,
                                       BigDecimal amount,
                                       BigDecimal pricePerUnit,
                                       @AuthenticationPrincipal AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        if(assetRepository.findByNameAndAccount(assetName,account).isEmpty()) {
            return "That asset doesn't exist. Select an asset from your saved.";
        }

        Asset asset = assetRepository.findByNameAndAccount(assetName,account).get();
        Portfolio portfolio = portfolioRepository.findByNameAndAccount(portfolioName,account).get();
        Transaction transaction = transactionRepository.findByAssetAndPortfolioAndTime(asset,portfolio,time).get();

        transaction.setTime(time);
        transaction.setAmount(amount);
        transaction.setPricePerUnit(pricePerUnit);

        transactionRepository.save(transaction);

        return "Transaction updated successfully";
    }

    public void deletePortfolioAsset(String assetName, String portfolioName, LocalDateTime time, @AuthenticationPrincipal AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        Asset asset = assetRepository.findByNameAndAccount(assetName,account).get();
        Portfolio portfolio = portfolioRepository.findByNameAndAccount(portfolioName,account).get();

        transactionRepository.deleteById(transactionRepository.findByAssetAndPortfolioAndTime(asset,portfolio,time).get().getId());
    }
}
