package it.phibonachos.teti.datasource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableJpaRepositories(
        entityManagerFactoryRef =  "entityManager",
        transactionManagerRef = "transactionManager",
        basePackages = "it.phibonachos.teti.datasource.repository"
)
public class TetiDataConfig {
    @Bean(name = "entityManager")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(){
        JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(tetiDataSource());
        em.setPackagesToScan("it.phibonachos.teti.datasource.repository", "it.phibonachos.teti.datasource.model");
        em.setJpaVendorAdapter(vendorAdapter);
        em.setJpaProperties(additionalJpaProperties());
        em.setPersistenceUnitName("teti");
        return em;
    }

    Properties additionalJpaProperties(){
        Properties properties = new Properties();
        properties.setProperty("hibernate.hbm2ddl.auto", "update");
        properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        properties.setProperty("hibernate.show_sql", "false");

        return properties;
    }

    @Bean(name = "transactionManager")
    public JpaTransactionManager transactionManager(@Qualifier("entityManager") EntityManagerFactory entityManager){
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManager);

        return transactionManager;
    }

    /* data sources */
    @Bean("tetiDataSource")
    @Primary
    @ConfigurationProperties("spring.teti")
    public DataSource tetiDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean("secDataSource")
    @ConfigurationProperties("spring.sec")
    public DataSource secDataSource() {
        return DataSourceBuilder.create().build();
    }

}
