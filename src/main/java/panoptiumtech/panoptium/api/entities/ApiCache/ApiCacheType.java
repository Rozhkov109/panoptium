package panoptiumtech.panoptium.api.entities.ApiCache;

import java.time.Duration;

public enum ApiCacheType {
    STOCK_MARKET(Duration.ofHours(24)),
    CRYPTO_MARKET(Duration.ofMinutes(30)),
    FEAR_AND_GREED(Duration.ofHours(24)),
    FEAR_AND_GREED_LIST(Duration.ofHours(24)),
    TOP_100_CRYPTOCURRENCIES(Duration.ofMinutes(30)),
    BTC_INFO(Duration.ofMinutes(30)),
    SOL_INFO(Duration.ofMinutes(30));

    private final Duration timeToLive;

    ApiCacheType(Duration timeToLive) {
        this.timeToLive = timeToLive;
    }

    public Duration getTimeToLive() {
        return timeToLive;
    }
}
