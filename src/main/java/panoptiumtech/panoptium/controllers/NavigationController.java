package panoptiumtech.panoptium.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import panoptiumtech.panoptium.entities.Account.AccountDetails;
import panoptiumtech.panoptium.entities.Asset.AssetType;
import panoptiumtech.panoptium.entities.Wallet.WalletNetwork;

@Controller
public class NavigationController {

    @GetMapping("/")
    public String getMainPage() {
        return "index";
    }

    @GetMapping("/bitcoin")
    public String getBTCPage() {
        return "bitcoin";
    }

    @GetMapping("/market")
    public String getMarketPage() {
        return "market";
    }

    @GetMapping("/profile")
    public String getProfilePage(Model model, @AuthenticationPrincipal AccountDetails accountDetails) {
        model.addAttribute("account", accountDetails.getAccount());
        model.addAttribute("networks", WalletNetwork.values());
        model.addAttribute("assetTypes", AssetType.values());
        return "profile";
    }
}
