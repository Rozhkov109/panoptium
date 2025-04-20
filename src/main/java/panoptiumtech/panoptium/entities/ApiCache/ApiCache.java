package panoptiumtech.panoptium.entities.ApiCache;

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
    @NotNull
    private ApiCacheType type;

    @Column(name = "response", nullable = false)
    @NotNull
    private String response;

    @Column(name = "created_at", nullable = false)
    @NotNull
    private LocalDateTime createdAt;
}
