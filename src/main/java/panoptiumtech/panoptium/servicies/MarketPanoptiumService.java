package panoptiumtech.panoptium.servicies;

import lombok.*;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.api.services.MarketApiService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;




@Service
public class MarketPanoptiumService {

    @AllArgsConstructor
    @Getter
    @Setter
    @ToString
    public static class CoinData {
        private int rank;
        private String symbol;
        private String name;
        private String price;
        private long marketCap;
        private String change;
        private String color;
        private String iconUrl;
    }

    private final MarketApiService marketApiService;

    MarketPanoptiumService(MarketApiService marketApiService) {
        this.marketApiService = marketApiService;
    }

    public Map<String,Object> getFearAndGreedIndex() {
        return marketApiService.getFearAndGreedIndex();
    }
    public Map<String,Object> getCryptoData() {
        return marketApiService.getCryptoData();
    }
    public List<CoinData> getTop100CryptoCurrencies() {
        List<Map<String,Object>> response = marketApiService.getTop100CryptoCurrencies();
        List<CoinData> coinsList = new ArrayList<>();

        for (Map<String,Object> coinData : response) {
            int rank = coinData.get("rank") != null ? Integer.parseInt(coinData.get("rank").toString()) : 0;
            String symbol = coinData.get("symbol") != null ? coinData.get("symbol").toString() : "";
            String name = coinData.get("name") != null ? coinData.get("name").toString() : "";
            String price = coinData.get("price") != null ? coinData.get("price").toString() : "";
            long marketCap = coinData.get("marketCap") != null ? Long.parseLong(coinData.get("marketCap").toString()) : 0;
            String change = coinData.get("change") != null ? coinData.get("change").toString() : "";
            String color = coinData.get("color") != null ? coinData.get("color").toString() : "#000000";
            String iconUrl = coinData.get("iconUrl") != null ? coinData.get("iconUrl").toString() : "";

            CoinData coin = new CoinData(rank, symbol, name, price, marketCap, change, color, iconUrl);
            coinsList.add(coin);
        }
        return coinsList;
    }
}