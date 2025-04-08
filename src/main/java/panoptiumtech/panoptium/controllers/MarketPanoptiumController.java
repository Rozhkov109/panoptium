package panoptiumtech.panoptium.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import panoptiumtech.panoptium.servicies.MarketPanoptiumService;

import java.util.Map;

@Controller
public class MarketPanoptiumController {
    private final MarketPanoptiumService marketPanoptiumService;

    MarketPanoptiumController(MarketPanoptiumService marketPanoptiumService) {
        this.marketPanoptiumService = marketPanoptiumService;
    }

    @GetMapping("/market/fear-and-greed")
    public String getFearAndGreedIndex(final Model model) {
        Map<String, Object> data = marketPanoptiumService.getFearAndGreedIndex();

        model.addAttribute("fearAndGreedIndex", data.get("index"));
        model.addAttribute("classification", data.get("classification"));
        return "market";
    }

    @GetMapping("/market/crypto-data")
    public String getCryptoData(final Model model) {
        Map<String, Object> data = marketPanoptiumService.getCryptoData();

        model.addAttribute("btcDominance", data.get("btc_dominance"));
        model.addAttribute("ethDominance", data.get("eth_dominance"));
        model.addAttribute("btcDominance24hChange", data.get("btc_dominance_24h_percentage_change"));
        model.addAttribute("ethDominance24hChange", data.get("eth_dominance_24h_percentage_change"));
        model.addAttribute("totalMarketCap", data.get("total_market_cap"));
        model.addAttribute("cryptoMarketCap24hChange", data.get("total_market_cap_yesterday_percentage_change"));

        return "market";
    }

    @GetMapping("/market/top-100-crypto-currencies")
    public String getTop100CryptoCurrencies(final Model model) {
        model.addAttribute("coinsList", marketPanoptiumService.getTop100CryptoCurrencies());
        return "market";
    }
}