package it.phibonachos.teti.controller;

import it.phibonachos.teti.datasource.model.teti.Administrator;
import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import it.phibonachos.teti.pojo.MenuOption;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.text.DateFormatSymbols;
import java.util.Arrays;
import java.util.List;

@Controller
public class BaseController {

    protected final LocaleResolver localeResolver;
    protected final HttpServletRequest context;

    public BaseController(HttpServletRequest context, LocaleResolver localeResolver) {
        this.localeResolver = localeResolver;
        this.context = context;
    }

    @ModelAttribute("menuEntries")
    public List<MenuOption> menuConfig() {
        return List.of(
                new MenuOption("registries", MenuOption.Status.BETA, "administrators", "invoice-subjects"),
                new MenuOption("readings", MenuOption.Status.NYI, "water", "electricity"),
                new MenuOption("prints", MenuOption.Status.NYI, "1", "2"),
                new MenuOption("contracts", MenuOption.Status.ALPHA, "management", "rate-adjustment"),
                new MenuOption("billing", MenuOption.Status.NYI, "month", "emitted"),
                new MenuOption("utility", MenuOption.Status.NYI, "1"),
                new MenuOption("info", MenuOption.Status.NYI, "1")
        );
    }

    @ModelAttribute("months")
    public List<String> months() {
        DateFormatSymbols dfs = new DateFormatSymbols(localeResolver.resolveLocale(context));
        return Arrays.asList(dfs.getMonths());
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