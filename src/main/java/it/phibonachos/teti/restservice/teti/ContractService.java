package it.phibonachos.teti.restservice.teti;

import it.phibonachos.teti.datasource.model.teti.Contract;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ContractService {

    List<Contract> findAll();

    Page<Contract> findFiltered(Contract filter, int page, int size);

    List<Contract> findFiltered(Contract filter);

    Contract save(Contract InvoiceSubject);

    Contract find(Long id) throws Exception;

    boolean remove(Contract InvoiceSubject);

    boolean remove(Long id);

    long count();
}
