package panoptiumtech.panoptium.utils.pdfReport.entities.report;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;

import java.awt.Color;
import java.util.*;
import java.util.List;

public class StockMarketReport extends BasePdfReport {

    private final List<TickerInfo> tickers;

    public StockMarketReport(Map<String, Object> rawData) {
        this.tickers = parseData(rawData);
    }

    private List<TickerInfo> parseData(Map<String, Object> rawData) {
        List<TickerInfo> result = new ArrayList<>();
        Object dataList = rawData.get("stockMarketData");

        if (!(dataList instanceof List<?>)) return result;

        for (Object item : (List<?>) dataList) {
            if (!(item instanceof Map)) continue;
            Map<?, ?> tickerMap = (Map<?, ?>) item;

            String ticker = (String) tickerMap.get("ticker");
            String lastUpdatedAt = (String) tickerMap.get("lastUpdatedAt");

            List<PricePoint> prices = new ArrayList<>();
            Object data = tickerMap.get("data");
            if (data instanceof List<?>) {
                for (Object p : (List<?>) data) {
                    if (!(p instanceof Map)) continue;
                    Map<?, ?> entry = (Map<?, ?>) p;
                    try {
                        String date = (String) entry.get("date");
                        double close = Double.parseDouble((String) entry.get("closePrice"));
                        prices.add(new PricePoint(date, close));
                    } catch (Exception ignored) {}
                }
            }

            result.add(new TickerInfo(ticker, lastUpdatedAt, prices));
        }

        return result;
    }

    @Override
    protected void addContent() throws DocumentException {
        Font sectionFont = new Font(Font.HELVETICA, 13, Font.BOLD, Color.BLACK);
        Font tableHeaderFont = new Font(Font.HELVETICA, 11, Font.BOLD, Color.WHITE);
        Font cellFont = new Font(Font.HELVETICA, 10);

        for (TickerInfo tickerInfo : tickers) {
            Paragraph title = new Paragraph(tickerInfo.ticker + " (last update: " + tickerInfo.lastUpdatedAt + ")", sectionFont);
            title.setSpacingBefore(15);
            title.setSpacingAfter(8);
            document.add(title);

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(50);
            table.setWidths(new float[]{1.5f, 2f});
            table.setSpacingAfter(10);

            addHeaderCell(table, "Date", tableHeaderFont);
            addHeaderCell(table, "Close Price ($)", tableHeaderFont);

            for (PricePoint point : tickerInfo.pricePoints) {
                addCell(table, point.date, cellFont);
                addCell(table, String.format("%.2f", point.closePrice), cellFont);
            }

            document.add(table);
        }
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

    private static class TickerInfo {
        String ticker;
        String lastUpdatedAt;
        List<PricePoint> pricePoints;

        public TickerInfo(String ticker, String lastUpdatedAt, List<PricePoint> pricePoints) {
            this.ticker = ticker;
            this.lastUpdatedAt = lastUpdatedAt;
            this.pricePoints = pricePoints;
        }
    }

    private static class PricePoint {
        String date;
        double closePrice;

        public PricePoint(String date, double closePrice) {
            this.date = date;
            this.closePrice = closePrice;
        }
    }
}

