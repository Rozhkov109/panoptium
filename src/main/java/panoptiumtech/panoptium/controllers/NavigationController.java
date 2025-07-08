package panoptiumtech.panoptium.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import panoptiumtech.panoptium.entities.account.AccountDetails;
import panoptiumtech.panoptium.entities.asset.AssetType;
import panoptiumtech.panoptium.entities.Wallet.WalletNetwork;

@Hidden
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

    @GetMapping("/reports")
    public String getReportsPage() {
        return "reports";
    }

    @GetMapping("/api-doc")
    public String getApiDocumentationPage() {
        return "apiDoc";
    }
}
