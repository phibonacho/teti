package it.phibonachos.teti.datasource.repository.specification;

import it.phibonachos.teti.datasource.model.teti.Contract;
import org.springframework.data.jpa.domain.Specification;

public class ContractSpecs extends SpecsInterface {
    public static Specification<Contract> propertiesLike(Contract target) {
        return (Specification<Contract>) (root, query, cb) -> likePropertiesPredicate(root, query, cb, target);
    }

    public static Specification<Contract> havingProperties(Contract target) {
        return propertiesLike(target);
    }
}
