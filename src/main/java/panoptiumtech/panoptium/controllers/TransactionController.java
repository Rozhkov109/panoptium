package panoptiumtech.panoptium.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import panoptiumtech.panoptium.dto.transaction.TransactionDTO;
import panoptiumtech.panoptium.entities.account.AccountDetails;
import panoptiumtech.panoptium.servicies.transaction.TransactionService;
import panoptiumtech.panoptium.entities.transaction.Transaction;

import java.util.List;

@Hidden
@RestController
@RequestMapping("/app/transaction")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(final TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/get-all")
    public List<Transaction> getAllTransactions(@RequestParam String portfolioName, @AuthenticationPrincipal AccountDetails accountDetails) {
        return transactionService.getAllTransactions(portfolioName, accountDetails);
    }

    @GetMapping("/get-all-by-asset")
    public List<Transaction> getAllTransactionsByAsset(@RequestParam String assetName, @RequestParam String portfolioName, @AuthenticationPrincipal AccountDetails accountDetails) {
        return transactionService.getAllTransactionsByAsset(assetName,portfolioName, accountDetails);
    }

    @PostMapping("/add")
    public String addTransaction(@RequestBody TransactionDTO transactionDTO,
                                 @AuthenticationPrincipal AccountDetails accountDetails) {
        return transactionService.addTransaction(transactionDTO.getAssetName(),
                transactionDTO.getPortfolioName(),
                transactionDTO.getTransactionData().getTime(),
                transactionDTO.getTransactionData().getAmount(),
                transactionDTO.getTransactionData().getPricePerUnit(),
                accountDetails);
    }

    @PostMapping("/edit")
    public String updateTransaction(@RequestBody TransactionDTO transactionDTO,
                                    @AuthenticationPrincipal AccountDetails accountDetails) {
        return transactionService.updatePortfolioAsset(transactionDTO.getAssetName(),
                transactionDTO.getPortfolioName(),
                transactionDTO.getTransactionData().getTime(),
                transactionDTO.getTransactionData().getAmount(),
                transactionDTO.getTransactionData().getPricePerUnit(),
                accountDetails);
    }

    @PostMapping("/delete")
    public void deleteTransaction(@RequestBody TransactionDTO transactionDTO, @AuthenticationPrincipal AccountDetails accountDetails) {
        transactionService.deletePortfolioAsset(transactionDTO.getAssetName(), transactionDTO.getPortfolioName(),transactionDTO.getTransactionData().getTime(), accountDetails);
    }

}
