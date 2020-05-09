package it.phibonachos.teti.restservice.teti;

import it.phibonachos.teti.datasource.model.teti.Contract;
import it.phibonachos.teti.datasource.model.teti.Service;
import it.phibonachos.teti.datasource.model.teti.ServiceMemo;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ContractService {

    /* Contracts */

    List<Contract> find();

    Page<Contract> find(Contract filter, int page, int size);

    List<Contract> find(Contract filter);

    Contract find(Long id);

    Contract save(Contract contract);

    boolean remove(Contract contract);

    boolean remove(Long id);

    long count();

    /* Services */

    List<Service> findServices(long id);

    Page<Service> findServices(Service filter, int page, int size);

    List<Service> findServices(Service filter);

    Service findService(Long id);

    Service addService(long id, Service contract);

    boolean removeService(Service service);

    boolean removeService(Long id);

    long countServices(long id);

    /* Service Memos */

    List<ServiceMemo> findMemos(long id);

    Page<ServiceMemo> findMemos(ServiceMemo filter, int page, int size);

    List<ServiceMemo> findMemos(ServiceMemo filter);

    ServiceMemo findMemo(Long id);

    ServiceMemo addMemo(long id, ServiceMemo memo);

    boolean removeMemo(ServiceMemo memo);

    boolean removeMemo(Long id);

    long countMemos(long id);
}
