package panoptiumtech.panoptium.api.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import panoptiumtech.panoptium.api.services.api.BitcoinApiService;

import java.util.List;
import java.util.Map;

@Tag(name = "Bitcoin API", description = "Here you can receive main BTC data and wallets transaction history")
@RestController
@RequestMapping("/api/v1/bitcoin")
public class BitcoinApiController {
    private final BitcoinApiService bitcoinApiService;

    @Autowired
    public BitcoinApiController(final BitcoinApiService bitcoinApiService) {
        this.bitcoinApiService = bitcoinApiService;
    }

    @Operation(summary = "Gives Bitcoin wallet confirmed transactions", description = "Returns a list of bitcoin wallet confirmed transaction." +
            "<br>Attention! Receiving transactions (especially) if you entered a big wallet) could take quite a lot of time. Patience please!")
    @GetMapping("wallet/{address}")
    public Map<String, Object> getTransactions(@PathVariable String address) {
        return bitcoinApiService.getBtcWalletTransactions(address);
    }

    @Operation(summary = "Gives Bitcoin main metrics", description = "Gives Bitcoin main metrics such as:" +
            "<br><br>Rank by capitalization<br>Market cap<br>Day,week and month price change")
    @GetMapping("/info")
    public Map<String, Object> getBtcInfo() {
        return bitcoinApiService.getBtcInfo();
    }
}
