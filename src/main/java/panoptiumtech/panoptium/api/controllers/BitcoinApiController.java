package panoptiumtech.panoptium.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import panoptiumtech.panoptium.api.services.BitcoinApiService;

import java.util.Map;

@RestController
@RequestMapping("/api/bitcoin")
public class BitcoinApiController {
    private final BitcoinApiService bitcoinApiService;

    public BitcoinApiController(BitcoinApiService bitcoinApiService) {
        this.bitcoinApiService = bitcoinApiService;
    }

    @GetMapping("/price")
    public Map<String,Object> getBitcoinPrice() {
        return bitcoinApiService.getBitcoinPrice();
    }
}
