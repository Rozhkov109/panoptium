package panoptiumtech.panoptium.utils.pdfReport.entities.report;

import com.lowagie.text.*;
import java.awt.Color;

public class CryptoReport extends BasePdfReport {

    private final double btcDominance;
    private final double btcDominanceChange;
    private final double ethDominance;
    private final double ethDominanceChange;
    private final double marketCap;
    private final double marketCapChange;

    public CryptoReport(double btcDominance, double btcDominanceChange,
                        double ethDominance, double ethDominanceChange,
                        double marketCap, double marketCapChange) {
        this.btcDominance = btcDominance;
        this.btcDominanceChange = btcDominanceChange;
        this.ethDominance = ethDominance;
        this.ethDominanceChange = ethDominanceChange;
        this.marketCap = marketCap;
        this.marketCapChange = marketCapChange;
    }

    @Override
    protected void addContent() throws DocumentException {
        Font labelFont = new Font(Font.HELVETICA, 12, Font.BOLD, Color.BLACK);
        Font valueFont = new Font(Font.HELVETICA, 12, Font.NORMAL, new Color(60, 60, 60));

        addMetric("BTC Dominance:", btcDominance + "%", labelFont, valueFont);
        addMetric("BTC 24h Change:", formatChange(btcDominanceChange), labelFont, valueFont);
        addMetric("ETH Dominance:", ethDominance + "%", labelFont, valueFont);
        addMetric("ETH 24h Change:", formatChange(ethDominanceChange), labelFont, valueFont);
        addMetric("Market Cap:", "$" + String.format("%,.0f", marketCap), labelFont, valueFont);
        addMetric("Market Cap 24h Change:", formatChange(marketCapChange), labelFont, valueFont);
    }

    private void addMetric(String label, String value, Font labelFont, Font valueFont) throws DocumentException {
        Paragraph line = new Paragraph();
        line.add(new Chunk(label + " ", labelFont));
        line.add(new Chunk(value, valueFont));
        line.setSpacingAfter(8);
        document.add(line);
    }

    private String formatChange(double value) {
        String sign = value >= 0 ? "+" : "";
        return sign + String.format("%.2f", value) + "%";
    }
}

