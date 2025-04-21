package panoptiumtech.panoptium.api.entities.ApiCache;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "api_cache")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ApiCache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ApiCacheType type;

    @Column(columnDefinition = "TEXT", name = "response", nullable = false)
    @NotNull
    private String response;

    @Column(name = "created_at", nullable = false)
    @NotNull
    private LocalDateTime createdAt;
}
