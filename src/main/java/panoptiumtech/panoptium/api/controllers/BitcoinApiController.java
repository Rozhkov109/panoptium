package panoptiumtech.panoptium.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import panoptiumtech.panoptium.api.services.api.BitcoinApiService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/bitcoin")
public class BitcoinApiController {
    private final BitcoinApiService bitcoinApiService;

    @Autowired
    public BitcoinApiController(final BitcoinApiService bitcoinApiService) {
        this.bitcoinApiService = bitcoinApiService;
    }

    @GetMapping("wallet/{address}")
    public Map<String, Object> getTransactions(@PathVariable String address) {
        return bitcoinApiService.getBtcWalletTransactions(address);
    }

    @GetMapping("/info")
    public Map<String, Object> getBtcInfo() {
        return bitcoinApiService.getBtcInfo();
    }
}
