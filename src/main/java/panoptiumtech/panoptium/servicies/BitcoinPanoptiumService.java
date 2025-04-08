package panoptiumtech.panoptium.servicies;

import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.api.services.BitcoinApiService;

import java.util.Map;

@Service
public class BitcoinPanoptiumService {
    private final BitcoinApiService bitcoinApiService;

    public BitcoinPanoptiumService(final BitcoinApiService bitcoinApiService) {
        this.bitcoinApiService = bitcoinApiService;
    }

    public int getBitcoinPrice() {
       Map<String, Object> response = bitcoinApiService.getBitcoinPrice();
       return Integer.parseInt(response.get("usd").toString());
    }
}
