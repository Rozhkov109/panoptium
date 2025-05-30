package panoptiumtech.panoptium.repositories.portfolioAsset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Repository;
import panoptiumtech.panoptium.entities.Asset.Asset;
import panoptiumtech.panoptium.entities.Asset.AssetType;
import panoptiumtech.panoptium.entities.Portfolio.Portfolio;
import panoptiumtech.panoptium.entities.PortfolioAsset.PortfolioAsset;

import java.util.List;
import java.util.Optional;

@Repository
public interface PortfolioAssetRepository extends JpaRepository<PortfolioAsset, Long> {
    List<PortfolioAsset> findAllByPortfolio(Portfolio portfolio);
    Optional<PortfolioAsset> findByAsset(Asset asset);
}