package panoptiumtech.panoptium.api.services.api;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.api.clients.bitcoin.BlockstreamClient;
import panoptiumtech.panoptium.api.entities.ApiCache.ApiCacheType;
import panoptiumtech.panoptium.api.utils.ApiCacheManager;

import java.math.BigDecimal;
import java.util.*;

@Service
public class BitcoinApiService {
    private final BlockstreamClient blockstreamClient;
    private final MarketApiService marketApiService;
    private final ApiCacheManager apiCacheManager;
    private final ObjectMapper objectMapper;

    public BitcoinApiService(final BlockstreamClient blockstreamClient,
                             final MarketApiService marketApiService,
                             final ApiCacheManager apiCacheManager,
                             final ObjectMapper objectMapper) {
        this.blockstreamClient = blockstreamClient;
        this.marketApiService = marketApiService;
        this.apiCacheManager = apiCacheManager;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> getBtcInfo() {
        Map<String,Object> json = apiCacheManager.getCachedResponse(ApiCacheType.BTC_INFO);
        if(!json.isEmpty())  {
            System.out.println(ApiCacheType.BTC_INFO + " has been taken from cache");
            return json;
        }

        Map<String,Object> answer = new LinkedHashMap<>();

        Map<String, Object> coinData = marketApiService.getTop100CryptoCurrencies();
        List<Map<String,Object>> coinsList = objectMapper.convertValue(coinData.get("coins"), new TypeReference<>() {});

        for (Map<String,Object> coin : coinsList) {
            if(coin.get("symbol").equals("BTC") && coin.get("name").equals("Bitcoin")) {
                answer.put("rank", coin.get("rank"));
                answer.put("price", coin.get("price"));
                answer.put("marketCap", coin.get("marketCap"));
                answer.put("priceChange1d", coin.get("priceChange1d"));
                answer.put("priceChange7d", coin.get("priceChange7d"));
                answer.put("priceChange30d", coin.get("priceChange30d"));
                break;
            }
        }

        Map<String,Object> marketData = marketApiService.getCryptoData();
        answer.put("btcDominance", marketData.get("btc_dominance"));
        answer.put("btcDominance24hChange", marketData.get("btc_dominance_24h_percentage_change"));

        if(apiCacheManager.cacheRequest(ApiCacheType.BTC_INFO, answer)) {
            System.out.println(ApiCacheType.BTC_INFO + " has been taken from Panoptium API and cached");
        }

        return answer;
    }

    private BigDecimal convertSatoshiToBTC(Number satoshi) {
        return BigDecimal.valueOf(satoshi.longValue()).movePointLeft(8);
    }

    private String getLastBtcTransactionId(List<Map<String,Object>> transactions) {
        Map<String,Object> lastBtcTransaction = transactions.get(transactions.size() - 1);
        return lastBtcTransaction.get("txid").toString();
    }

    private List<Map<String,Object>> normalizeBtcTransactions(List<Map<String,Object>> transactions) {
        List<Map<String, Object>> normalizedTransactionList = new ArrayList<>();

        for (Map<String, Object> transaction : transactions) {
            Map<String, Object> normalizedTransaction = new LinkedHashMap<>();
            normalizedTransaction.put("transactionId", transaction.get("txid"));

            List<Map<String,Object>> inputsApi = objectMapper.convertValue(transaction.get("vin"), new TypeReference<>(){});
            List<Map<String,Object>> normalizedInputs = new ArrayList<>();
            for (Map<String, Object> input : inputsApi) {
                Map<String, Object> normalizedInput = new LinkedHashMap<>();
                Map<String, Object> prevoutApi = objectMapper.convertValue(input.get("prevout"), new TypeReference<>(){});

                if(prevoutApi == null || prevoutApi.get("scriptpubkey_address") == null) continue;

                normalizedInput.put("transactionId", input.get("txid"));
                normalizedInput.put("outputIndex", input.get("vout"));
                normalizedInput.put("address", prevoutApi.get("scriptpubkey_address"));
                normalizedInput.put("value", convertSatoshiToBTC((Number)prevoutApi.get("value")));
                normalizedInput.put("isCoinbase", input.get("is_coinbase"));

                normalizedInputs.add(normalizedInput);
            }
            normalizedTransaction.put("inputs", normalizedInputs);

            List<Map<String, Object>> outputsApi = objectMapper.convertValue(transaction.get("vout"), new TypeReference<>(){});
            List<Map<String,Object>> normalizedOutputs = new ArrayList<>();
            for (Map<String, Object> output : outputsApi) {
                Map<String, Object> normalizedOutput = new LinkedHashMap<>();
                if(output.get("scriptpubkey_address") == null) continue;
                normalizedOutput.put("address", output.get("scriptpubkey_address"));
                normalizedOutput.put("value", convertSatoshiToBTC((Number)output.get("value")));

                normalizedOutputs.add(normalizedOutput);
            }
            normalizedTransaction.put("outputs", normalizedOutputs);

            normalizedTransaction.put("fee",convertSatoshiToBTC((Number)transaction.get("fee")));

            Map<String, Object> statusApi = objectMapper.convertValue(transaction.get("status"), new TypeReference<>(){});
            Map<String, Object> normalizedStatus = new LinkedHashMap<>();
            normalizedStatus.put("confirmed", statusApi.get("confirmed"));
            normalizedStatus.put("confirmedAt", statusApi.get("block_time"));
            normalizedTransaction.put("status", normalizedStatus);

            normalizedTransactionList.add(normalizedTransaction);
        }
        return normalizedTransactionList;
    }

    private List<Map<String,Object>> getAllBtcWalletTransactions(String address) {
        List<Map<String, Object>> allTransactions = new ArrayList<>();
        String lastBtcTransactionId = null;
        List<Map<String, Object>> transactionsFromApi;

        do {
            if(lastBtcTransactionId == null) {
                transactionsFromApi = blockstreamClient.getLast25BtcWalletTransactions(address);
            }
            else {
                transactionsFromApi = blockstreamClient.getBtcWalletTransactionsByTransactionId(address, lastBtcTransactionId);
            }
            allTransactions.addAll(transactionsFromApi);
            if(!transactionsFromApi.isEmpty()) lastBtcTransactionId = getLastBtcTransactionId(transactionsFromApi);

        } while (transactionsFromApi.size() == 25);

        return normalizeBtcTransactions(allTransactions);
    }

    public Map<String, Object> getBtcWalletTransactions(String address) {
        Map<String, Object> answer = new LinkedHashMap<>();
        answer.put("address", address);

        List<Map<String, Object>> transactions = getAllBtcWalletTransactions(address);

        // BTC Balance
        Collections.reverse(transactions);
        BigDecimal btcBalance = BigDecimal.ZERO;

        for (Map<String, Object> normalizedTransaction : transactions) {
            List<Map<String, Object>> normalizedInputs = objectMapper.convertValue(normalizedTransaction.get("inputs"), new TypeReference<>(){});
            List<Map<String, Object>> normalizedOutputs = objectMapper.convertValue(normalizedTransaction.get("outputs"), new TypeReference<>(){});

            for (Map<String, Object> normalizedInput : normalizedInputs) {
                if(normalizedInput.get("address").equals(address)) {
                  btcBalance = btcBalance.subtract((BigDecimal)normalizedInput.get("value"));
                }
            }
            for (Map<String, Object> normalizedOutput : normalizedOutputs) {
                if(normalizedOutput.get("address").equals(address)) {
                    btcBalance = btcBalance.add((BigDecimal) normalizedOutput.get("value"));
                }
            }
            normalizedTransaction.put("btcBalance", btcBalance);
        }
        Collections.reverse(transactions);

        // Wallet Data
        Map<String, Object> firstTransactionStatus = objectMapper.convertValue(transactions.get(transactions.size() - 1).get("status"), new TypeReference<>(){});
        Map<String, Object> lastTransactionStatus = objectMapper.convertValue(transactions.get(0).get("status"), new TypeReference<>(){});

        answer.put("firstTransaction", firstTransactionStatus.get("confirmedAt"));
        answer.put("lastTransaction", lastTransactionStatus.get("confirmedAt"));
        answer.put("confirmedTransactions", transactions.size());
        answer.put("currentBalance", btcBalance);
        answer.put("transactions",transactions);
        return answer;
    }
}