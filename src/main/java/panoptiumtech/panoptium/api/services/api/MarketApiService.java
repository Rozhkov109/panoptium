package panoptiumtech.panoptium.api.services.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.api.clients.market.AlphaVantageClient;
import panoptiumtech.panoptium.api.clients.market.AlternativeMeClient;
import panoptiumtech.panoptium.api.clients.market.CoinMarketCapClient;
import panoptiumtech.panoptium.api.clients.market.CoinRankingClient;
import panoptiumtech.panoptium.api.entities.ApiCache.ApiCacheType;
import panoptiumtech.panoptium.api.utils.ApiCacheManager;

import java.util.*;

@Service
public class MarketApiService {
    private final String COIN_MARKET_CAP_API_KEY;
    private final String COIN_RANKING_API_KEY;
    private final String ALPHA_VANTAGE_API_KEY;

    private final ApiCacheManager apiCacheManager;

    private final AlternativeMeClient alternativeMeClient;
    private final CoinMarketCapClient coinMarketCapClient;
    private final CoinRankingClient coinRankingClient;
    private final AlphaVantageClient alphaVantageClient;
    private final ObjectMapper objectMapper;

    @Autowired
    MarketApiService(
            @Value("${api.coinMarketCap.key}") String COIN_MARKET_CAP_API_KEY,
            @Value("${api.coinRanking.key}") String COIN_RANKING_API_KEY,
            @Value("${api.alphaVantage.key}") String ALPHA_VANTAGE_API_KEY,
            ApiCacheManager apiCacheManager,
            AlternativeMeClient alternativeMeClient,
            CoinMarketCapClient coinMarketCapClient,
            CoinRankingClient coinRankingClient,
            AlphaVantageClient alphaVantageClient,
            ObjectMapper objectMapper) {
        this.COIN_MARKET_CAP_API_KEY = COIN_MARKET_CAP_API_KEY;
        this.COIN_RANKING_API_KEY = COIN_RANKING_API_KEY;
        this.ALPHA_VANTAGE_API_KEY = ALPHA_VANTAGE_API_KEY;
        this.apiCacheManager = apiCacheManager;
        this.alternativeMeClient = alternativeMeClient;
        this.coinMarketCapClient = coinMarketCapClient;
        this.coinRankingClient = coinRankingClient;
        this.alphaVantageClient = alphaVantageClient;
        this.objectMapper = objectMapper;
    }

    public Map<String,Object> getFearAndGreedIndex() {
        Map<String,Object> json = apiCacheManager.getCachedResponse(ApiCacheType.FEAR_AND_GREED);
        if(!json.isEmpty())  {
            System.out.println(ApiCacheType.FEAR_AND_GREED + " has been taken from cache");
            return json;
        }

        Map<String,Object> apiResponse = alternativeMeClient.getFearAndGreedIndex();
        List<Map<String,Object>> response = objectMapper.convertValue(apiResponse.get("data"), new TypeReference<>(){});
        Map<String,Object> fearAndGreed = response.get(0);

        int index = Integer.parseInt(fearAndGreed.get("value").toString());
        String classification = fearAndGreed.get("value_classification").toString();

        Map<String, Object> answer = new LinkedHashMap<>();
        answer.put("index", index);
        answer.put("classification", classification);

        if(apiCacheManager.cacheRequest(ApiCacheType.FEAR_AND_GREED, answer)) {
            System.out.println(ApiCacheType.FEAR_AND_GREED + " has been taken from API and cached");
        }

        return answer;
    }

    public Map<String,Object> getFearAndGreedDuringTimePeriod(int limit) {
        Map<String,Object> json = apiCacheManager.getCachedResponse(ApiCacheType.FEAR_AND_GREED_LIST);
        if(!json.isEmpty())  {
            System.out.println(ApiCacheType.FEAR_AND_GREED_LIST + " has been taken from cache");
            return json;
        }
        Map<String,Object> apiResponse = alternativeMeClient.getFearAndGreedIndexDuringTimePeriod(limit,"world");
        List<Map<String,Object>> response = objectMapper.convertValue(apiResponse.get("data"), new TypeReference<>(){});

        Map<String, Object> answer = new LinkedHashMap<>();
        List<Map<String,Object>> fearAndGreedlist = new ArrayList<>();

        for(Map<String,Object> fearAndGreed : response) {
            Map<String, Object> fearAndGreedValue = new LinkedHashMap<>();

            int index = Integer.parseInt(fearAndGreed.get("value").toString());
            String classification = fearAndGreed.get("value_classification").toString();
            String date = fearAndGreed.get("timestamp").toString();

            fearAndGreedValue.put("index", index);
            fearAndGreedValue.put("classification", classification);
            fearAndGreedValue.put("date", date);

            fearAndGreedlist.add(fearAndGreedValue);
        }
        answer.put("data", fearAndGreedlist);

        if(apiCacheManager.cacheRequest(ApiCacheType.FEAR_AND_GREED_LIST, answer)) {
            System.out.println(ApiCacheType.FEAR_AND_GREED_LIST + " has been taken from API and cached");
        }

        return answer;
    }

    public Map<String,Object> getCryptoData() {
        Map<String,Object> json = apiCacheManager.getCachedResponse(ApiCacheType.CRYPTO_MARKET);
        if(!json.isEmpty())  {
            System.out.println(ApiCacheType.CRYPTO_MARKET + " has been taken from cache");
            return json;
        }

        Map<String, Object> apiResponse = coinMarketCapClient.getCryptoData(COIN_MARKET_CAP_API_KEY);
        Map<String,Object> dataResponse = objectMapper.convertValue(apiResponse.get("data"), new TypeReference<>(){});
        Map<String,Object> quoteResponse = objectMapper.convertValue(dataResponse.get("quote"), new TypeReference<>(){});
        Map<String,Object> usdResponse = objectMapper.convertValue(quoteResponse.get("USD"), new TypeReference<>(){});

        double btcDominance = Double.parseDouble(dataResponse.get("btc_dominance").toString());
        double btcDominance24hChange = Double.parseDouble(dataResponse.get("btc_dominance_24h_percentage_change").toString());
        double ethDominance = Double.parseDouble(dataResponse.get("eth_dominance").toString());
        double ethDominance24hChange = Double.parseDouble(dataResponse.get("eth_dominance_24h_percentage_change").toString());
        long marketCap = (long) (Double.parseDouble(usdResponse.get("total_market_cap").toString()));
        double cryptoMarketCap24hChange = Double.parseDouble(usdResponse.get("total_market_cap_yesterday_percentage_change").toString());

        Map<String, Object> answer = new LinkedHashMap<>();

        answer.put("btc_dominance", btcDominance);
        answer.put("btc_dominance_24h_percentage_change", btcDominance24hChange);
        answer.put("eth_dominance", ethDominance);
        answer.put("eth_dominance_24h_percentage_change", ethDominance24hChange);
        answer.put("market_cap", marketCap);
        answer.put("market_cap_24h_percentage_change", cryptoMarketCap24hChange);

        if(apiCacheManager.cacheRequest(ApiCacheType.CRYPTO_MARKET, answer)) {
            System.out.println(ApiCacheType.CRYPTO_MARKET + " has been taken from API and cached");
        }

        return answer;
    }

    private Map<String,Object> getCoinsPriceChangeMap(Map<String, Object> data) {
        Map<String, Object> dataResponse = objectMapper.convertValue(data.get("data"), new TypeReference<>(){});
        List<Map<String,Object>> coinsList = objectMapper.convertValue(dataResponse.get("coins"), new TypeReference<>(){});

        Map<String,Object> priceChangeMap = new HashMap<>();

        for (Map<String,Object> coin : coinsList) {
            String uuid = coin.get("uuid").toString();
            String change = coin.get("change") == null ? "No Data" : coin.get("change").toString();
            priceChangeMap.put(uuid, change);
        }
        return priceChangeMap;
    }

    public Map<String, Object> getTop100CryptoCurrencies() {
        Map<String,Object> json = apiCacheManager.getCachedResponse(ApiCacheType.TOP_100_CRYPTOCURRENCIES);
        if(!json.isEmpty())  {
            System.out.println(ApiCacheType.TOP_100_CRYPTOCURRENCIES + " has been taken from cache");
            return json;
        }

        Map<String,Object> apiResponse30d = coinRankingClient.getTop100CryptoCurrencies(COIN_RANKING_API_KEY, 100, "30d");
        Map<String,Object> apiResponse7d = coinRankingClient.getTop100CryptoCurrencies(COIN_RANKING_API_KEY, 100, "7d");
        Map<String,Object> apiResponse1d = coinRankingClient.getTop100CryptoCurrencies(COIN_RANKING_API_KEY,100, "24h");

        Map<String,Object> coinsPriceChange7d = getCoinsPriceChangeMap(apiResponse7d);
        Map<String,Object> coinsPriceChange1d = getCoinsPriceChangeMap(apiResponse1d);

        Map<String, Object> dataResponse30d = objectMapper.convertValue(apiResponse30d.get("data"), new TypeReference<>(){});
        List<Map<String,Object>> coinsList30d = objectMapper.convertValue(dataResponse30d.get("coins"), new TypeReference<>(){});

        Map<String,Object> answer = new HashMap<>();
        List<Map<String,Object>> coinsList = new ArrayList<>();

        for(Map<String,Object> coin : coinsList30d) {
            Map<String,Object> coinFullData = new LinkedHashMap<>();
            String uuid = coin.get("uuid").toString();

            coinFullData.put("rank", Integer.parseInt(coin.get("rank").toString()));
            coinFullData.put("symbol", coin.get("symbol").toString());
            coinFullData.put("name", coin.get("name").toString());
            coinFullData.put("price", coin.get("price").toString());
            coinFullData.put("marketCap", coin.get("marketCap").toString());

            coinFullData.put("priceChange1d", coinsPriceChange1d.get(uuid).toString());
            coinFullData.put("priceChange7d", coinsPriceChange7d.get(uuid).toString());
            coinFullData.put("priceChange30d", coin.get("change") == null ? "No data" : coin.get("change").toString());

            coinFullData.put("color", coin.get("color") == null ? "No data" : coin.get("color").toString());
            coinFullData.put("iconUrl", coin.get("iconUrl").toString());

            coinsList.add(coinFullData);
        }
        answer.put("coins", coinsList);

        if(apiCacheManager.cacheRequest(ApiCacheType.TOP_100_CRYPTOCURRENCIES, answer)) {
            System.out.println(ApiCacheType.TOP_100_CRYPTOCURRENCIES + " has been taken from API and cached");
        }

        return answer;
    }

    private Map<String,Object> getStockMarketAssetData(String ticker) {
        Map<String, Object> apiResponse = alphaVantageClient.getStockMarketData("TIME_SERIES_DAILY",ticker,ALPHA_VANTAGE_API_KEY);
        Map<String, Object> metaDataResponse = objectMapper.convertValue(apiResponse.get("Meta Data"), new TypeReference<>(){});
        Map<String, Object> dataResponse = objectMapper.convertValue(apiResponse.get("Time Series (Daily)"), new TypeReference<>(){});

        String lastUpdatedDate = objectMapper.convertValue(metaDataResponse.get("3. Last Refreshed"), new TypeReference<>(){});

        List<Map<String,Object>> listOfAllDates = new ArrayList<>();

        for(Map.Entry<String,Object> entry : dataResponse.entrySet()) {
            if(entry.getValue() instanceof Map) {
                Map<String,Object> data = objectMapper.convertValue(entry.getValue(), new TypeReference<>(){});
                data.remove("1. open");
                data.remove("2. high");
                data.remove("3. low");
                data.remove("5. volume");

                String price = data.get("4. close").toString();
                data.remove("4. close");

                data.put("date", entry.getKey());
                data.put("closePrice", price);

                listOfAllDates.add(data);
            }
        }
        List<Map<String,Object>> listOfImportantDates = new ArrayList<>();
        listOfImportantDates.add(listOfAllDates.get(0));
        listOfImportantDates.add(listOfAllDates.get(1));
        listOfImportantDates.add(listOfAllDates.get(7));
        listOfImportantDates.add(listOfAllDates.get(30));

        Map<String,Object> answer = new LinkedHashMap<>();
        answer.put("ticker", ticker);
        answer.put("lastUpdatedAt", lastUpdatedDate);
        answer.put("data", listOfImportantDates);

        return answer;
    }

    public Map<String,Object> getStockMarketData() {
        Map<String,Object> json = apiCacheManager.getCachedResponse(ApiCacheType.STOCK_MARKET);
        if(!json.isEmpty())  {
            System.out.println(ApiCacheType.STOCK_MARKET + " has been taken from cache");
            return json;
        }

        Map<String,Object> answer = new LinkedHashMap<>();
        List<Map<String,Object>> stockMarketData = new ArrayList<>();

        stockMarketData.add(getStockMarketAssetData("SPY")); // S&P 500
        stockMarketData.add(getStockMarketAssetData("DIA")); // Dow Jones
        stockMarketData.add(getStockMarketAssetData("QQQ")); // Nasdaq Composite
        stockMarketData.add(getStockMarketAssetData("IWM")); // Russel 2000
        stockMarketData.add(getStockMarketAssetData("VXX")); // Volatility Index
        stockMarketData.add(getStockMarketAssetData("XAUUSD")); // Gold
        stockMarketData.add(getStockMarketAssetData("XAGUSD")); // Silver

        answer.put("stockMarketData", stockMarketData);

        if(apiCacheManager.cacheRequest(ApiCacheType.STOCK_MARKET, answer)) {
            System.out.println(ApiCacheType.STOCK_MARKET + " has been taken from API and cached");
        }

        return answer;
    }
}