package panoptiumtech.panoptium.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import panoptiumtech.panoptium.entities.Account.Account;
import panoptiumtech.panoptium.repositories.Account.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/register")
    public String getRegisterPage() {
        return "register";
    }

    @PostMapping("/register")
    public String register(@RequestParam String username, @RequestParam String password, Model model) {
        if (accountRepository.findByUsername(username).isPresent()) {
            model.addAttribute("error", "This username is already in use");
            return "register";
        }

        Account account = new Account();
        account.setUsername(username);
        account.setPassword(passwordEncoder.encode(password));

        accountRepository.save(account);
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String getLoginPage() {
        return "login";
    }
}

