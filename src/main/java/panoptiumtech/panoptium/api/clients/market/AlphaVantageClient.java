package panoptiumtech.panoptium.api.clients.market;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "alphaVantage", url = "https://www.alphavantage.co/query")
public interface AlphaVantageClient {
    @GetMapping("/")
    Map<String,Object> getStockMarketData(
            @RequestParam("function") String function,
            @RequestParam("symbol") String symbol,
            @RequestParam("apikey") String apiKey);
}
