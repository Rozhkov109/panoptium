package panoptiumtech.panoptium.repositories.wallet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import panoptiumtech.panoptium.entities.account.Account;
import panoptiumtech.panoptium.entities.Wallet.Wallet;

import java.util.List;
import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByAddressAndAccount(String address, Account account);
    List<Wallet> findAllByAccountId(Long id);
}
