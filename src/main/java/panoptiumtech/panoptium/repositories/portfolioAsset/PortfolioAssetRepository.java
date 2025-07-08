package panoptiumtech.panoptium.repositories.portfolioAsset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import panoptiumtech.panoptium.entities.asset.Asset;
import panoptiumtech.panoptium.entities.portfolio.Portfolio;
import panoptiumtech.panoptium.entities.portfolioAsset.PortfolioAsset;

import java.util.List;
import java.util.Optional;

@Repository
public interface PortfolioAssetRepository extends JpaRepository<PortfolioAsset, Long> {
    List<PortfolioAsset> findAllByPortfolio(Portfolio portfolio);
    Optional<PortfolioAsset> findByAssetAndPortfolio(Asset asset, Portfolio portfolio);
    Optional<PortfolioAsset> findByAsset(Asset asset);
}