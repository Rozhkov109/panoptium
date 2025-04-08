package panoptiumtech.panoptium.entities.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "account", uniqueConstraints = {
        @UniqueConstraint(name = "unique_nickname",columnNames = "nickname")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nickname",nullable = false)
    @NotNull
    @Size(min = 2, max = 20)
    private String nickname;

    @Column(name = "password",nullable = false)
    @NotNull
    @Size(min = 60, max = 60, message = "add error message")
    private String password;

    @Column(name = "settings",columnDefinition = "json",nullable = false)
    @NotNull
    private String settings;

}
