package panoptiumtech.panoptium.servicies.wallet;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import panoptiumtech.panoptium.entities.account.Account;
import panoptiumtech.panoptium.entities.account.AccountDetails;
import panoptiumtech.panoptium.entities.Wallet.Wallet;
import panoptiumtech.panoptium.entities.Wallet.WalletNetwork;
import panoptiumtech.panoptium.repositories.wallet.WalletRepository;

import java.util.List;

@Service
public class WalletService {
    WalletRepository walletRepository;

    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    public List<Wallet> getAllWallets(@AuthenticationPrincipal AccountDetails accountDetails) {
        return walletRepository.findAllByAccountId(accountDetails.getAccount().getId());
    }

    public String addWallet(String alias, String address, String network, @AuthenticationPrincipal AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        if(walletRepository.findByAddressAndAccount(address, account).isPresent()) {
            return "Wallet already exists";
        }

        Wallet wallet = new Wallet(null, account, alias, address, WalletNetwork.valueOf(network));
        walletRepository.save(wallet);

        return "Wallet added successfully";
    }

    public String updateWallet(String alias, String oldAddress, String newAddress, String network, @AuthenticationPrincipal AccountDetails accountDetails) {
        Account account = accountDetails.getAccount();

        Wallet wallet = walletRepository.findByAddressAndAccount(oldAddress,account).get();
        wallet.setAlias(alias);
        wallet.setAddress(newAddress);
        wallet.setNetwork(WalletNetwork.valueOf(network));

        walletRepository.save(wallet);

        return "Wallet updated successfully";
    }

    public void deleteWalletByAddress(String address, @AuthenticationPrincipal AccountDetails accountDetails) {
        walletRepository.deleteById(walletRepository.findByAddressAndAccount(address, accountDetails.getAccount()).get().getId());
    }
}
