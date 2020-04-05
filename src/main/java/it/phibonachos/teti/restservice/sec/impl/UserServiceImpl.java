package it.phibonachos.teti.restservice.sec.impl;

import it.phibonachos.teti.datasource.model.sec.Role;
import it.phibonachos.teti.datasource.model.sec.User;
import it.phibonachos.teti.datasource.repository.sec.RoleRepository;
import it.phibonachos.teti.datasource.repository.sec.UserRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class UserServiceImpl {

    final UserRepository userRepository;
    final RoleRepository roleRepository;

    @Qualifier("PasswordEncoder")
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    /* initial data loading */
    @Bean
    public ApplicationRunner initializer() {
        if(userRepository.count() != 0 && roleRepository.count() != 0)
            return null;
        return args -> userRepository.saveAll(Arrays.asList(
                new User("admin", passwordEncoder.encode("admin"), new Role("ADMIN_ROLE", "Administrator role"), true),
                new User("test", passwordEncoder.encode("test"), new Role("USER_ROLE", "Common role"), false)));
    }
}
