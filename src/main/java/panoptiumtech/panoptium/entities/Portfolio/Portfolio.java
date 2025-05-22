package panoptiumtech.panoptium.entities.Portfolio;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import panoptiumtech.panoptium.entities.Account.Account;
import panoptiumtech.panoptium.entities.Asset.Asset;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false, referencedColumnName = "id")
    @NotNull
    private Account account;

    @Column(name = "name", nullable = false)
    @Length(min = 1, max = 50)
    @NotNull
    private String name;
}
