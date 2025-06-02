package panoptiumtech.panoptium;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import panoptiumtech.panoptium.utils.pdfReport.services.ReportService;

@SpringBootTest
class PanoptiumApplicationTests {

	@Autowired
	ReportService reportService;

	@Test
	void contextLoads() {
		reportService.addReportType("StockMarket",true);
	}

}
