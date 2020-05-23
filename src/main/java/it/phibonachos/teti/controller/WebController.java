package it.phibonachos.teti.controller;

import it.phibonachos.teti.datasource.model.sec.User;
import it.phibonachos.teti.datasource.model.teti.Administrator;
import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import it.phibonachos.teti.datasource.repository.sec.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;

@Controller
public class WebController extends BaseController{
    final PasswordEncoder passwordEncoder;
    final UserRepository usersRepository;

    public WebController(HttpServletRequest context, LocaleResolver localeResolver, PasswordEncoder passwordEncoder, UserRepository usersRepository) {
        super(context, localeResolver);
        this.passwordEncoder = passwordEncoder;
        this.usersRepository = usersRepository;
    }

    @GetMapping("/")
    public String main() {
        return "index"; //view
    }

    @GetMapping("/signup")
    public String signup(Model model) {
        model.addAttribute("user", new User());
        return "signup";
    }

    @GetMapping("/login")
    public String login(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @PostMapping(value = "/register")
    public String addUser(@ModelAttribute User user, BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "redirect:/signup";
        }

        if(!user.getPasswordConfirm().equals(user.getPassword()))
            return "redirect:/signup";

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        usersRepository.save(user);

        return "redirect:/";
    }

}
