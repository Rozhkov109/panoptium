package panoptiumtech.panoptium.repositories.account;

import org.springframework.data.jpa.repository.JpaRepository;
import panoptiumtech.panoptium.entities.account.Account;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String username);
}
