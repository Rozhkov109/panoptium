package panoptiumtech.panoptium.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import panoptiumtech.panoptium.api.services.MarketApiService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/market")
public class MarketApiController {
    private final MarketApiService marketApiService;

    public MarketApiController(final MarketApiService marketApiService) {
        this.marketApiService = marketApiService;
    }

    @GetMapping("/fear-and-greed")
    public Map<String, Object> getFearAndIndex() { return marketApiService.getFearAndGreedIndex(); }

    @GetMapping("/crypto-data")
    public Map<String, Object> getCryptoData() { return marketApiService.getCryptoData(); }

    @GetMapping("/top-100-crypto-currencies")
    public List<Map<String, Object>> getTop100CryptoCurrencies() { return marketApiService.getTop100CryptoCurrencies(); }

    @GetMapping("/stock-market-data")
    public Map<String,Object> getStockMarketData(@RequestParam String symbol) { return marketApiService.getStockMarketData(symbol); }
}
