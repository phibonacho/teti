package it.phibonachos.teti.datasource.model.teti;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.Month;
import java.util.Objects;

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
    private Month closingMonth;

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

    public Month getClosingMonth() {
        return this.closingMonth;
    }

    public void setBillingMonth(Month closingMonth) {
        this.closingMonth = closingMonth;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RELClosingMonth)) return false;
        RELClosingMonth that = (RELClosingMonth) o;
        if(this.contract == null && that.contract == null)
            return closingMonth == that.closingMonth;
        return contract.getId() == that.contract.getId() &&
                closingMonth == that.closingMonth;
    }

    @Override
    public int hashCode() {
        return Objects.hash(contract, closingMonth);
    }
}
