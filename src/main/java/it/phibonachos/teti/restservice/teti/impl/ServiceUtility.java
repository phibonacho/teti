package it.phibonachos.teti.restservice.teti.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public class ServiceUtility {
    public static <T,R extends JpaRepository<T,Long>> T save(R repository, T entity) {
        return repository.saveAndFlush(entity);
    }

    public static <T,R extends JpaRepository<T,Long>> List<T> find(R repository) {
        return repository.findAll();
    }

    public static <T,R extends JpaRepository<T,Long>> T find(R repository, Long id) {
        return repository.findById(id).orElseThrow();
    }

    public static <T,R extends JpaSpecificationExecutor<T>> List<T> find(R repository, Specification<T> predicateProvider) {
        return repository.findAll(predicateProvider);
    }

    public static <T,R extends JpaSpecificationExecutor<T>> Page<T> find(R repository, Specification<T> predicateProvider, int page, int size) {
        return repository.findAll(predicateProvider, PageRequest.of(page, size));
    }

    public static <T,R extends JpaRepository<T,Long>> Long count(R repository) {
        return repository.count();
    }

    public static <T,R extends JpaRepository<T,Long>> boolean remove(R repository, T entity) {
        try {
            repository.delete(entity);
            return true;
        } catch (Exception ignored) {
            return  false;
        }
    }

    public static <T,R extends JpaRepository<T,Long>> boolean remove(R repository, Long id) {
        try {
            repository.deleteById(id);
            return true;
        } catch (Exception ignored) {
            return  false;
        }
    }
}
