package panoptiumtech.panoptium.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import panoptiumtech.panoptium.dto.wallet.WalletDTO;
import panoptiumtech.panoptium.entities.account.AccountDetails;
import panoptiumtech.panoptium.entities.Wallet.Wallet;
import panoptiumtech.panoptium.servicies.wallet.WalletService;

import java.util.List;

@Hidden
@RestController
@RequestMapping("/app/wallet")
public class WalletController {

    WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/get-all")
    public List<Wallet> getAllWallets(@AuthenticationPrincipal AccountDetails accountDetails) {
        return walletService.getAllWallets(accountDetails);
    }

    @PostMapping("/add")
    public String addWallet(
            @AuthenticationPrincipal AccountDetails accountDetails,
            @RequestBody WalletDTO walletDTO) {
        return walletService.addWallet(walletDTO.getAlias(), walletDTO.getNewAddress(), walletDTO.getNetwork(), accountDetails);
    }

    @PostMapping("/edit")
    public String editWallet(
            @AuthenticationPrincipal AccountDetails accountDetails,
            @RequestBody WalletDTO walletDTO) {
        return walletService.updateWallet(walletDTO.getAlias(), walletDTO.getOldAddress() ,walletDTO.getNewAddress(), walletDTO.getNetwork(), accountDetails);
    }

    @PostMapping("/delete")
    public void deleteWallet(@RequestBody String address, @AuthenticationPrincipal AccountDetails accountDetails) {
        walletService.deleteWalletByAddress(address, accountDetails);
    }
}
