package panoptiumtech.panoptium.api.clients.market;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "coinRanking", url = "https://api.coinranking.com/v2")
public interface CoinRankingClient {
    @GetMapping("/coins")
    Map<String, Object> getTop100CryptoCurrencies(
            @RequestParam("x-access-token") String apiKey,
            @RequestParam("limit") int coinsAmount,
            @RequestParam("timePeriod") String priceChangeTimePeriod
    );
}
