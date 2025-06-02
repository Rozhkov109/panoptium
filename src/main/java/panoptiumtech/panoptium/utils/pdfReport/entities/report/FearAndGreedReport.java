package panoptiumtech.panoptium.utils.pdfReport.entities.report;

import com.lowagie.text.DocumentException;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Font;

import java.awt.*;

public class FearAndGreedReport extends BasePdfReport {

    private final int index;
    private final String classification;

    public FearAndGreedReport(int index, String classification) {
        this.index = index;
        this.classification = classification;
    }

    @Override
    protected void addContent() throws DocumentException {
        Font labelFont = new Font(Font.HELVETICA, 12, Font.BOLD, Color.BLACK);
        Font valueFont = new Font(Font.HELVETICA, 12, Font.NORMAL, new Color(60, 60, 60));

        Paragraph indexParagraph = new Paragraph("Index: " + index, valueFont);
        indexParagraph.setSpacingAfter(10);
        document.add(indexParagraph);

        Paragraph classParagraph = new Paragraph("Classification: " + classification, valueFont);
        document.add(classParagraph);
    }

}

