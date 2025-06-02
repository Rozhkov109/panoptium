package panoptiumtech.panoptium.utils.pdfReport.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import panoptiumtech.panoptium.utils.pdfReport.entities.ReportType;
import panoptiumtech.panoptium.utils.pdfReport.services.ReportService;

import java.util.List;
import java.util.Map;

@Hidden
@RestController
@RequestMapping("app/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/types")
    public List<ReportType> getReportTypes() {
        return reportService.getAllReportTypes();
    }

    @PostMapping("/types/{name}/enable")
    public void enableReport(@PathVariable String name, @RequestParam boolean enabled) {
        reportService.setReportEnabled(name, enabled);
    }

    @GetMapping("/generate/{name}")
    public ResponseEntity<byte[]> getReport(@PathVariable String name) throws Exception {
        byte[] pdf = reportService.generateReport(name);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + name + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }
}

