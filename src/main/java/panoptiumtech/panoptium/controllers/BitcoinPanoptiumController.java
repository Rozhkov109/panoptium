package panoptiumtech.panoptium.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import panoptiumtech.panoptium.servicies.BitcoinPanoptiumService;

@Controller
public class BitcoinPanoptiumController {
    private final BitcoinPanoptiumService bitcoinPanoptiumService;

    BitcoinPanoptiumController(BitcoinPanoptiumService bitcoinPanoptiumService) {
        this.bitcoinPanoptiumService = bitcoinPanoptiumService;
    }

    @GetMapping("/bitcoin/price")
    public String getBitcoinPrice(Model model) {
       int btcPrice = bitcoinPanoptiumService.getBitcoinPrice();
       model.addAttribute("bitcoinPrice", btcPrice);
       return "bitcoin";
    }
}
