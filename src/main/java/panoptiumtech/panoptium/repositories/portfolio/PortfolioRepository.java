package panoptiumtech.panoptium.repositories.portfolio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import panoptiumtech.panoptium.entities.account.Account;
import panoptiumtech.panoptium.entities.portfolio.Portfolio;

import java.util.List;
import java.util.Optional;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Optional<Portfolio> findByNameAndAccount(String name, Account account);
    List<Portfolio> findAllByAccount(Account account);
}
