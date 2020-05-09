package it.phibonachos.teti.restservice.teti.impl;

import it.phibonachos.teti.datasource.model.teti.Contract;
import it.phibonachos.teti.datasource.model.teti.Service;
import it.phibonachos.teti.datasource.model.teti.ServiceMemo;
import it.phibonachos.teti.datasource.repository.specification.ContractSpecs;
import it.phibonachos.teti.datasource.repository.specification.ServiceSpecs;
import it.phibonachos.teti.datasource.repository.teti.ContractRepository;
import it.phibonachos.teti.datasource.repository.teti.MemoRepository;
import it.phibonachos.teti.datasource.repository.teti.ServiceRepository;
import it.phibonachos.teti.restservice.teti.ContractService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class ContractServiceImpl extends ServiceUtility implements ContractService {

    private final ContractRepository contractRepository;
    private final ServiceRepository serviceRepository;
    private final MemoRepository memoRepository;

    public ContractServiceImpl(ContractRepository contractRepository, ServiceRepository serviceRepository, MemoRepository memoRepository) {
        this.contractRepository = contractRepository;
        this.serviceRepository = serviceRepository;
        this.memoRepository = memoRepository;
    }

    public List<Contract> find(){
        return find(contractRepository);
    }


    public List<Contract> find(Contract filters) {
        return find(contractRepository, ContractSpecs.havingProperties(filters));
    }

    @Override
    public Page<Contract> find(Contract filter, int page, int size) {
        return find(contractRepository, ContractSpecs.havingProperties(filter), page, size);
    }

    @Override
    public Contract find(Long id) {
        return find(contractRepository, id);
    }

    public Contract save(Contract contract) {
        return save(contractRepository, contract);
    }

    public boolean remove(Contract contract) {
        return remove(contractRepository, contract);
    }

    public boolean remove(Long id) {
        return remove(contractRepository, id);
    }

    @Override
    public long count() {
        return count(contractRepository);
    }

    /* Services */

    @Override
    public List<Service> findServices(long id) {
        return serviceRepository.findByContractId(id, Pageable.unpaged()).getContent();
    }

    @Override
    public List<Service> findServices(Service filter) {
        return find(serviceRepository, ServiceSpecs.havingProperties(filter));
    }

    @Override
    public Page<Service> findServices(Service filter, int page, int size) {
        return find(serviceRepository, ServiceSpecs.havingProperties(filter), page, size);
    }

    @Override
    public Service findService(Long id) {
        return find(serviceRepository, id);
    }

    @Override
    public Service addService(long id, Service service) {
        service.setContract(find(id));
        save(serviceRepository, service);
        return service;
    }

    @Override
    public boolean removeService(Service service) {
        return remove(serviceRepository, service);
    }

    @Override
    public boolean removeService(Long id) {
        return remove(serviceRepository, id);
    }

    @Override
    public long countServices(long id) {
        return serviceRepository.findByContractId(id, Pageable.unpaged()).getTotalElements();
    }

    /* Memos */

    @Override
    public List<ServiceMemo> findMemos(long id) {
        return memoRepository.findByServiceId(id, Pageable.unpaged()).getContent();
    }

    @Override
    public Page<ServiceMemo> findMemos(ServiceMemo filter, int page, int size) {
        return null;
    }

    @Override
    public List<ServiceMemo> findMemos(ServiceMemo filter) {
        return null;
    }

    @Override
    public ServiceMemo findMemo(Long id) {
        return memoRepository.findById(id).orElseThrow();
    }

    @Override
    public ServiceMemo addMemo(long id, ServiceMemo memo) {
        return null;
    }

    @Override
    public boolean removeMemo(ServiceMemo memo) {
        return false;
    }

    @Override
    public boolean removeMemo(Long id) {
        return false;
    }

    @Override
    public long countMemos(long id) {
        return memoRepository.findByServiceId(id, Pageable.unpaged()).getTotalElements();
    }

}
