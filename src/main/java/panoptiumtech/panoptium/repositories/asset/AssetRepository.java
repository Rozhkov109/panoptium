package panoptiumtech.panoptium.repositories.asset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import panoptiumtech.panoptium.entities.account.Account;
import panoptiumtech.panoptium.entities.asset.Asset;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    Optional<Asset> findByNameAndAccount(String name, Account account);
    List<Asset> findAllByAccount(Account account);
}
