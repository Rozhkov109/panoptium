package panoptiumtech.panoptium.dto.transaction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TransactionDTO {
    String assetName;
    String portfolioName;
    TransactionData transactionData;
}


