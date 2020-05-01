package it.phibonachos.teti.datasource.repository.specification;

import it.phibonachos.teti.datasource.model.teti.Address;
import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;

public class ISSpecs {
    public static Specification<InvoiceSubject> propertiesLike(InvoiceSubject target) {
        return (Specification<InvoiceSubject>) (root, query, cb) -> SpecsInterface.likePropertiesPredicate(root, query, cb, target);
    }

    public static Specification<InvoiceSubject> withAddressLike(InvoiceSubject target) {
        return (Specification<InvoiceSubject>) (root, query, cb) -> {
            Join<InvoiceSubject, Address> adminAddress = root.join("address");
            return SpecsInterface.likePropertiesPredicate(adminAddress, query, cb, target.getAddress());
        };
    }

    public static Specification<InvoiceSubject> havingProperties(InvoiceSubject target) {
        if(target.getAddress() == null)
            return propertiesLike(target);
        return propertiesLike(target)
                .and(isWithHolding(target))
                .and(withAddressLike(target));
    }

    public static Specification<InvoiceSubject> isWithHolding(InvoiceSubject target) {
        return (Specification<InvoiceSubject>) (root, query, cb) -> {
            if(!target.isWithholding())
                return cb.and();
            return cb.equal(root.get("withholding"), true);
        };
    }
}
