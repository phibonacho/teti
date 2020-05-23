package it.phibonachos.teti.controller;


import it.phibonachos.teti.restservice.teti.ContractService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/contract")
public class ContractController extends BaseController{

    final ContractService contractService;

    public ContractController(HttpServletRequest context, LocaleResolver localeResolver, ContractService contractService) {
        super(context, localeResolver);
        this.contractService = contractService;
    }

    @GetMapping("/management")
    public String manageContract(Model model){
        return "contract_management";
    }

    @GetMapping("/rate-adjustment")
    public String rateAdjustment(Model model){
        return "contract_rate_adjustment";
    }

    @GetMapping("{id}/detail")
    public String contractDetail(@PathVariable("id") long id, Model model){
        model.addAttribute("contract", contractService.find(id));
        return "contract_detail";
    }

    @GetMapping("/new")
    public String newContract(Model model){
        return "contract_new";
    }
}
