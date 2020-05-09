package it.phibonachos.teti.datasource.repository.teti;

import it.phibonachos.teti.datasource.model.teti.Service;
import it.phibonachos.teti.datasource.model.teti.ServiceMemo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface MemoRepository extends JpaRepository<ServiceMemo, Long>, JpaSpecificationExecutor<ServiceMemo> {

    @Query(value = "from ServiceMemo  where service.id = ?1", countQuery ="from ServiceMemo  where service.id = ?1")
    Page<ServiceMemo> findByServiceId(Long serviceId, Pageable pageable);
}
