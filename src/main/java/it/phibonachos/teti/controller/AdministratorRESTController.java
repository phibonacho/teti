package it.phibonachos.teti.controller;

import it.phibonachos.teti.datasource.model.teti.Administrator;
import it.phibonachos.teti.restservice.teti.AdministratorService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/adm-api")
public class AdministratorRESTController {

    private final AdministratorService administratorService;

    public AdministratorRESTController(AdministratorService administratorService) {
        this.administratorService = administratorService;
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<Object> getAllAdministrator() {

        return new ResponseEntity<>(Map.of("recordsTotal", administratorService.count(), "data", administratorService.findAll()), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getAdministrator(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<>(administratorService.find(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("no administrator matching id.", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Object> saveAdministrator(@RequestBody Administrator administrator) {
        if(administrator != null) {
            return new ResponseEntity<>(administratorService.save(administrator), HttpStatus.CREATED);
        }
        return new ResponseEntity<>("cannot pass empty object", HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "{id}/edit", method = RequestMethod.PUT)
    public ResponseEntity<Object> editAdministrator(@PathVariable("id") Long id, @RequestBody Administrator edited) {
        try {
            Administrator source = administratorService.find(id);
            BeanUtils.copyProperties(edited, source);
            return new ResponseEntity<>(administratorService.save(source), HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("no administrator matching id.", HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/{id}/delete", method = RequestMethod.DELETE)
    public Administrator deleteAdministrator(@PathVariable("id") Long id) {
        Administrator administrator = null;
        try {
            administrator = administratorService.find(id);
            administratorService.remove(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return administrator;
    }
}
