package panoptiumtech.panoptium.dto.wallet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AssetDTO {
    String oldName;
    String newName;
    String type;
    String color;
}
