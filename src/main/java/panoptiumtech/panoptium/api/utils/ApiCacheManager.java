package panoptiumtech.panoptium.api.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.api.entities.apiCache.ApiCache;
import panoptiumtech.panoptium.api.entities.apiCache.ApiCacheType;
import panoptiumtech.panoptium.api.services.db.apiCache.ApiCacheServiceImpl;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class ApiCacheManager {
    private final ApiCacheServiceImpl apiCacheService;
    private final ObjectMapper objectMapper;

    @Autowired
    ApiCacheManager(ApiCacheServiceImpl apiCacheService, ObjectMapper objectMapper) {
        this.apiCacheService = apiCacheService;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> getCachedResponse(ApiCacheType type) {
        Optional<Map<String,Object>> responseFromDB = apiCacheService.getLastApiResponseByType(type);
        return responseFromDB.orElseGet(HashMap::new);
    }

    public boolean cacheRequest(ApiCacheType type, Map<String, Object> json) {
        String responseString;
        try {
            responseString = objectMapper.writeValueAsString(json);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Conversion Map to String error!", e);
        }
        String result = apiCacheService.addApiCache(new ApiCache(null,type, responseString, LocalDateTime.now()));
        return result.equals(ApiHelper.DbMessages.ApiCache.INSERT_SUCCESS);
    }
}
