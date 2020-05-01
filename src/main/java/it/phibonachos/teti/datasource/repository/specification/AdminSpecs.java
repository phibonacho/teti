package it.phibonachos.teti.datasource.repository.specification;

import it.phibonachos.teti.datasource.model.teti.Address;
import it.phibonachos.teti.datasource.model.teti.Administrator;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;

public class AdminSpecs {
    public static Specification<Administrator> propertiesLike(Administrator target) {
        return (Specification<Administrator>) (root, query, cb) -> SpecsInterface.likePropertiesPredicate(root, query, cb, target);
    }

    public static Specification<Administrator> withAddressLike(Administrator admin) {
        return (Specification<Administrator>) (root, query, cb) -> {
            Join<Administrator, Address> adminAddress = root.join("address");
            return SpecsInterface.likePropertiesPredicate(adminAddress, query, cb, admin.getAddress());
        };
    }

    public static Specification<Administrator> havingProperties(Administrator target) {
        if(target.getAddress() == null)
            return propertiesLike(target);
        return propertiesLike(target).and(withAddressLike(target));
    }
}
