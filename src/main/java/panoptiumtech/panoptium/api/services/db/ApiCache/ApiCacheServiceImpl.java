package panoptiumtech.panoptium.api.services.db.ApiCache;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.api.entities.ApiCache.ApiCache;
import panoptiumtech.panoptium.api.entities.ApiCache.ApiCacheType;
import panoptiumtech.panoptium.api.repositories.ApiCache.ApiCacheRepository;
import panoptiumtech.panoptium.api.utils.ApiHelper;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class ApiCacheServiceImpl implements ApiCacheService {

    private final ApiCacheRepository apiCacheRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    ApiCacheServiceImpl(final ApiCacheRepository apiCacheRepository, final ObjectMapper objectMapper) {
        this.apiCacheRepository = apiCacheRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public String addApiCache(ApiCache apiCache) {
        try {
            apiCacheRepository.save(apiCache);
            return ApiHelper.DbMessages.ApiCache.INSERT_SUCCESS;
        }
        catch (Exception e) {
            return ApiHelper.DbMessages.ApiCache.INSERT_FAILED;
        }
    }

    @Override
    public Optional<ApiCache> getApiCacheById(Long id) {
        return apiCacheRepository.findById(id);
    }

    @Override
    public boolean removeApiCacheById(Long id) {
        if(apiCacheRepository.existsById(id)) {
            apiCacheRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Optional<Map<String,Object>> getLastApiResponseByType(ApiCacheType type) {
        ApiCache apiCache;
        Optional<ApiCache> apiCacheOptional = apiCacheRepository.findTop1ByTypeOrderByCreatedAtDesc(type);

        if(apiCacheOptional.isPresent()) {
            apiCache = apiCacheOptional.get();
        } else {
            return Optional.empty();
        }

        Duration duration = Duration.between(apiCache.getCreatedAt(), LocalDateTime.now());
        if (duration.compareTo(apiCache.getType().getTimeToLive()) <= 0) {
            try {
                return Optional.of(objectMapper.readValue(apiCache.getResponse(), new TypeReference<>(){}));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        else {
           return Optional.empty();
        }
    }
}
