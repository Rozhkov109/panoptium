package panoptiumtech.panoptium.api.repositories.apiCache;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import panoptiumtech.panoptium.api.entities.apiCache.ApiCache;
import panoptiumtech.panoptium.api.entities.apiCache.ApiCacheType;

import java.util.Optional;

@Repository
public interface ApiCacheRepository extends JpaRepository<ApiCache, Long> {
    Optional<ApiCache> findTop1ByTypeOrderByCreatedAtDesc(ApiCacheType type);
}
