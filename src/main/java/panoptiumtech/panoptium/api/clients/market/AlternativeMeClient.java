package panoptiumtech.panoptium.api.clients.market;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "alternativeMe", url = "https://api.alternative.me")
public interface AlternativeMeClient {
    @GetMapping("/fng")
    Map<String, Object> getFearAndGreedIndex();

    @GetMapping("/fng/")
    Map<String, Object> getFearAndGreedIndexDuringTimePeriod(@RequestParam("limit") int limit,@RequestParam("date_format") String dateFormat);
}
