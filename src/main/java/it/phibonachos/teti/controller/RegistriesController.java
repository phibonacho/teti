package it.phibonachos.teti.controller;


import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import it.phibonachos.teti.restservice.teti.AdministratorService;
import it.phibonachos.teti.restservice.teti.InvoiceSubjectService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/registries")
public class RegistriesController extends BaseController{

    final AdministratorService administratorService;
    final InvoiceSubjectService invoiceSubjectService;

    public RegistriesController(AdministratorService administratorService, InvoiceSubjectService invoiceSubjectService) {
        this.administratorService = administratorService;
        this.invoiceSubjectService = invoiceSubjectService;
    }

    @GetMapping("/administrators")
    public String manageAdministrators(Model model){
        return "administrators";
    }

    @GetMapping("/administrators/{id}/detail")
    public String administratorDetail(@PathVariable("id") Long adminId, Model model){
        try {
            model.addAttribute("admin", administratorService.find(adminId));
            return "administrator_detail";
        } catch (Exception e) {
            return "administrators";
        }
    }

    @GetMapping("/invoice-subjects")
    public String invoiceSubjects(Model model){
        model.addAttribute("is", new InvoiceSubject());
        return "invoice_subjects";
    }

    @GetMapping("/invoice-subjects/{id}/detail")
    public String invoiceSubjectDetail(@PathVariable("id") Long isId,Model model){
        try {
            model.addAttribute("is", invoiceSubjectService.find(isId));
            return "invoice_subject_detail";
        } catch (Exception e) {
            return "invoice_subjects";
        }
    }
}
