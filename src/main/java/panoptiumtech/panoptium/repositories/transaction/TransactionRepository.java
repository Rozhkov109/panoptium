package panoptiumtech.panoptium.repositories.transaction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import panoptiumtech.panoptium.entities.asset.Asset;
import panoptiumtech.panoptium.entities.portfolio.Portfolio;
import panoptiumtech.panoptium.entities.transaction.Transaction;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByPortfolio(Portfolio portfolio);
    Optional<Transaction> findByAssetAndPortfolioAndTime(Asset asset, Portfolio portfolio, LocalDateTime time);
    List<Transaction> findAllByAssetAndPortfolio(Asset asset, Portfolio portfolio);
}