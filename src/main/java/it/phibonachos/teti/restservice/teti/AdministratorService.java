package it.phibonachos.teti.restservice.teti;

import it.phibonachos.teti.datasource.model.teti.Administrator;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AdministratorService {

    List<Administrator> findAll();

    Page<Administrator> findFiltered(Administrator filter, int page, int size);

    List<Administrator> findFiltered(Administrator filter);

    Administrator save(Administrator administrator);

    Administrator find(Long id) throws Exception;

    boolean remove(Administrator administrator);

    boolean remove(Long id);

    long count();
}
