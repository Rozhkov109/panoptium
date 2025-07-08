package panoptiumtech.panoptium.servicies.asset;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.entities.account.Account;
import panoptiumtech.panoptium.entities.account.AccountDetails;
import panoptiumtech.panoptium.entities.asset.Asset;
import panoptiumtech.panoptium.entities.asset.AssetType;
import panoptiumtech.panoptium.repositories.asset.AssetRepository;

import java.util.List;

@Service
public class AssetService {
    private final AssetRepository assetRepository;

    public AssetService(final AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<Asset> getAllAssets(@AuthenticationPrincipal AccountDetails accountDetails) {
        return assetRepository.findAllByAccount(accountDetails.getAccount());
    }

    public String addAsset(String newName, String type, String color, @AuthenticationPrincipal AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        if(assetRepository.findByNameAndAccount(newName, account).isPresent()) {
            return "Asset already exists";
        }

        Asset asset = new Asset(null, account, newName, AssetType.valueOf(type), color);
        assetRepository.save(asset);
        return "Asset added successfully";
    }

    public String updateAsset(String oldName, String newName, String type, String color, @AuthenticationPrincipal AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        Asset asset = assetRepository.findByNameAndAccount(oldName, account).get();
        asset.setName(newName);
        asset.setType(AssetType.valueOf(type));
        asset.setColor(color);

        assetRepository.save(asset);

        return "Asset updated successfully";
    }

    public void deleteAsset(String name,@AuthenticationPrincipal AccountDetails accountDetails) {
        assetRepository.deleteById(assetRepository.findByNameAndAccount(name, accountDetails.getAccount()).get().getId());
    }
}
