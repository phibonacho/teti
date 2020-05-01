package it.phibonachos.teti.restservice.teti.impl;

import it.phibonachos.teti.datasource.model.teti.Administrator;
import it.phibonachos.teti.datasource.repository.specification.AdminSpecs;
import it.phibonachos.teti.datasource.repository.specification.SpecsInterface;
import it.phibonachos.teti.datasource.repository.teti.AdministratorRepository;
import it.phibonachos.teti.restservice.teti.AdministratorService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministratorServiceImpl implements AdministratorService {

    private final AdministratorRepository adminRepository;

    public AdministratorServiceImpl(AdministratorRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<Administrator> findAll(){
        return adminRepository.findAll();
    }


    public List<Administrator> findFiltered(Administrator filters) {
        return adminRepository.findAll(AdminSpecs.havingProperties(filters));
    }

    @Override
    public Page<Administrator> findFiltered(Administrator filter, int page, int size) {
        return adminRepository.findAll(AdminSpecs.havingProperties(filter), PageRequest.of(page, size));
    }

    public Administrator save(Administrator administrator) {
        return adminRepository.save(administrator);
    }

    @Override
    public Administrator find(Long id) throws Exception {
        return adminRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    public boolean remove(Administrator administrator) {
        try {
            adminRepository.delete(administrator);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean remove(Long id) {
        try {
            adminRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public long count() {
        return adminRepository.count();
    }

}
