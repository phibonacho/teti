package it.phibonachos.teti.datasource.repository.specification;

import it.phibonachos.teti.datasource.model.teti.ServiceMemo;
import org.springframework.data.jpa.domain.Specification;

public class MemoSpecs extends SpecsInterface {
    public static Specification<ServiceMemo> propertiesLike(ServiceMemo target) {
        return (Specification<ServiceMemo>) (root, query, cb) -> SpecsInterface.likePropertiesPredicate(root, query, cb, target);
    }

    public static Specification<ServiceMemo> havingProperties(ServiceMemo target) {
        return propertiesLike(target);
    }
}
