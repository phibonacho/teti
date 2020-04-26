package it.phibonachos.teti.controller;

import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import it.phibonachos.teti.restservice.teti.InvoiceSubjectService;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/is-api")
public class InvoiceSubjectRESTController {

    private final InvoiceSubjectService InvoiceSubjectService;

    public InvoiceSubjectRESTController(InvoiceSubjectService InvoiceSubjectService) {
        this.InvoiceSubjectService = InvoiceSubjectService;
    }

    @RequestMapping(value = {"/", "/{page}", "/{page}/{size}"}, method = RequestMethod.POST)
    public ResponseEntity<Object> getAllInvoiceSubject(@PathVariable(name = "page") Optional<Integer> page, @PathVariable(name = "size") Optional<Integer> size, @RequestBody(required = false) InvoiceSubject filters) {
        Page<InvoiceSubject> matching = InvoiceSubjectService.findFiltered(filters, page.map(i -> i-1).orElse(0), size.orElse(10));
        return new ResponseEntity<>(Map.of("recordsTotal", matching.getTotalElements(), "data", matching.getContent()), HttpStatus.OK);
    }

    @RequestMapping(value = "id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getInvoiceSubject(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<>(InvoiceSubjectService.find(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("no InvoiceSubject matching id.", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Object> saveInvoiceSubject(@RequestBody InvoiceSubject InvoiceSubject) {
        if(InvoiceSubject != null) {
            return new ResponseEntity<>(InvoiceSubjectService.save(InvoiceSubject), HttpStatus.CREATED);
        }
        return new ResponseEntity<>("cannot pass empty object", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "{id}/edit", method = RequestMethod.PUT)
    public ResponseEntity<Object> editInvoiceSubject(@PathVariable("id") Long id, @RequestBody InvoiceSubject edited) {
        try {
            InvoiceSubject source = InvoiceSubjectService.find(id);
            edited.setId(id);
            BeanUtils.copyProperties(edited, source);
            return new ResponseEntity<>(InvoiceSubjectService.save(source), HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("no InvoiceSubject matching id.", HttpStatus.NOT_FOUND);
        }
    }

    // TODO: use response entity.
    @RequestMapping(value = "/{id}/delete", method = RequestMethod.DELETE)
    public InvoiceSubject deleteInvoiceSubject(@PathVariable("id") Long id) {
        InvoiceSubject InvoiceSubject = null;
        try {
            InvoiceSubject = InvoiceSubjectService.find(id);
            InvoiceSubjectService.remove(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return InvoiceSubject;
    }
}
