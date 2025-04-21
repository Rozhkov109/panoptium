package panoptiumtech.panoptium.api.repositories.ApiCache;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import panoptiumtech.panoptium.api.entities.ApiCache.ApiCache;
import panoptiumtech.panoptium.api.entities.ApiCache.ApiCacheType;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApiCacheRepository extends JpaRepository<ApiCache, Long> {
    Optional<ApiCache> findTop1ByTypeOrderByCreatedAtDesc(ApiCacheType type);
}
