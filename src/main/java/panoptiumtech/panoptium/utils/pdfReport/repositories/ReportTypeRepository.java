package panoptiumtech.panoptium.utils.pdfReport.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import panoptiumtech.panoptium.utils.pdfReport.entities.ReportType;

import java.util.Optional;

@Repository
public interface ReportTypeRepository extends JpaRepository<ReportType,Long> {
    Optional<ReportType> findByType(String type);
}
