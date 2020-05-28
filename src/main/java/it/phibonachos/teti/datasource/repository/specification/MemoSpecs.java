package it.phibonachos.teti.datasource.repository.specification;

import it.phibonachos.teti.datasource.model.teti.Service;
import it.phibonachos.teti.datasource.model.teti.ServiceMemo;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;

public class MemoSpecs extends SpecsInterface {
    public static Specification<ServiceMemo> propertiesLike(ServiceMemo target) {
        return (Specification<ServiceMemo>) (root, query, cb) -> SpecsInterface.likePropertiesPredicate(root, query, cb, target);
    }

    public static Specification<ServiceMemo> ofService(Long id) {
        return (Specification<ServiceMemo>) (root, query, cb) -> {
            Join<ServiceMemo, Service> service = root.join("service");
            return cb.equal(service.get("id"), id);
        };
    }

    public static Specification<ServiceMemo> havingProperties(ServiceMemo target) {
        return propertiesLike(target);
    }

    public static Specification<ServiceMemo> havingProperties(ServiceMemo target, Long serviceId) {
        return havingProperties(target).and(ofService(serviceId));
    }
}
