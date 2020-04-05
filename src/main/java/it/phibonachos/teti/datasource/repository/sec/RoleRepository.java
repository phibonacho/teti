package it.phibonachos.teti.datasource.repository.sec;

import it.phibonachos.teti.datasource.model.sec.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
}
