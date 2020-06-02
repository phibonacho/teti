package it.phibonachos.teti.datasource.model.teti;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.time.Month;
import java.util.Set;

@Entity
@Table(name = "Contract", schema = "teti")
public class Contract {
    @Id @GeneratedValue
    @Column(name = "ContractID")
    private long id;

    @Enumerated @Column(name = "BillingMonth")
    private Month billingMonth;

    @Column(name = "BillingAmount")
    private double billingAmount;

    @Column(name = "ToBill")
    private boolean toBill;

    @Column(name = "Notes")
    private String notes;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "ContractID")
    private Set<RELClosingMonth> closingMonths;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "ContractID")
    private Set<Service> services;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Month getBillingMonth() {
        return billingMonth;
    }

    public void setBillingMonth(Month billingMonth) {
        this.billingMonth = billingMonth;
    }

    public double getBillingAmount() {
        return billingAmount;
    }

    public void setBillingAmount(double billAmount) {
        this.billingAmount = billAmount;
    }

    public boolean isToBill() {
        return toBill;
    }

    public void setToBill(boolean toBill) {
        this.toBill = toBill;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @JsonIgnore
    public Set<RELClosingMonth> getClosingMonths() {
        return closingMonths;
    }

    @JsonProperty
    public void setClosingMonths(Set<RELClosingMonth> closingMonths) {
        this.closingMonths = closingMonths;
    }

    @JsonIgnore
    public Set<Service> getServices() {
        return services;
    }

    public void setServices(Set<Service> services) {
        this.services = services;
    }
}
