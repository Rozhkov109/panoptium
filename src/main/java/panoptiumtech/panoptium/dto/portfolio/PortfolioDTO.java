package panoptiumtech.panoptium.dto.portfolio;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PortfolioDTO {
    private String oldName;
    private String newName;
    private String color;
}
