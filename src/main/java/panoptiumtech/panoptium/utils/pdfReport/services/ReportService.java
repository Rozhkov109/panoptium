package panoptiumtech.panoptium.utils.pdfReport.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.api.services.api.MarketApiService;
import panoptiumtech.panoptium.utils.pdfReport.entities.ReportType;
import panoptiumtech.panoptium.utils.pdfReport.entities.report.CryptoReport;
import panoptiumtech.panoptium.utils.pdfReport.entities.report.FearAndGreedReport;
import panoptiumtech.panoptium.utils.pdfReport.entities.report.StockMarketReport;
import panoptiumtech.panoptium.utils.pdfReport.entities.report.Top100CryptoReport;
import panoptiumtech.panoptium.utils.pdfReport.repositories.ReportTypeRepository;

import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final ReportTypeRepository reportTypeRepository;
    private final MarketApiService marketApiService;
    private final ObjectMapper objectMapper;

    public ReportService(ReportTypeRepository reportTypeRepository,
                         MarketApiService marketApiService,
                         ObjectMapper objectMapper) {
        this.reportTypeRepository = reportTypeRepository;
        this.marketApiService = marketApiService;
        this.objectMapper = objectMapper;
    }

    public List<ReportType> getAllReportTypes() {
        return reportTypeRepository.findAll();
    }

    public void addReportType(String type, boolean enabled) {
        if(reportTypeRepository.findByType(type).isEmpty()) {
            reportTypeRepository.save(new ReportType(null,type,enabled));
        }
    }

    public void setReportEnabled(String type, boolean enabled) {
        ReportType reportType = reportTypeRepository.findByType(type).get();
        reportType.setEnabled(enabled);
        reportTypeRepository.save(reportType);
    }

    public byte[] generateReport(String reportType) throws Exception {
        if (!reportTypeRepository.findByType(reportType).get().isEnabled()) {
            throw new RuntimeException("Report is disabled");
        }

        switch (reportType) {
            case "FearAndGreedIndex":
                Map<String, Object> fearAndGreedIndex = marketApiService.getFearAndGreedIndex();

                int index = objectMapper.convertValue(fearAndGreedIndex.get("index"), new TypeReference<>(){});
                String classification = objectMapper.convertValue(fearAndGreedIndex.get("classification"), new TypeReference<>(){});

                FearAndGreedReport fearAndGreedReport = new FearAndGreedReport(index, classification);
                return fearAndGreedReport.generate("Fear And Greed Index");

            case "CryptoData":
                Map<String, Object> cryptoData = marketApiService.getCryptoData();

                double btcDominance = objectMapper.convertValue(cryptoData.get("btc_dominance"), new TypeReference<>(){});
                double btcDominance24hChange = objectMapper.convertValue(cryptoData.get("btc_dominance_24h_percentage_change"), new TypeReference<>(){});
                double ethDominance = objectMapper.convertValue(cryptoData.get("eth_dominance"), new TypeReference<>(){});
                double ethDominance24hChange = objectMapper.convertValue(cryptoData.get("eth_dominance_24h_percentage_change"), new TypeReference<>(){});
                long marketCap = objectMapper.convertValue(cryptoData.get("market_cap"), new TypeReference<>(){});
                long cryptoMarketCap24hChange = objectMapper.convertValue(cryptoData.get("market_cap_24h_percentage_change"), new TypeReference<>(){});


                CryptoReport cryptoReport = new CryptoReport(btcDominance,
                        btcDominance24hChange,
                        ethDominance,
                        ethDominance24hChange,
                        marketCap,
                        cryptoMarketCap24hChange);
                return cryptoReport.generate("Crypto Data");

            case "Top100CryptoCurrencies":
                Map<String, Object> top100CryptoCurrencies = marketApiService.getTop100CryptoCurrencies();
                Top100CryptoReport top100CryptoReport = new Top100CryptoReport(top100CryptoCurrencies);
                return top100CryptoReport.generate("Top 100 Crypto Currencies");

            case "StockMarket":
                Map<String, Object> stockMarket = marketApiService.getStockMarketData();
                StockMarketReport stockMarketReport = new StockMarketReport(stockMarket);
                return stockMarketReport.generate("Stock Market");

            default:
                throw new RuntimeException("Unknown report type");
        }
    }
}



