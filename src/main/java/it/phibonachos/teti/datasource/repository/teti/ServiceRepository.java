package it.phibonachos.teti.datasource.repository.teti;

import it.phibonachos.teti.datasource.model.teti.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface ServiceRepository extends JpaRepository<Service, Long>, JpaSpecificationExecutor<Service> {

    @Query(value = "from Service  where contract.id = ?1", countQuery ="from Service  where contract.id = ?1")
    Page<Service> findByContractId(Long contractId, Pageable pageable);

    @Query(value = "from Service  where id = ?1 and contract.id = ?2")
    Service checkServiceParent(Long serviceId, Long contractId);
}
