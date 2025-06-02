package panoptiumtech.panoptium.servicies.portfolioAsset;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.entities.Account.Account;
import panoptiumtech.panoptium.entities.Account.AccountDetails;
import panoptiumtech.panoptium.entities.Asset.Asset;
import panoptiumtech.panoptium.entities.Portfolio.Portfolio;
import panoptiumtech.panoptium.entities.PortfolioAsset.PortfolioAsset;
import panoptiumtech.panoptium.repositories.asset.AssetRepository;
import panoptiumtech.panoptium.repositories.portfolio.PortfolioRepository;
import panoptiumtech.panoptium.repositories.portfolioAsset.PortfolioAssetRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
public class PortfolioAssetService {
    private final PortfolioAssetRepository portfolioAssetRepository;
    private final PortfolioRepository portfolioRepository;
    private final AssetRepository assetRepository;

    public PortfolioAssetService(final PortfolioAssetRepository portfolioAssetRepository,
                                 final PortfolioRepository portfolioRepository,
                                 final AssetRepository assetRepository) {
        this.portfolioAssetRepository = portfolioAssetRepository;
        this.portfolioRepository = portfolioRepository;
        this.assetRepository = assetRepository;
    }

    public List<PortfolioAsset> getAllPortfolioAssets(String portfolioName, @AuthenticationPrincipal AccountDetails accountDetails) {
        return portfolioAssetRepository.findAllByPortfolio(portfolioRepository.findByNameAndAccount(portfolioName,accountDetails.getAccount()).get());
    }

    public String addPortfolioAsset(String assetName,
                                    String portfolioName,
                                    BigDecimal amount,
                                    BigDecimal pricePerUnit,
                                    @AuthenticationPrincipal AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        if(assetRepository.findByNameAndAccount(assetName,account).isEmpty()) {
            return "That asset doesn't exist. Select an asset from your saved.";
        }

        Asset asset = assetRepository.findByNameAndAccount(assetName,account).get();
        Portfolio portfolio = portfolioRepository.findByNameAndAccount(portfolioName,account).get();

        if(portfolioAssetRepository.findByAssetAndPortfolio(asset,portfolio).isPresent()) {
            return "Asset already exists in portfolio";
        }

        PortfolioAsset portfolioAsset = new PortfolioAsset(null, asset, portfolio, amount, pricePerUnit);
        portfolioAssetRepository.save(portfolioAsset);
        return "Asset successfully added to your portfolio";
    }

    public String updatePortfolioAsset(String assetName,
                                       String portfolioName,
                                       BigDecimal amount,
                                       BigDecimal pricePerUnit,
                                       @AuthenticationPrincipal AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        if(assetRepository.findByNameAndAccount(assetName,account).isEmpty()) {
            return "That asset doesn't exist. Select an asset from your saved.";
        }

        Asset asset = assetRepository.findByNameAndAccount(assetName,account).get();
        Portfolio portfolio = portfolioRepository.findByNameAndAccount(portfolioName,account).get();

        PortfolioAsset portfolioAsset = portfolioAssetRepository.findByAssetAndPortfolio(asset,portfolio).get();

        portfolioAsset.setAmount(amount);
        portfolioAsset.setPricePerUnit(pricePerUnit);

        portfolioAssetRepository.save(portfolioAsset);

        return "Asset in your portfolio updated successfully";
    }

    public void deletePortfolioAsset(String assetName, String portfolioName, @AuthenticationPrincipal AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        Asset asset = assetRepository.findByNameAndAccount(assetName,account).get();
        Portfolio portfolio = portfolioRepository.findByNameAndAccount(portfolioName,account).get();

        portfolioAssetRepository.deleteById(portfolioAssetRepository.findByAssetAndPortfolio(asset,portfolio).get().getId());
    }
}
