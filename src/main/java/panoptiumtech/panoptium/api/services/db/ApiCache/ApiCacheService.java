package panoptiumtech.panoptium.api.services.db.ApiCache;

import panoptiumtech.panoptium.api.entities.ApiCache.ApiCache;
import panoptiumtech.panoptium.api.entities.ApiCache.ApiCacheType;

import java.util.Map;
import java.util.Optional;

public interface ApiCacheService {
    String addApiCache(ApiCache apiCache);
    Optional<ApiCache> getApiCacheById(Long id);
    boolean removeApiCacheById(Long id);

    Optional<Map<String,Object>> getLastApiResponseByType(ApiCacheType type);
}
