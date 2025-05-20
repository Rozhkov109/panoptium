package panoptiumtech.panoptium.api.clients.bitcoin;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@FeignClient(name = "blockstreamClient", url = "https://blockstream.info/api/")
public interface BlockstreamClient {
   @GetMapping("/address/{address}/txs/chain")
   List<Map<String, Object>> getLast25BtcWalletTransactions(
           @PathVariable("address") String address);

   @GetMapping("/address/{address}/txs/chain/{lastTransactionId}")
   List<Map<String, Object>> getBtcWalletTransactionsByTransactionId(
           @PathVariable("address") String address,
           @PathVariable(value = "lastTransactionId") String lastTransactionId);
}