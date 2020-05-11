package it.phibonachos.teti.controller;


import it.phibonachos.teti.restservice.teti.ContractService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/contract")
public class ContractController extends BaseController{

    final ContractService contractService;

    public ContractController(ContractService contractService) {
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

    @GetMapping("/new")
    public String newContract(Model model){
        return "contract_new";
    }
}
