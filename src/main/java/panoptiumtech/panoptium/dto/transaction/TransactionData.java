package panoptiumtech.panoptium.dto.transaction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class TransactionData {
    LocalDateTime time;
    BigDecimal amount;
    BigDecimal pricePerUnit;
}
