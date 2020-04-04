package it.phibonachos.teti.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/readings")
public class ReadingsController extends BaseController {

    @GetMapping("/water")
    public String water(){
        return "reading_water";
    }
}
