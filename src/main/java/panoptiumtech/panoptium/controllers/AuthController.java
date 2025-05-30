package panoptiumtech.panoptium.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import panoptiumtech.panoptium.entities.Account.Account;
import panoptiumtech.panoptium.repositories.Account.AccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import panoptiumtech.panoptium.servicies.Account.AccountDetailsService;

@Controller
public class AuthController {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountDetailsService accountDetailsService;

    public AuthController(AccountRepository accountRepository, PasswordEncoder passwordEncoder, AccountDetailsService accountDetailsService) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.accountDetailsService = accountDetailsService;
    }

    @GetMapping("/register")
    public String getRegisterPage() {
        return "register";
    }

    @PostMapping("/register")
    public String register(@RequestParam String username, @RequestParam String password,
                           HttpServletRequest request, Model model) {
        if (accountRepository.findByUsername(username).isPresent()) {
            model.addAttribute("error", "This username is already in use");
            return "register";
        }

        Account account = new Account();
        account.setUsername(username);
        account.setPassword(passwordEncoder.encode(password));
        accountRepository.save(account);

        UserDetails userDetails = accountDetailsService.loadUserByUsername(username);

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

        // Установим в контекст безопасности
        SecurityContextHolder.getContext().setAuthentication(authToken);

        // Принудительно создаём сессию, чтобы Spring Security сохранил данные
        HttpSession session = request.getSession(true);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

        return "redirect:/";
    }


    @GetMapping("/login")
    public String getLoginPage() {
        return "login";
    }
}

