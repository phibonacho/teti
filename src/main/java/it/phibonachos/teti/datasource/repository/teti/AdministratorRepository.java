package it.phibonachos.teti.datasource.repository.teti;

import it.phibonachos.teti.datasource.model.teti.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<Administrator, Long> {
}
