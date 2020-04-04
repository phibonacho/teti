package it.phibonachos.teti.datasource.repository.teti;

import it.phibonachos.teti.datasource.model.teti.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
