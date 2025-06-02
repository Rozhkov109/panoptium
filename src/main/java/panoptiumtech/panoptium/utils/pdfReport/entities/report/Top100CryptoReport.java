package panoptiumtech.panoptium.utils.pdfReport.entities.report;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;

import java.awt.Color;
import java.util.*;
import java.util.List;

public class Top100CryptoReport extends BasePdfReport {

    private final List<CoinInfo> coins;

    public Top100CryptoReport(Map<String, Object> rawData) {
        this.coins = parseData(rawData);
    }

    private List<CoinInfo> parseData(Map<String, Object> rawData) {
        List<CoinInfo> parsed = new ArrayList<>();

        Object coinsObj = rawData.get("coins");
        if (!(coinsObj instanceof List<?>)) return parsed;

        List<?> coinList = (List<?>) coinsObj;

        for (Object coinObj : coinList) {
            if (!(coinObj instanceof Map<?, ?>)) continue;

            Map<?, ?> coin = (Map<?, ?>) coinObj;

            try {
                int rank = ((Number) coin.get("rank")).intValue();
                String symbol = (String) coin.get("symbol");
                String name = (String) coin.get("name");
                double price = Double.parseDouble((String) coin.get("price"));
                double marketCap = Double.parseDouble((String) coin.get("marketCap"));
                double change1d = Double.parseDouble((String) coin.get("priceChange1d"));
                double change7d = Double.parseDouble((String) coin.get("priceChange7d"));
                double change30d = Double.parseDouble((String) coin.get("priceChange30d"));

                parsed.add(new CoinInfo(rank, symbol, name, price, marketCap, change1d, change7d, change30d));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return parsed;
    }

    @Override
    protected void addContent() throws DocumentException {
        Font headerFont = new Font(Font.HELVETICA, 11, Font.BOLD, Color.WHITE);
        Font cellFont = new Font(Font.HELVETICA, 10, Font.NORMAL, Color.BLACK);

        PdfPTable table = new PdfPTable(8);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10);
        table.setSpacingAfter(10);
        table.setWidths(new float[]{1f, 2f, 3f, 3f, 4f, 2f, 2f, 2f});

        addHeaderCell(table, "Rank", headerFont);
        addHeaderCell(table, "Symbol", headerFont);
        addHeaderCell(table, "Name", headerFont);
        addHeaderCell(table, "Price ($)", headerFont);
        addHeaderCell(table, "Market Cap ($)", headerFont);
        addHeaderCell(table, "1d %", headerFont);
        addHeaderCell(table, "7d %", headerFont);
        addHeaderCell(table, "30d %", headerFont);

        for (CoinInfo coin : coins) {
            addCell(table, String.valueOf(coin.rank), cellFont);
            addCell(table, coin.symbol, cellFont);
            addCell(table, coin.name, cellFont);
            addCell(table, String.format("%,.2f", coin.price), cellFont);
            addCell(table, String.format("%,.0f", coin.marketCap), cellFont);
            addCell(table, formatChange(coin.priceChange1d), cellFont);
            addCell(table, formatChange(coin.priceChange7d), cellFont);
            addCell(table, formatChange(coin.priceChange30d), cellFont);
        }

        document.add(table);
    }

    private void addHeaderCell(PdfPTable table, String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBackgroundColor(Color.DARK_GRAY);
        cell.setPadding(5);
        table.addCell(cell);
    }

    private void addCell(PdfPTable table, String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setPadding(5);
        table.addCell(cell);
    }

    private String formatChange(double change) {
        return (change >= 0 ? "+" : "") + String.format("%.2f", change) + "%";
    }

    private static class CoinInfo {
        int rank;
        String symbol;
        String name;
        double price;
        double marketCap;
        double priceChange1d;
        double priceChange7d;
        double priceChange30d;

        public CoinInfo(int rank, String symbol, String name, double price, double marketCap,
                        double priceChange1d, double priceChange7d, double priceChange30d) {
            this.rank = rank;
            this.symbol = symbol;
            this.name = name;
            this.price = price;
            this.marketCap = marketCap;
            this.priceChange1d = priceChange1d;
            this.priceChange7d = priceChange7d;
            this.priceChange30d = priceChange30d;
        }
    }
}

