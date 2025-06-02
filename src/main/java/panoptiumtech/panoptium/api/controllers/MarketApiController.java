package panoptiumtech.panoptium.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import panoptiumtech.panoptium.api.services.api.MarketApiService;

import java.util.Map;


@Tag(name = "Market API", description = "Data from stock and crypto markets")
@RestController
@RequestMapping("/api/v1/market")
public class MarketApiController {
    private final MarketApiService marketApiService;

    @Autowired
    public MarketApiController(final MarketApiService marketApiService) {
        this.marketApiService = marketApiService;
    }


    @Operation(summary = "Gives crypto fear and greed index", description = "Shows the mood of market participants as a number from 0 to 100, " +
            "where 0 is maximum fear and complete apathy, and 100 is crazy euphoria and confidence in growth. " +
            "<br>The data is not a financial recommendation!")
    @GetMapping("/fear-and-greed")
    public Map<String, Object> getFearAndIndex() { return marketApiService.getFearAndGreedIndex(); }

    @Operation(summary = "Gives main information about crypto market", description = "Gives a set of one the most important metrics in crypto market, such as: " +
            "<br>BTC,ETH market cap<br>BTC,ETH 1d market cap change<br>BTC,ETH domination" +
            "<br>BTC,ETH 1d domination change<br>All crypto market capitalization<br><br>The data is not a financial recommendation!")
    @GetMapping("/crypto")
    public Map<String, Object> getCryptoData() { return marketApiService.getCryptoData(); }

    @Operation(summary = "Gives top 100 coins list", description = "Gives a list of 100 the most highly capitalized coins.")
    @GetMapping("/top-100-crypto-currencies")
    public Map<String, Object> getTop100CryptoCurrencies() { return marketApiService.getTop100CryptoCurrencies(); }

    @Operation(summary = "Gives a list of stock market indices", description = "Gives a list of stock market indices." +
            "<br>Important: most of them are ETF`s, not real index. Please check the endpoint tickers:" +
            "<br>S&P 500 (SPDR ETF)<br>Dow Jones (SPDR ETF)<br>Nasdaq Composite (Invesco QQQ Trust ETF)<br>" +
            "Russel 2000 (iShares ETF)<br>Volatility Index (iPath VIX ETN)<br>Gold<br>Silver")
    @GetMapping("/stock")
    public Map<String,Object> getStockMarketData() { return marketApiService.getStockMarketData(); }
}
