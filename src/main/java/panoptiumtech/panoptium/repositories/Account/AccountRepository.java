package panoptiumtech.panoptium.repositories.Account;

import org.springframework.data.jpa.repository.JpaRepository;
import panoptiumtech.panoptium.entities.Account.Account;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByUsername(String username);
}
