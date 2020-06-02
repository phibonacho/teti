package it.phibonachos.teti.controller;

import it.phibonachos.teti.datasource.model.teti.Contract;
import it.phibonachos.teti.datasource.model.teti.Service;
import it.phibonachos.teti.datasource.model.teti.ServiceMemo;
import it.phibonachos.teti.restservice.teti.ContractService;
import it.phibonachos.teti.restservice.teti.InvoiceSubjectService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/ctr-api")
public class ContractRESTController {

    private final ContractService contractService;

    public ContractRESTController(ContractService contractService) {
        this.contractService = contractService;
    }

    @RequestMapping(value = {"/", "/{page}", "/{page}/{size}"}, method = RequestMethod.POST)
    public ResponseEntity<Object> getAllContracts(@PathVariable(name = "page") Optional<Integer> page, @PathVariable(name = "size") Optional<Integer> size, @RequestBody(required = false) Contract filters) {
        Page<Contract> matching = contractService.find(filters, page.map(i -> i-1).orElse(0), size.orElse(10));
        return new ResponseEntity<>(Map.of("recordsTotal", matching.getTotalElements(), "data", matching.getContent()), HttpStatus.OK);
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getContract(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<>(contractService.find(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("no contract matching id.", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Object> saveContract(@RequestBody Contract contract) {
        if(contract != null) {
            return new ResponseEntity<>(contractService.save(contract), HttpStatus.CREATED);
        }
        return new ResponseEntity<>("cannot pass empty object", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/{id}/edit", method = RequestMethod.PUT)
    public ResponseEntity<Object> editContract(@PathVariable("id") Long id, @RequestBody Contract edited) {
        try {
            Contract source = contractService.find(id);
            edited.setId(id);
            BeanUtils.copyProperties(edited, source, "id", "services", "closingMonths");
            return new ResponseEntity<>(contractService.save(source), HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("no administrator matching id.", HttpStatus.NOT_FOUND);
        }
    }

    // TODO: use response entity.
    @RequestMapping(value = "/{id}/delete", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteContract(@PathVariable("id") Long id) {
        try {
            contractService.remove(contractService.find(id));
            return new ResponseEntity<>(List.of(id), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(List.of(id), HttpStatus.NOT_FOUND);
        }
    }

    /* Services */

    @RequestMapping(value = "/{id}/service/add", method = RequestMethod.POST)
    public ResponseEntity<Object> addService(@PathVariable("id") Long id, @RequestBody Service toAssociate) {
        try {
            return new ResponseEntity<>(contractService.addService(id, toAssociate), HttpStatus.ACCEPTED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("no administrator matching id.", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/{id}/service/{sid}/delete", method = RequestMethod.DELETE)
    public ResponseEntity<Object> removeService(@PathVariable("id") Long contractId, @PathVariable("sid") Long serviceId) {
        try {
            if(contractService.existsServiceOfContract(serviceId, contractId))
                return new ResponseEntity<>(contractService.removeService(serviceId), HttpStatus.ACCEPTED);
            else
                return new ResponseEntity<>(Map.of("error", "No contract/service match"), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("no service matching id.", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = {"/{id}/service/", "/{id}/service/{page}", "/{id}/service/{page}/{size}"}, method = RequestMethod.POST)
    public ResponseEntity<Object> getAllService(@PathVariable("id") Long id, @PathVariable(name = "page") Optional<Integer> page, @PathVariable(name = "size") Optional<Integer> size,@RequestBody Service filters) {
        Page<Service> matching = contractService.findRelatedServices(filters, id, page.map(i -> i-1).orElse(0), size.orElse(10));
        return new ResponseEntity<>(Map.of("recordsTotal", matching.getTotalElements(), "data", matching.getContent()), HttpStatus.OK);
    }

    /* Memos */

    @RequestMapping(value = "/{cid}/service/{sid}/memo/add", method = RequestMethod.POST)
    public ResponseEntity<Object> addMemo(@PathVariable("cid") Long contractId, @PathVariable("sid") Long serviceId, @RequestBody ServiceMemo toAssociate) {
        try {
            if(contractService.existsServiceOfContract(serviceId, contractId))
                return new ResponseEntity<>(contractService.addMemo(serviceId, toAssociate), HttpStatus.ACCEPTED);
            else
                return new ResponseEntity<>(Map.of("error", "No contract/service match"), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("no service matching id.", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/{sid}/service/{mid}/memo/delete", method = RequestMethod.DELETE)
    public ResponseEntity<Object> removeMemo(@PathVariable("sid") Long serviceId, @PathVariable("mid") Long memoId) {
        try {
            if(contractService.existsMemoOfService(memoId, serviceId))
                return new ResponseEntity<>(contractService.removeMemo(memoId), HttpStatus.ACCEPTED);
            else
                return new ResponseEntity<>(Map.of("error", "No service/memo match"), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("no memo matching id.", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = {"/{id}/serviceMemos/", "/{id}/serviceMemos/{page}", "/{id}/serviceMemos/{page}/{size}"}, method = RequestMethod.POST)
    public ResponseEntity<Object> getAllMemos(@PathVariable("id") Long id, @PathVariable(name = "page") Optional<Integer> page, @PathVariable(name = "size") Optional<Integer> size,@RequestBody ServiceMemo filters) {
        Page<ServiceMemo> matching = contractService.findRelatedMemos(filters, id, page.map(i -> i-1).orElse(0), size.orElse(10));
        return new ResponseEntity<>(Map.of("recordsTotal", matching.getTotalElements(), "data", matching.getContent()), HttpStatus.OK);
    }
}
