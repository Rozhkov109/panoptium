package panoptiumtech.panoptium.api.clients.market;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Map;

@FeignClient(name = "alternativeMe", url = "https://api.alternative.me")
public interface AlternativeMeClient {
    @GetMapping("/fng")
    Map<String, Object> getFearAndGreedIndex();
//    Map<String, Object> getFearAndGreedIndexDuringSomePeriod(@RequestParam int limit);
}
