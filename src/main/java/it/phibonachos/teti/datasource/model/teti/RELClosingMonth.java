package it.phibonachos.teti.datasource.model.teti;

import javax.persistence.*;
import java.time.Month;

@Entity
@Table(name = "RELClosingMonth", schema = "teti")
public class RELClosingMonth {
    @Id @GeneratedValue
    @Column(name = "ClosingMonthID")
    private long id;
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.REMOVE})
    @JoinColumn(name = "ContractID")
    private Contract contract;
    @Column(name = "ClosingMonth")
    private Month billingMonth;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Contract getContract() {
        return contract;
    }

    public void setContract(Contract contract) {
        this.contract = contract;
    }

    public Month getBillingMonth() {
        return billingMonth;
    }

    public void setBillingMonth(Month billingMonth) {
        this.billingMonth = billingMonth;
    }
}
