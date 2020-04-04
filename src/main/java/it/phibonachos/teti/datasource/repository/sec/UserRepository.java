package it.phibonachos.teti.datasource.repository.sec;

import it.phibonachos.teti.datasource.model.sec.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
