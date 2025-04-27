package panoptiumtech.panoptium.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import panoptiumtech.panoptium.api.services.api.MarketApiService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/market")
public class MarketApiController {
    private final MarketApiService marketApiService;

    @Autowired
    public MarketApiController(final MarketApiService marketApiService) {
        this.marketApiService = marketApiService;
    }

    @GetMapping("/fear-and-greed")
    public Map<String, Object> getFearAndIndex() { return marketApiService.getFearAndGreedIndex(); }

    @GetMapping("/crypto")
    public Map<String, Object> getCryptoData() { return marketApiService.getCryptoData(); }

    @GetMapping("/top-100-crypto-currencies")
    public Map<String, Object> getTop100CryptoCurrencies() { return marketApiService.getTop100CryptoCurrencies(); }

    @GetMapping("/stock")
    public Map<String,Object> getStockMarketData() { return marketApiService.getStockMarketData(); }
}
