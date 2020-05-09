package it.phibonachos.teti.datasource.repository.specification;

import it.phibonachos.teti.datasource.model.teti.Address;
import it.phibonachos.teti.datasource.model.teti.Administrator;
import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import it.phibonachos.teti.datasource.model.teti.InvoiceSubject;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;

public class ISSpecs extends SpecsInterface {
    public static Specification<InvoiceSubject> propertiesLike(InvoiceSubject target) {
        return (Specification<InvoiceSubject>) (root, query, cb) -> likePropertiesPredicate(root, query, cb, target);
    }

    public static Specification<InvoiceSubject> withAddressLike(InvoiceSubject target) {
        return (Specification<InvoiceSubject>) (root, query, cb) -> {
            if(target.getAddress() == null)
                return cb.and();
            Join<InvoiceSubject, Address> adminAddress = root.join("address");
            return likePropertiesPredicate(adminAddress, query, cb, target.getAddress());
        };
    }

    public static Specification<InvoiceSubject> havingProperties(InvoiceSubject target) {
        return propertiesLike(target)
                .and(isWithHolding(target))
                .and(withAddressLike(target))
                .and(belongingToAdmin(target));
    }

    public static Specification<InvoiceSubject> belongingToAdmin(InvoiceSubject target) {
        return (Specification<InvoiceSubject>) (root, query, cb) -> {
            if(target.getAdministrator() == null)
                return cb.and();
            Join<InvoiceSubject, Administrator> admin = root.join("administrator");
            return cb.equal(admin.get("id"), target.getAdministrator().getId());
        };
    }


    public static Specification<InvoiceSubject> isWithHolding(InvoiceSubject target) {
        return (Specification<InvoiceSubject>) (root, query, cb) -> {
            if(!target.isWithholding())
                return cb.and();
            return cb.equal(root.get("withholding"), true);
        };
    }
}
