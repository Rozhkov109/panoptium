package panoptiumtech.panoptium.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NavigationPanoptiumController {

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

}
