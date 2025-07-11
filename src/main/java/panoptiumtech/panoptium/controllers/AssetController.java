package panoptiumtech.panoptium.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import panoptiumtech.panoptium.dto.asset.AssetDTO;
import panoptiumtech.panoptium.entities.account.AccountDetails;
import panoptiumtech.panoptium.entities.asset.Asset;
import panoptiumtech.panoptium.servicies.asset.AssetService;

import java.util.List;

@Hidden
@RestController
@RequestMapping("/app/asset")
public class AssetController {
    private final AssetService assetService;

    public AssetController(final AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping("/get-all")
    public List<Asset> getAllAssets(@AuthenticationPrincipal AccountDetails accountDetails) {
        return assetService.getAllAssets(accountDetails);
    }

    @PostMapping("/add")
    public String addAsset(@AuthenticationPrincipal AccountDetails accountDetails,
                           @RequestBody AssetDTO assetDto) {
        return assetService.addAsset(assetDto.getNewName(),assetDto.getType(),assetDto.getColor(),accountDetails);
    }

    @PostMapping("/edit")
    public String editAsset(@AuthenticationPrincipal AccountDetails accountDetails,
                              @RequestBody AssetDTO assetDto) {
        return assetService.updateAsset(assetDto.getOldName(),assetDto.getNewName(), assetDto.getType(),assetDto.getColor(),accountDetails);
    }

    @PostMapping("/delete")
    public void deleteAsset(@RequestBody String name, @AuthenticationPrincipal AccountDetails accountDetails) {
        assetService.deleteAsset(name,accountDetails);
    }

}
