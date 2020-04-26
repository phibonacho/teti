package it.phibonachos.teti.restservice.teti;

import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import org.springframework.data.domain.Page;

import java.util.List;

public interface InvoiceSubjectService {

    List<InvoiceSubject> findAll();

    Page<InvoiceSubject> findFiltered(InvoiceSubject filter, int page, int size);

    List<InvoiceSubject> findFiltered(InvoiceSubject filter);

    InvoiceSubject save(InvoiceSubject InvoiceSubject);

    InvoiceSubject find(Long id) throws Exception;

    boolean remove(InvoiceSubject InvoiceSubject);

    boolean remove(Long id);

    long count();
}
