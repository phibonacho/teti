package it.phibonachos.teti.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/readings")
public class ReadingsController extends BaseController {

    public ReadingsController(HttpServletRequest context, LocaleResolver localeResolver) {
        super(context, localeResolver);
    }

    @GetMapping("/water")
    public String water(){
        return "reading_water";
    }
}
