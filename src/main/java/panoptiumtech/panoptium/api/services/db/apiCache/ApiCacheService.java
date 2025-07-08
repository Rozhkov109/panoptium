package panoptiumtech.panoptium.api.services.db.apiCache;

import panoptiumtech.panoptium.api.entities.apiCache.ApiCache;
import panoptiumtech.panoptium.api.entities.apiCache.ApiCacheType;

import java.util.Map;
import java.util.Optional;

public interface ApiCacheService {
    String addApiCache(ApiCache apiCache);
    Optional<ApiCache> getApiCacheById(Long id);
    boolean removeApiCacheById(Long id);

    Optional<Map<String,Object>> getLastApiResponseByType(ApiCacheType type);
}
