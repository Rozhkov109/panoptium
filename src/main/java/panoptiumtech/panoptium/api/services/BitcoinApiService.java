package panoptiumtech.panoptium.api.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.api.clients.CoinGeckoClient;

import java.util.Map;

@Service
public class BitcoinApiService {
    private final CoinGeckoClient coinGeckoClient;
    private final ObjectMapper objectMapper;

    public BitcoinApiService(final CoinGeckoClient coinGeckoClient , final ObjectMapper objectMapper) {
        this.coinGeckoClient = coinGeckoClient;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> getBitcoinPrice() {
        return objectMapper.convertValue(coinGeckoClient.getBitcoinPrice("bitcoin","usd").get("bitcoin"), new TypeReference<Map<String, Object>>() {});
    }
}
