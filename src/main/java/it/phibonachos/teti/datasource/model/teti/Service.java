package it.phibonachos.teti.datasource.model.teti;

import javax.persistence.*;
import java.time.Month;
import java.util.Set;

@Entity
@Table(name = "Service", schema = "teti")
public class Service {
    @Id @GeneratedValue
    @Column(name = "ServiceID")
    private long id;

    @Column(name = "ServiceName")
    private String serviceName;

    @Enumerated @Column(name = "ServiceDeadline")
    private Month serviceDeadLine;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "ContractID")
    private Contract contract;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "ServiceID")
    private Set<ServiceMemo> serviceMemos;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public Month getServiceDeadLine() {
        return serviceDeadLine;
    }

    public void setServiceDeadLine(Month serviceDeadLine) {
        this.serviceDeadLine = serviceDeadLine;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }
}
