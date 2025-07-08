package panoptiumtech.panoptium.dto.wallet;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WalletDTO {
    private String alias;
    private String oldAddress;
    private String newAddress;
    private String network;
}
