package it.phibonachos.teti.controller;

import it.phibonachos.teti.datasource.model.teti.Administrator;
import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import it.phibonachos.teti.pojo.MenuOption;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.List;

@Controller
public class BaseController {

    @ModelAttribute("menuEntries")
    public List<MenuOption> menuConfig() {
        return List.of(
                new MenuOption("registries", "administrators", "invoice-subjects"),
                new MenuOption("readings", "water", "electricity"),
                new MenuOption("prints", "1", "2"),
                new MenuOption("contracts", "1"),
                new MenuOption("billing", "month", "emitted"),
                new MenuOption("utility", "1"),
                new MenuOption("info", "1")
        );
    }

    @ModelAttribute("admin")
    public Administrator administrator() {
        return new Administrator();
    }

    @ModelAttribute("invoice_subject")
    public InvoiceSubject invoiceSubject() {
        return new InvoiceSubject();
    }
}
