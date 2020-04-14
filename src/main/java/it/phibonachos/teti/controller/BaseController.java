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
                new MenuOption("registries", MenuOption.Status.ALPHA, "administrators", "invoice-subjects"),
                new MenuOption("readings", MenuOption.Status.NYI, "water", "electricity"),
                new MenuOption("prints", MenuOption.Status.NYI, "1", "2"),
                new MenuOption("contracts", MenuOption.Status.NYI, "1"),
                new MenuOption("billing", MenuOption.Status.NYI, "month", "emitted"),
                new MenuOption("utility", MenuOption.Status.NYI, "1"),
                new MenuOption("info", MenuOption.Status.NYI, "1")
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
