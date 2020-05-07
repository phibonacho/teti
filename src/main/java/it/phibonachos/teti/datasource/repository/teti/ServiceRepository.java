package it.phibonachos.teti.datasource.repository.teti;

import it.phibonachos.teti.datasource.model.teti.Contract;
import it.phibonachos.teti.datasource.model.teti.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
