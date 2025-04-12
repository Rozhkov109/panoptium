package panoptiumtech.panoptium.api.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.api.clients.AlphaVantageClient;
import panoptiumtech.panoptium.api.clients.AlternativeMeClient;
import panoptiumtech.panoptium.api.clients.CoinMarketCapClient;
import panoptiumtech.panoptium.api.clients.CoinRankingClient;

import java.time.LocalDate;
import java.util.*;

@Service
public class MarketApiService {

    private final String COIN_MARKET_CAP_API_KEY;
    private final String COIN_RANKING_API_KEY;
    private final String ALPHA_VANTAGE_API_KEY;

    private final AlternativeMeClient alternativeMeClient;
    private final CoinMarketCapClient coinMarketCapClient;
    private final CoinRankingClient coinRankingClient;
    private final AlphaVantageClient alphaVantageClient;
    private final ObjectMapper objectMapper;

    MarketApiService(
            @Value("${api.coinMarketCap.key}") String COIN_MARKET_CAP_API_KEY,
            @Value("${api.coinRanking.key}") String COIN_RANKING_API_KEY,
            @Value("${api.alphaVantage.key}") String ALPHA_VANTAGE_API_KEY,
            AlternativeMeClient alternativeMeClient,
            CoinMarketCapClient coinMarketCapClient,
            CoinRankingClient coinRankingClient,
            AlphaVantageClient alphaVantageClient,
            ObjectMapper objectMapper) {
        this.COIN_MARKET_CAP_API_KEY = COIN_MARKET_CAP_API_KEY;
        this.COIN_RANKING_API_KEY = COIN_RANKING_API_KEY;
        this.ALPHA_VANTAGE_API_KEY = ALPHA_VANTAGE_API_KEY;
        this.alternativeMeClient = alternativeMeClient;
        this.coinMarketCapClient = coinMarketCapClient;
        this.coinRankingClient = coinRankingClient;
        this.alphaVantageClient = alphaVantageClient;
        this.objectMapper = objectMapper;
    }

    public Map<String,Object> getFearAndGreedIndex() {
        Map<String,Object> apiResponse = alternativeMeClient.getFearAndGreedIndex();
        List<Map<String,Object>> response = objectMapper.convertValue(apiResponse.get("data"), new TypeReference<>(){});
        Map<String,Object> fearAndGreed = response.get(0);

        int index = Integer.parseInt(fearAndGreed.get("value").toString());
        String classification = fearAndGreed.get("value_classification").toString();

        Map<String, Object> answer = new LinkedHashMap<>();
        answer.put("index", index);
        answer.put("classification", classification);

        return answer;
    }

    public Map<String,Object> getCryptoData() {
        Map<String, Object> apiResponse = coinMarketCapClient.getCryptoData(COIN_MARKET_CAP_API_KEY);
        Map<String,Object> dataResponse = objectMapper.convertValue(apiResponse.get("data"), new TypeReference<>(){});
        Map<String,Object> quoteResponse = objectMapper.convertValue(dataResponse.get("quote"), new TypeReference<>(){});
        Map<String,Object> usdResponse = objectMapper.convertValue(quoteResponse.get("USD"), new TypeReference<>(){});

        double btcDominance = Double.parseDouble(dataResponse.get("btc_dominance").toString());
        double btcDominance24hChange = Double.parseDouble(dataResponse.get("btc_dominance_24h_percentage_change").toString());
        double ethDominance = Double.parseDouble(dataResponse.get("eth_dominance").toString());
        double ethDominance24hChange = Double.parseDouble(dataResponse.get("eth_dominance_24h_percentage_change").toString());
        long totalMarketCap = (long) (Double.parseDouble(usdResponse.get("total_market_cap").toString()));
        double cryptoMarketCap24hChange = Double.parseDouble(usdResponse.get("total_market_cap_yesterday_percentage_change").toString());

        Map<String, Object> answer = new LinkedHashMap<>();

        answer.put("btc_dominance", btcDominance);
        answer.put("btc_dominance_24h_percentage_change", btcDominance24hChange);
        answer.put("eth_dominance", ethDominance);
        answer.put("eth_dominance_24h_percentage_change", ethDominance24hChange);
        answer.put("total_market_cap", totalMarketCap);
        answer.put("total_market_cap_yesterday_percentage_change", cryptoMarketCap24hChange);

        return answer;
    }

    public List<Map<String, Object>> getTop100CryptoCurrencies() {
        Map<String,Object> apiResponse = coinRankingClient.getTop100CryptoCurrencies(COIN_RANKING_API_KEY, 100, "30d");
        Map<String, Object> dataResponse = objectMapper.convertValue(apiResponse.get("data"), new TypeReference<>(){});
        List<Map<String,Object>> coinsList = objectMapper.convertValue(dataResponse.get("coins"), new TypeReference<>(){});

        for (Map<String,Object> coin : coinsList) {
            coin.remove("uuid");
            coin.remove("listedAt");
            coin.remove("tier");
            coin.remove("sparkline");
            coin.remove("lowVolume");
            coin.remove("coinrankingUrl");
            coin.remove("24hVolume");
            coin.remove("btcPrice");
            coin.remove("contractAddresses");
        }
        return coinsList;
    }

    public Map<String,Object> getStockMarketData(String symbol) {
        Map<String, Object> apiResponse = alphaVantageClient.getStockMarketData("TIME_SERIES_DAILY",symbol,ALPHA_VANTAGE_API_KEY);
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

        Map<String,Object> response = new LinkedHashMap<>();
        response.put("symbol", symbol);
        response.put("lastUpdatedAt", lastUpdatedDate);
        response.put("data", listOfImportantDates);

        return response;
    }
}