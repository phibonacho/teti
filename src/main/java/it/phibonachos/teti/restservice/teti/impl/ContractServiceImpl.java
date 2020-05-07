package it.phibonachos.teti.restservice.teti.impl;

import it.phibonachos.teti.datasource.model.teti.Administrator;
import it.phibonachos.teti.datasource.model.teti.Contract;
import it.phibonachos.teti.datasource.repository.specification.AdminSpecs;
import it.phibonachos.teti.datasource.repository.specification.ContractSpecs;
import it.phibonachos.teti.datasource.repository.teti.AdministratorRepository;
import it.phibonachos.teti.datasource.repository.teti.ContractRepository;
import it.phibonachos.teti.restservice.teti.AdministratorService;
import it.phibonachos.teti.restservice.teti.ContractService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractServiceImpl implements ContractService {

    private final ContractRepository contractRepository;

    public ContractServiceImpl(ContractRepository contractRepository) {
        this.contractRepository = contractRepository;
    }

    public List<Contract> findAll(){
        return contractRepository.findAll();
    }


    public List<Contract> findFiltered(Contract filters) {
        return contractRepository.findAll(ContractSpecs.havingProperties(filters));
    }

    @Override
    public Page<Contract> findFiltered(Contract filter, int page, int size) {
        return contractRepository.findAll(ContractSpecs.havingProperties(filter), PageRequest.of(page, size));
    }

    public Contract save(Contract contract) {
        return contractRepository.save(contract);
    }

    @Override
    public Contract find(Long id) throws Exception {
        return contractRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    public boolean remove(Contract contract) {
        try {
            contractRepository.delete(contract);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean remove(Long id) {
        try {
            contractRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public long count() {
        return contractRepository.count();
    }

}
