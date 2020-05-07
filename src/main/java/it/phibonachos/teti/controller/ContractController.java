package it.phibonachos.teti.controller;


import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import it.phibonachos.teti.restservice.teti.ContractService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/contracts")
public class ContractController extends BaseController{

    final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping("/management")
    public String manageAdministrators(Model model){
        return "management";
    }

    @GetMapping("/rate-adjustment")
    public String administratorDetail(Model model){
        return "rate_adjustment";
    }

    @GetMapping("/invoice-subjects")
    public String invoiceSubjects(Model model){
        model.addAttribute("is", new InvoiceSubject());
        return "invoice_subjects";
    }
}
