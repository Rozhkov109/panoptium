package panoptiumtech.panoptium.utils.pdfReport.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "report_types")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReportType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type",nullable = false, unique = true)
    @NotNull
    private String type;

    @Column(name = "enabled",nullable = false)
    @NotNull
    boolean enabled;
}
