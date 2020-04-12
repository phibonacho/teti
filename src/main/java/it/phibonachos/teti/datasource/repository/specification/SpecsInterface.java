package it.phibonachos.teti.datasource.repository.specification;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Predicate;
import java.beans.FeatureDescriptor;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class SpecsInterface {
    public static <T> Specification<T> hasStringPropertyLike(String property, String like) {
        return (Specification<T>) (root, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(root.get(property), like);
    }

    public static <T> Specification<T> havingProperties(T target) {
        return (Specification<T>) (root, criteriaQuery, criteriaBuilder) -> {
            Map<String,String> filters = Arrays.stream(target.getClass().getDeclaredFields())
                    .filter(field -> field.getType().equals(String.class))
                    .map(ThrowingInterface.tryCatch(field -> new PropertyDescriptor(field.getName(), target.getClass())))
                    .filter(pd -> {
                        try {
                            return pd.getReadMethod().invoke(target) != null;
                        } catch (Exception e) {
                            return false;
                        }
                    }).collect(Collectors.toMap(FeatureDescriptor::getName, ThrowingInterface.tryCatch(f -> (String) f.getReadMethod().invoke(target), () -> "")));

            return criteriaBuilder.and(filters.entrySet().stream()
                    .filter(entry -> !StringUtils.isBlank(entry.getValue()))
                    .map(entry -> criteriaBuilder.like(root.get(entry.getKey()), "%" + entry.getValue() + "%")).toArray(Predicate[]::new)); // che schifo
        };
    }

    @FunctionalInterface
    private interface ThrowingInterface<I,R,E extends Exception> {
        public R accept(I input) throws E;

        public static <I,R> Function<I, R> tryCatch(ThrowingInterface<I, R, Exception> throwingFunction) throws RuntimeException {
            return i -> {
                try {
                    return throwingFunction.accept(i);
                } catch (Exception e) {
                    throw new RuntimeException(e.getMessage());
                }
            };
        }

        public static <I,R> Function<I, R> tryCatch(ThrowingInterface<I, R, Exception> throwingFunction, Function<I,R> fallback) throws RuntimeException {
            return i -> {
                try {
                    return throwingFunction.accept(i);
                } catch (Exception e) {
                    return fallback.apply(i);
                }
            };
        }

        public static <I,R> Function<I, R> tryCatch(ThrowingInterface<I, R, Exception> throwingFunction, Supplier<R> fallback) throws RuntimeException {
            return i -> {
                try {
                    return throwingFunction.accept(i);
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                    return fallback.get();
                }
            };
        }
    }
}
