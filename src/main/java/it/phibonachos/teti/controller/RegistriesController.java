package it.phibonachos.teti.controller;


import it.phibonachos.teti.datasource.model.teti.Administrator;
import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/registries")
public class RegistriesController extends BaseController{

    @GetMapping("/administrators")
    public String administrators(Model model){
        model.addAttribute("admin", new Administrator());
        return "administrators";
    }

    @GetMapping("/invoice-subjects")
    public String invoiceSubjects(Model model){
        model.addAttribute("is", new InvoiceSubject());
        return "invoice_subjects";
    }
}
