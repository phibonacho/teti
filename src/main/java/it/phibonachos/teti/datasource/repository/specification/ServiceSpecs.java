package it.phibonachos.teti.datasource.repository.specification;

import it.phibonachos.teti.datasource.model.teti.Contract;
import it.phibonachos.teti.datasource.model.teti.Service;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;

public class ServiceSpecs extends SpecsInterface {
    public static Specification<Service> propertiesLike(Service target) {
        return (Specification<Service>) (root, query, cb) -> SpecsInterface.likePropertiesPredicate(root, query, cb, target);
    }

    public static Specification<Service> ofContract(Long contractId) {
        return (Specification<Service>) (root, query, cb) -> {
            Join<Contract, Service> contract = root.join("contract");
            return cb.equal(contract.get("id"), contractId);
        };
    }

    public static Specification<Service> havingProperties(Service target) {
        return propertiesLike(target).and(ofContract(target.getId()));
    }
}
