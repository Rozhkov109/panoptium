package panoptiumtech.panoptium.entities.account;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Table(name = "account", uniqueConstraints = {
        @UniqueConstraint(name = "unique_username",columnNames = "username")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username",nullable = false)
    @NotNull
    @Size(min = 2, max = 20)
    private String username;

    @Column(name = "password",nullable = false)
    @NotNull
    @Size(min = 60, max = 60, message = "add error message")
    private String password;
}
