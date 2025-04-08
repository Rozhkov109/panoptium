package panoptiumtech.panoptium.api.clients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "coinGecko", url = "https://api.coingecko.com/api/v3")
public interface CoinGeckoClient {
    @GetMapping("/simple/price")
    Map<String, Object> getBitcoinPrice(
            @RequestParam("ids") String tokenName,
            @RequestParam("vs_currencies") String currency);
}
