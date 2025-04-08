package panoptiumtech.panoptium.api.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "coinMarketCap", url = "https://pro-api.coinmarketcap.com")
public interface CoinMarketCapClient {
    @GetMapping("/v1/global-metrics/quotes/latest")
    Map<String, Object> getCryptoData(@RequestParam("CMC_PRO_API_KEY") String apiKey);
}